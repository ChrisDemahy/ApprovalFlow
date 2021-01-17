json.extract! workflow,
              :id,
              :name,
              :description,
              :user_id,
              :created_at,
              :updated_at
json.url workflow_url(workflow, format: :json)
