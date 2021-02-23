class SessionsController < Devise::SessionsController
  # Handles logging in users (Creating a session)

  def create
    user = User.find_by_email(sign_in_params[:email])

    if user && user.valid_password?(sign_in_params[:password])
      @current_user = user
      # response.header('Set-Cookie', ('___refresh_token= ' + user.generate_jwt))
    else
      render json: { errors: { 'email or password' => ['is invalid'] } },
             status: :unprocessable_entity
    end
  end
end
