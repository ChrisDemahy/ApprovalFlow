class Step < ApplicationRecord
  belongs_to :workflow_run, optional: true
  has_one :authorization
  belongs_to :user #, through: :authorization

  has_one :previous_step, class_name: 'Step', foreign_key: 'next_step_id'
  belongs_to :next_step, class_name: 'Step', optional: true
  belongs_to :project

  validates :status,
            inclusion: {
              in: %w[created pending approved denied],
              message: '%{value} is not a valid status'
            }

  after_save :update_on_save

  private

  def update_on_save
    if self.status == 'pending' && self.user_id? && !self.authorization
      Authorization.create!(
        step: self, status: 'pending', user_id: self.user_id
      )
      # Update the workflow run with the status

      self.workflow_run.update!(status: 'pending_approval')
      # Move to next step if there is one
    elsif self.status == 'approved' && self.next_step_id?
      self.workflow_run.update! current_step_id: self.next_step_id

      self.next_step.update! status: 'pending'

      # Update the workflow run with the status
      self.workflow_run.update!(status: 'pending_approval')

      # Else this is the last step and update the workflow
    elsif self.status == 'approved'
      # Approved
      self.workflow_run.update!(status: 'approved')
    elsif self.status == 'denied'
      # Denied
      self.workflow_run.update!(status: 'denied')
    end
  end
end
