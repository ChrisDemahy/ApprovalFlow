class AddStatusToProject < ActiveRecord::Migration[6.0]
  def change
    add_column :projects, :status, :string, default: 'created'
  end
end
