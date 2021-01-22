class AddAuthorizationToNotification < ActiveRecord::Migration[6.0]
  def change
    add_reference :notifications,
                  :authorization,
                  foreign_key: true, optional: true
  end
end
