class WorkflowRun < ApplicationRecord
  has_one :first_step, foreign_key: 'first_step_id', class_name: 'Step'
  has_one :current_step, foreign_key: 'current_step_id', class_name: 'Step'
  has_one :last_step, foreign_key: 'last_step_id', class_name: 'Step'
  belongs_to :project

  after_save :update_project

  def status
    cs = Step.find_by id: self.current_step_id
    return cs.status
  end

  def update_project
    self.project.update status: self.status
  end
end
