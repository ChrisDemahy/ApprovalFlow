class Notification < ApplicationRecord
  belongs_to :user
  belongs_to :project, optional: true
  belongs_to :authorization, optional: true

  validates :project,
            presence: true, if: Proc.new { |a| a.authorization.blank? }

  validates :authorization,
            presence: true, if: Proc.new { |a| a.project.blank? }
end
