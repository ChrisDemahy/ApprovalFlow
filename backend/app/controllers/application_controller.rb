class ApplicationController < ActionController::API
  # Helper methods for dealing with JWT tokens
  include ActionController::HttpAuthentication::Token::ControllerMethods

  respond_to :json
  # Check for authentication
  before_action :authenticate_user

  before_action :configure_permitted_parameters, if: :devise_controller?

  private

  # Shared logic to check if a user is logged in
  # and assign their id to an instance variable if so
  def authenticate_user
    pp request.headers
    pp request.headers['Authorization'].present?
    if request.headers['Authorization'].present?
      authenticate_or_request_with_http_token do |token|
        begin
          jwt_payload =
            JWT.decode(token, Rails.application.secrets.secret_key_base).first

          @current_user_id = jwt_payload['id']
        rescue JWT::ExpiredSignature, JWT::VerificationError, JWT::DecodeError
          head :unauthorized
        end
      end
    end
  end

  # Methods to overwrite Devise's default authentication
  def authenticate_user!(options = {})
    head :unauthorized unless signed_in?
  end

  def current_user
    @current_user ||= super || User.find(@current_user_id)
  end

  def signed_in?
    @current_user_id.present?
  end

  protected

  # Configure custom parameters to register a user
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(
      :sign_up,
      keys: %i[supervisor_id name doa doa organization_id]
    )
  end
end
