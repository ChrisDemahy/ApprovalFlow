class Authorization < ApplicationRecord
  belongs_to :user
  belongs_to :step
  has_many :notifications

  validates :status,
            inclusion: {
              in: %w[pending approved denied],
              message: '%{value} is not a valid status'
            }

  after_create :create_notification
  after_save :update_step

  private

  def create_notification
    # notification =
    #   Notification.create! user_id: self.user_id,
    #                        name: self.step.name,
    #                        authorization_id: self.id
  end

  def update_step
    self.step.update! status: self.status if self.status != 'pending'
  end
end
