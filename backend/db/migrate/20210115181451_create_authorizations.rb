class CreateAuthorizations < ActiveRecord::Migration[6.0]
  def change
    create_table :authorizations do |t|
      t.references :user, null: true, foreign_key: true
      t.references :step, null: true, foreign_key: true, unique: true
      t.string :status
      t.text :description

      t.timestamps
    end
  end
end
