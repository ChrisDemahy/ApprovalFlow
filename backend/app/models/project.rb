class Project < ApplicationRecord
  belongs_to :user
  belongs_to :workflow

  after_save :queue_workflow_creation
  # Project can be either created, pending, finshed
  validates :status,
            inclusion: {
              in: %w[created pending finished],
              message: '%{value} is not a valid status'
            }

  private

  def queue_workflow_creation
    CreateDoaWorkflowJob.perform_later self if self.status == 'pending'
  end
end
