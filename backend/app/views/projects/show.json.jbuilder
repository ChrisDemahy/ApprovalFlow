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
                :workflow_template_id,
                :created_at,
                :updated_at

  json.workflow_run { |json| json.extract! @workflow_run }

  json.workflow_template { |json| json.extract! @workflow_template }
end
