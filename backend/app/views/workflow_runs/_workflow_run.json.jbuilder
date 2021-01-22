json.extract! workflow_run, :id, :name, :description, :created_at, :updated_at
json.url workflow_run_url(workflow_run, format: :json)
