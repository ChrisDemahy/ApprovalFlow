class AddStatusToWorkflowRun < ActiveRecord::Migration[6.0]
  def change
    add_column :workflow_runs, :status, :string, default: 'created'
  end
end
