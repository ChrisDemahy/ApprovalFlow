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
    create_workflow_run(@workflow_run)
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
    params.require(:workflow_run).permit(:name, :description, :project_id)
  end

  private

  def create_workflow_run(run)
    # Grab the workflow template if it exists

    # If the workflow_template exists, and the status is 'created',
    #  then the workflow_template was just assigned
    # And workflow_run should be created via ActiveJob

    # End any previous workflow
    # TODO Comment this properly
    if !!run.project
      project = run.project

      if !!run.current_step_id
        project.workflow_run.status = 'denied'
        project.previous_runs << project.workflow_run
      end
      @project_submitter = project.user
      @supervisor = @project_submitter.supervisor

      @steps = []
      while @supervisor.DOA < project.total_cost
        # If this is the first step, set it to pending.
        # TODO Add validation to Steps

        if @steps.count == 0
          ###### Create the first step in  the workflow_run ######
          status = 'pending'
          new_step = create_step(@supervisor, project, status)
          @steps << new_step
          # Assign it as the workflow_run's first_step and current_step

          run.first_step_id = new_step.id
          run.current_step_id = new_step.id

          @previous_step = new_step
        else
          # Intermediary Step
          status = 'created'
          # Create the new step
          new_step = create_step @supervisor, project, status
          @steps << new_step
          # Assign
          @previous_step.next_step_id = new_step.id

          @previous_step.save!
          @previous_step = new_step
        end

        new_supervisor = @supervisor.supervisor
        @supervisor = new_supervisor
      end

      # Assign previous_step with this step as it's next step, and set
      #  workfow_run's @last_step to this step
      status = 'created'
      @last_step = create_step @supervisor, project, status

      # Set the second-to-last step's next_step
      @previous_step.next_step_id = @last_step.id

      @previous_step.save!

      # Set the last step on the workflow to the final step.
      run.last_step_id = @last_step.id

      run.save!

      @steps.each do |step|
        step.workflow_run_id = run.id
        step.save!
      end

      project.update(status: 'pending_approval')
    end
  end

  def create_step(supervisor, project, status)
    Step.create!(
      name: "#{supervisor.name}'s Approval Of #{project.name}",
      status: status,
      user_id: supervisor.id
    )
    # workflow_run: workflow_run
  end
end
