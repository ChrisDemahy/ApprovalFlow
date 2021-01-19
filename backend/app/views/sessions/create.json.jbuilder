json.user { |json| json.partial! 'users/user', user: current_user }
json.token current_user.generate_jwt
