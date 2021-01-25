class WorkflowRunsController < ApplicationController
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

    if @workflow_run.save
      render :show, status: :created, location: @workflow_run
    else
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
    @steps = @workflow_run.steps
  end

  # Only allow a list of trusted parameters through.
  def workflow_run_params
    params.require(:workflow_run).permit(
      :name,
      :description,
      :workflow_template_id,
      :total_cost
    )
  end
end
