json.array! @authorizations do |auth|
  json.extract! auth,
                :id,
                :user_id,
                :status,
                :description,
                :created_at,
                :updated_at,
                :step
end
