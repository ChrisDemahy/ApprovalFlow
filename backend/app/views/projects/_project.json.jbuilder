json.extract! project,
              :id,
              :user_id,
              :name,
              :status,
              :total_cost,
              :description,
              :created_at,
              :updated_at

json.url project_url(project, format: :json)
