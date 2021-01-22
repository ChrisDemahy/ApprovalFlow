class AddProjectToWorkflowRun < ActiveRecord::Migration[6.0]
  def change
    add_reference :workflow_runs, :project, null: false, foreign_key: true
  end
end
