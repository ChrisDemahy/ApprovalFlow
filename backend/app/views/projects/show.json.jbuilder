# json.partial! 'projects/project', project: project
json.project do |json|
  json.extract! @project,
                :id,
                :user_id,
                :name,
                :status,
                :total_cost,
                :description,
                :workflow_run,
                :workflow_template,
                :created_at,
                :updated_at,
                :previous_runs

  # if !!@workflow_run
  #   json.workflow_run do |json|
  #     json.partial! 'workflow_runs/workflow_run', workflow_run: @workflow_run
  #     json.steps do |json|
  #       json.array! @steps do |step|
  #         json.partial! 'steps/step', step: step
  #       end
  #     end
  #   end
  # end
  # if !!@workflow_template
  #   json.workflow_template { |json| json.extract! @workflow_template, :name }
  # end
end
