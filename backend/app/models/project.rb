class Project < ApplicationRecord
  belongs_to :user
  belongs_to :workflow_run, optional: true
  belongs_to :workflow_template, optional: true

  # Project can be either created, pending, finshed
  after_save :validate_status

  private

  def validate_status
    CreateWorkflowRunJob.perform_later self
  end
end
