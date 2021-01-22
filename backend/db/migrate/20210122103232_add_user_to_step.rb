class AddUserToStep < ActiveRecord::Migration[6.0]
  def change
    add_reference :steps, :user, null: false, foreign_key: true
  end
end
