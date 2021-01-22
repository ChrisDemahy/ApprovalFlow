class Step < ApplicationRecord
  belongs_to :workflow_run, optional: true
  has_many :authorizations

  has_one :previous_step, class_name: 'Step', foreign_key: 'next_step_id'
  belongs_to :next_step, class_name: 'Step', optional: true
end
