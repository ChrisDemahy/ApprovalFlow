class Organization < ApplicationRecord
  has_many :users, through: :organization_users
  has_many :organization_users, dependent: :destroy
end
