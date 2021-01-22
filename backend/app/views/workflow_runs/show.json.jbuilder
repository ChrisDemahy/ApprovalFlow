json.workflow_run do |json|
  json.partial! 'workflow_runs/workflow_run', workflow_run: @workflow_run
  json.steps do |json|
    json.array! @steps do |step|
      json.partial! 'steps/step', step: step
    end
  end
end
