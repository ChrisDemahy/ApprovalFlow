class WorkflowTemplatesController < ApplicationController
  before_action :set_workflow_template, only: [:show, :update, :destroy]

  # GET /workflow_templates
  # GET /workflow_templates.json
  def index
    @workflow_templates = WorkflowTemplate.all
  end

  # GET /workflow_templates/1
  # GET /workflow_templates/1.json
  def show
  end

  # POST /workflow_templates
  # POST /workflow_templates.json
  def create
    @workflow_template = WorkflowTemplate.new(workflow_template_params)

    if @workflow_template.save
      render :show, status: :created, location: @workflow_template
    else
      render json: @workflow_template.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /workflow_templates/1
  # PATCH/PUT /workflow_templates/1.json
  def update
    if @workflow_template.update(workflow_template_params)
      render :show, status: :ok, location: @workflow_template
    else
      render json: @workflow_template.errors, status: :unprocessable_entity
    end
  end

  # DELETE /workflow_templates/1
  # DELETE /workflow_templates/1.json
  def destroy
    @workflow_template.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_workflow_template
      @workflow_template = WorkflowTemplate.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def workflow_template_params
      params.require(:workflow_template).permit(:name)
    end
end
