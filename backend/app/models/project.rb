class Project < ApplicationRecord
  belongs_to :user

  belongs_to :workflow_template, optional: true

  has_many :previous_runs, class_name: 'WorkflowRun', foreign_key: 'project_id'
  has_one :workflow_run

  validates :name, :description, presence: true
  # Project can be either created, pending, finshed
  # pending_approval
  validates :status,
            inclusion: {
              in: %w[created pending_workflow pending_approval approved denied],
              message: '%{value} is not a valid status'
            }
end
