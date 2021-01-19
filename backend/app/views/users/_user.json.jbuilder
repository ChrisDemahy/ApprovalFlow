# View to be used whenever authenticating users
# Contains users token, which is sensitive\

# Renders the id and email only of the user
# Same ase json.extract! :user, :id, :email
json.call(user, :id, :email, :first_name, :last_name)
