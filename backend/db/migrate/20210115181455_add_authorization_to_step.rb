class AddAuthorizationToStep < ActiveRecord::Migration[6.0]
    def change
        add_reference :steps, :authorization, null: true, foreign_key: true
    end
end
