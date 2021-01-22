json.extract! workflow_run,
              :id,
              :name,
              :description,
              :status,
              :created_at,
              :updated_at
json.url workflow_run_url(workflow_run, format: :json)
