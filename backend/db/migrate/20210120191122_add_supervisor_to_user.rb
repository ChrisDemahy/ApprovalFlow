class AddSupervisorToUser < ActiveRecord::Migration[6.0]
  def change
    add_reference :users, :supervisor, index: true, null: true
  end
end
