class CreateWorkflowRunJob < ApplicationJob
  queue_as :default

  def perform(project)
    @project_submitter = project.user_id
    @supervisor = @project_submitter.supervisor
    @workflow_run =
      WorkflowRun.create! name:
                            "#{@project_submitter.name}'s #{
                              project.name
                            } Approval Workflow" # FIXME WorkflowRun Classname
    @steps = []
    while @supervisor.DOA < project.total_cost
      # If this is the first step, set it to pending.
      # TODO Add validation to Steps
      if @steps.count == 0
        # Create the first step in the workflow_run
        status = 'pending'
        new_step = create_step(@supervisor, project, status)
        @steps << new_step
        # Assign it as the workflow_run's first_step
        @workflow_run.first_step = new_step

        @previous_step = new_step
      else
        # Intermediary Step
        status = 'created'
        # Create the new step
        new_step = create_step @supervisor, project, status
        @steps << new_step
        # Assign
        @previous_step.next_step = new_step #FIXME added with migrations
        @previous_step.save!
        @previous_step = new_step
      end

      new_supervisor = @supervisor.supervisor
      @supervisor = new_supervisor
    end

    # Assign previous_step with this step as it's next step, and set
    #  workfow_run's last_step to this step
    final_step = create_step @supervisor, project, 'created'

    # Set the second-to-last step's next_step
    @previous_step.next_step = final_step #FIXME added with migrations
    @previous_step.save!

    # Set the last step on the workflow to the final step.
    @workflow_run.last_step = final_step
    @workflow_run.save!
  end

  private

  def create_step(supervisor, project, status)
    Step.create!(
      name: "#{supervisor.name}'s Approval Of #{project.name}",
      status: status,
      workflow_id: project.workflow_id
    )
  end
end
