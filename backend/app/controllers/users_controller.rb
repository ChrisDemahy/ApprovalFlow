class UsersController < ApplicationController
  before_action :authenticate_user!

  def show
    @user = current_user
  rescue ActiveRecord::RecordNotFound
    render json: 'Access Denied', status: :unauthorized
  end

  def update
    if current_user.update_attributes(user_params)
      render :show
    else
      render json: { errors: current_user.errors },
             status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(
      :email,
      :password,
      :organization,
      :image,
      :name,
      :supervisor_id
    )
  end
end
