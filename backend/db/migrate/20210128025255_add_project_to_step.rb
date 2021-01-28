class AddProjectToStep < ActiveRecord::Migration[6.0]
  def change
    add_reference :steps, :project
  end
end
