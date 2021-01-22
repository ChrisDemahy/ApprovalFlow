class AddNextStepToStep < ActiveRecord::Migration[6.0]
  def change
    add_reference :steps, :next_step, index: true
  end
end
