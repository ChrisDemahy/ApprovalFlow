class AddFirstStepToWorkflowRun < ActiveRecord::Migration[6.0]
  def change
    add_reference :workflow_runs, :first_step, null: true
  end
end
