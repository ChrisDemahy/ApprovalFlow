json.extract! notification,
              :id,
              :user_id,
              :name,
              :content,
              :created_at,
              :updated_at,
              :authorization_id
json.url notification_url(notification, format: :json)
