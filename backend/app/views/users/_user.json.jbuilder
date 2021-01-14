# View to be used whenever authenticating users
# Contains users token, which is sensitive
json.call(user, :id, :email, :image)
json.token user.generate_jwt
