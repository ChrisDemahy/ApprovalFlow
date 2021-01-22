class AddWorkflowRunToProject < ActiveRecord::Migration[6.0]
  def change
    add_reference :projects, :workflow_run, foreign_key: true, optional: true
  end
end
