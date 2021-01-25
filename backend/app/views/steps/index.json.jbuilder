json.array! @steps do |step|
  user = User.find(step.user_id)
  json.partial! 'steps/step', step: step
  json.user { |json| json.partial! 'users/user', user: user }
end
