json.extract! step,
              :id,
              :name,
              :status,
              :description,
              :workflow_id,
              :created_at,
              :updated_at
json.url step_url(step, format: :json)
