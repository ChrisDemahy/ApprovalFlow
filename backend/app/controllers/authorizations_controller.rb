class AuthorizationsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_authorization, only: %i[show update destroy]

  # GET /authorizations
  # GET /authorizations.json
  def index
    @auths = Authorization.includes(:step)
    @authorizations = @auths.filter { |auth| auth.user_id === current_user.id }
    # byebug
    # puts ''
  end

  # GET /authorizations/1
  # GET /authorizations/1.json
  def show; end

  # POST /authorizations
  # POST /authorizations.json
  def create
    @authorization = Authorization.new(authorization_params)

    if @authorization.save
      render :show, status: :created, location: @authorization
    else
      render json: @authorization.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /authorizations/1
  # PATCH/PUT /authorizations/1.json
  def update
    if @authorization.update(authorization_params)
      render :show, status: :ok, location: @authorization
    else
      render json: @authorization.errors, status: :unprocessable_entity
    end
  end

  # DELETE /authorizations/1
  # DELETE /authorizations/1.json
  def destroy
    @authorization.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_authorization
    @authorization = Authorization.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def authorization_params
    params.require(:authorization).permit(
      :user_id,
      :step_id,
      :status,
      :description
    )
  end
end
