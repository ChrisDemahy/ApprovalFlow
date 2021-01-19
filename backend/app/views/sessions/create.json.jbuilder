json.user { |json| json.partial! 'sessions/session', user: current_user }
json.token current_user.generate_jwt
