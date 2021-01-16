class AddAuthorizationToStep < ActiveRecord::Migration[6.0]
  def change
    add_reference :steps, :authorization, null: false, foreign_key: true
  end
end
