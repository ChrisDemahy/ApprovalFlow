class WorkflowRun < ApplicationRecord
  has_one :first_step, foreign_key: 'first_step', class_name: 'Step'
  has_one :current_step, foreign_key: 'current_step', class_name: 'Step'
  has_one :last_step, foreign_key: 'last_step', class_name: 'Step'
  has_many :projects
end
