class AddProjectToNotification < ActiveRecord::Migration[6.0]
  def change
    add_reference :notifications, :project, foreign_key: true, optional: true
  end
end
