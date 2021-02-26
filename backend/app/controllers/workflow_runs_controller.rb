class WorkflowRunsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_workflow_run, only: %i[show update destroy]

  # GET /workflow_runs
  # GET /workflow_runs.json
  def index
    @workflow_runs = WorkflowRun.all
  end

  # GET /workflow_runs/1
  # GET /workflow_runs/1.json
  def show; end

  # POST /workflow_runs
  # POST /workflow_runs.json
  def create
    @workflow_run = WorkflowRun.new(workflow_run_params)
    @workflow_run.status = 'created'

    unless @workflow_run.save!
      render json: @workflow_run.errors, status: :unprocessable_entity
    end
    # The create a workflow, call the method that creates all the steps,
    #   authorizations, etc...

    # Submit for approval saves the workflow_run
    if @workflow_run.submit_for_approval(current_user)
      render :show, status: :created, location: @workflow_run
    else
      # TODO Show errors from submit_for_approval
      render json: @workflow_run.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /workflow_runs/1
  # PATCH/PUT /workflow_runs/1.json
  def update
    if @workflow_run.update(workflow_run_params)
      render :show, status: :ok, location: @workflow_run
    else
      render json: @workflow_run.errors, status: :unprocessable_entity
    end
  end

  # DELETE /workflow_runs/1
  # DELETE /workflow_runs/1.json
  def destroy
    @workflow_run.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_workflow_run
    @workflow_run = WorkflowRun.find(params[:id])

    @steps = @workflow_run.steps.sort_by(&:id)
  end

  # Only allow a list of trusted parameters through.
  def workflow_run_params
    params.require(:workflow_run).permit(:name, :description, :project_id)
  end
end
