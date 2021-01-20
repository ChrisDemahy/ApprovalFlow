class AddDoaToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :DOA, :float
  end
end
