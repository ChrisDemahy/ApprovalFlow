class AddWorkflowTemplateToProject < ActiveRecord::Migration[6.0]
  def change
    add_reference :projects,
                  :workflow_template,
                  optional: true, foreign_key: true
  end
end
