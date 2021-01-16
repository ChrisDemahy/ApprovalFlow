class CreateSteps < ActiveRecord::Migration[6.0]
  def change
    create_table :steps do |t|
      t.string :name
      t.string :status
      t.text :description
      t.references :workflow, null: false, foreign_key: true

      t.timestamps
    end
  end
end
