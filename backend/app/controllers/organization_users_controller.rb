class OrganizationUsersController < ApplicationController
  before_action :set_organization_user, only: [:show, :update, :destroy]

  # GET /organization_users
  # GET /organization_users.json
  def index
    @organization_users = OrganizationUser.all
  end

  # GET /organization_users/1
  # GET /organization_users/1.json
  def show
  end

  # POST /organization_users
  # POST /organization_users.json
  def create
    @organization_user = OrganizationUser.new(organization_user_params)

    if @organization_user.save
      render :show, status: :created, location: @organization_user
    else
      render json: @organization_user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /organization_users/1
  # PATCH/PUT /organization_users/1.json
  def update
    if @organization_user.update(organization_user_params)
      render :show, status: :ok, location: @organization_user
    else
      render json: @organization_user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /organization_users/1
  # DELETE /organization_users/1.json
  def destroy
    @organization_user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_organization_user
      @organization_user = OrganizationUser.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def organization_user_params
      params.require(:organization_user).permit(:user_id, :organization_id)
    end
end
