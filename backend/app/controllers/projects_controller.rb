class ProjectsController < ApplicationController
  before_action :authenticate_user
  before_action :set_project, only: %i[show update destroy]

  # GET /projects
  # GET /projects.json
  def index
    @projects = Project.all
  end

  # GET /projects/1
  # GET /projects/1.json
  def show
    if @project.status == 'pending_workflow'
      render nothing: true, status: :service_unavailable
    else
      render :show, status: :ok, location: @project
    end
  end

  # POST /projects
  # POST /projects.json
  def create
    @project = Project.new(project_params)
    @project.user_id = current_user.id

    if @project.save
      render :show, status: :created, location: @project
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /projects/1
  # PATCH/PUT /projects/1.json
  def update
    if @project.update(project_params)
      render :show, status: :ok, location: @project
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  # DELETE /projects/1
  # DELETE /projects/1.json
  def destroy
    @project.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_project
    @project = Project.find(params[:id])
    @workflow_run = @project.workflow_run
    @workflow_template = @project.workflow_template
    @steps = @workflow_run.steps if !!@workflow_run
  end

  # Only allow a list of trusted parameters through.
  def project_params
    # byebug
    params.require(:project).permit(
      :description,
      :total_cost,
      :name,
      :description,
      :status
    )
  end
end
