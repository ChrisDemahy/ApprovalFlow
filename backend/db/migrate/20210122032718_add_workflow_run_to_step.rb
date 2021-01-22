class AddWorkflowRunToStep < ActiveRecord::Migration[6.0]
  def change
    add_reference :steps, :workflow_run, optional: true, foreign_key: true
  end
end
