class OganizationUsersController < ApplicationController
  before_action :set_oganization_user, only: [:show, :update, :destroy]

  # GET /oganization_users
  # GET /oganization_users.json
  def index
    @oganization_users = OganizationUser.all
  end

  # GET /oganization_users/1
  # GET /oganization_users/1.json
  def show
  end

  # POST /oganization_users
  # POST /oganization_users.json
  def create
    @oganization_user = OganizationUser.new(oganization_user_params)

    if @oganization_user.save
      render :show, status: :created, location: @oganization_user
    else
      render json: @oganization_user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /oganization_users/1
  # PATCH/PUT /oganization_users/1.json
  def update
    if @oganization_user.update(oganization_user_params)
      render :show, status: :ok, location: @oganization_user
    else
      render json: @oganization_user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /oganization_users/1
  # DELETE /oganization_users/1.json
  def destroy
    @oganization_user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_oganization_user
      @oganization_user = OganizationUser.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def oganization_user_params
      params.require(:oganization_user).permit(:user_id, :organization_id)
    end
end
