class CreateWorkflowRunJob < ApplicationJob
  queue_as :default

  def perform(project)
    # Grab the workflow template if it exists

    # If the workflow_template exists, and the status is 'created',
    #  then the workflow_template was just assigned
    # And workflow_run should be created via ActiveJob

    # End any previous workflow

    if !!project.workflow_run
      project.workflow_run.status = 'denied'
      project.previous_runs << project.workflow_run
    end
    @project_submitter = project.user
    @supervisor = @project_submitter.supervisor
    @workflow_run =
      WorkflowRun.new name:
                        "#{@project_submitter.name}'s #{
                          project.name
                        } Approval Workflow",
                      project_id: project.id
    @steps = []
    while @supervisor.doa < project.total_cost
      # If this is the first step, set it to pending.
      # TODO Add validation to Steps

      if @steps.count == 0
        ###### Create the first step in  the workflow_run ######
        status = 'pending'
        new_step = create_step(@supervisor, project, status)
        @steps << new_step
        # Assign it as the workflow_run's first_step and current_step

        @workflow_run.first_step_id = new_step.id
        @workflow_run.current_step_id = new_step.id

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
    @workflow_run.last_step_id = @last_step.id

    @workflow_run.save!

    @steps.each do |step|
      step.workflow_run_id = @workflow_run.id
      step.save!
    end

    project.update(status: 'pending_approval')
  end

  private

  def create_step(supervisor, project, status)
    Step.create!(
      name: "#{supervisor.name}'s Approval Of #{project.name}",
      status: status,
      user_id: supervisor.id
    )
    # workflow_run: workflow_run
  end
end
