class Workflow < ApplicationRecord
  belongs_to :user
  has_many :steps, dependent: :destroy
  has_many :projects, dependent: :destroy
end
