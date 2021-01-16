class Step < ApplicationRecord
    belongs_to :workflow
    has_many :authorizations, dependent: :destroy
end
