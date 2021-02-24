class WorkflowRun < ApplicationRecord
  has_one :first_step, foreign_key: 'first_step_id', class_name: 'Step'
  has_one :current_step, foreign_key: 'current_step_id', class_name: 'Step'
  has_one :last_step, foreign_key: 'last_step_id', class_name: 'Step'
  belongs_to :project
  has_many :steps

  ####### Workflow Run Status ######
  def status
    cs = Step.find_by id: self.current_step_id
    return cs.status
  end

  def status=(status)
    cs = Step.find_by id: self.current_step_id

    cs.update!(status: status) if !!cs
    return cs.status
  end
  ####### Method to 'submit' project for approval #######
  # Creates the steps associated with the workflow.

  def submit_for_approval(project_submitter)
    # Set the project
    project = self.project

    # Get the project submitter from arguments
    # project_submitter = project.user

    # Get the supervisor of the user submitting the project or error
    raise Exceptions::NoSubmitterSupervisor if !project_submitter.supervisor_id?
    @supervisor = project_submitter.supervisor

    #### First Step ####
    # Create the step and store it. First step is always pending.
    first_step = create_step(@supervisor, project, 'pending')

    # Assign that step as the workflow_run's first_step
    self.first_step_id = first_step.id

    # and current_step
    byebug
    self.current_step_id = first_step.id

    # Store this step so it can later be assigned a next_step_id
    @previous_step = first_step

    ###### doa Loop ######

    # While loop to find the supervisor that meets the project total_cost
    while @supervisor.doa < project.total_cost
      if !project_submitter.supervisor_id?
        raise Exceptions::NoSubmitterSupervisor
      end
      @supervisor = @supervisor.supervisor

      ###### Intermediary Step ######

      # Create the new step
      new_step = create_step(@supervisor, project, 'created')

      # Assign this newly created step as the previous-step-in-the-loop's,
      # next step, like from line:65
      @previous_step.update!(next_step_id: new_step.id)

      # Set previous_step as as this step to later assign this steps next_step
      @previous_step = new_step
      # Break if the supervisor id is equal to itself. OrganizationOwner/SuperUser
      break if @supervisor = @supervisor.supervisor
    end

    # Set the last step on the workflow to the final step.
    self.last_step_id = @previous_step.id

    # update the project as pending approval
    project.update!(status: 'pending_approval')

    # Return not nil, so controller knows it passed. Otherwise
    # errors are raised...
    true
  end

  private

  def create_step(supervisor, project, status)
    # Create the step from given information
    step =
      Step.new(
        name: "#{project.name}",
        project_id: project.id,
        status: status,
        user_id: supervisor.id,
        workflow_run_id: self.id
      )
    # if it saves properly, return it. Otherwise error.
    if step.save!
      return step
    else
      raise Exceptions::CreateStepError
    end
    # workflow_run: workflow_run
  end
end
