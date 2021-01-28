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
      # byebug
      auth =
        Authorization.create!(
          step: self, status: 'pending', user_id: self.user_id
        )

      # Move to next step if there is one
    elsif self.status == 'approved' && self.next_step_id?
      self.workflow_run.update current_step_id: self.next_step_id
      self.next_step.update status: 'pending'
    elsif self.status == 'denied' || self.status == 'approved'
      # Else set the workflow as finished
      # notification =
      #   Notification.create! user_id: self.user_id,
      #                        name: self.name,
      #                        project_id: self.workflow_run.project_id
    end
  end
end
