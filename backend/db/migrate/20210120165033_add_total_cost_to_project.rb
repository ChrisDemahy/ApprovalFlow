class AddTotalCostToProject < ActiveRecord::Migration[6.0]
  def change
    add_column :projects, :total_cost, :float
  end
end
