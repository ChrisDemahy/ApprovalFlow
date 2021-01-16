class AddWorkflowToProject < ActiveRecord::Migration[6.0]
  def change
    add_reference :projects, :workflow, null: false, foreign_key: true
  end
end
