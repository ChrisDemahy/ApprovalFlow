json.extract! authorization,
              :id,
              :user_id,
              :step_id,
              :status,
              :description,
              :created_at,
              :updated_at
json.url authorization_url(authorization, format: :json)
