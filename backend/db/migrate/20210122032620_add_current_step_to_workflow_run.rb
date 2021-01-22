class AddCurrentStepToWorkflowRun < ActiveRecord::Migration[6.0]
  def change
    add_reference :workflow_runs, :current_step, null: true, index: true
  end
end
