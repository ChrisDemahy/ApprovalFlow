class AddLastStepToWorkflowRun < ActiveRecord::Migration[6.0]
  def change
    add_reference :workflow_runs, :last_step, null: true, index: true
  end
end
