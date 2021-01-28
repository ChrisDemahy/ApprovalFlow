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
  ####### Method to 'Submit' Project for approval #######
  # Creates the steps associated with the workflow.

  def submit_for_approval()
    # Grab the workflow template if it exists

    # If the workflow_template exists, and the status is 'created',
    #  then the workflow_template was just assigned
    # And workflow_run should be created via ActiveJob

    # Leave if a projct has a workflow already to the pros lol

    # TODO Fix thse next two assignments, both need to be refactored

    # Set the project
    project = self.project

    # Set project submitter
    @project_submitter = project.user

    # Get the supervisor of the user submitting the project
    @supervisor = @project_submitter.supervisor

    ###### doa Loop ######

    first_loop = false
    # While loop to find the supervisor that meets the project total_cost
    go_now = false
    byebug
    while !go_now
      ###### First Step ######
      go_now = @supervisor.doa > project.total_cost
      if first_loop == false
        # Only create the first step once
        first_loop = true

        # Create the step and store it
        new_step = create_step(@supervisor, project, 'pending')

        # Assign that step as the workflow_run's first_step
        self.first_step_id = new_step.id

        # and current_step
        self.current_step_id = new_step.id

        # Set previous_step as as this step to later assign this steps next_step
        @previous_step = new_step

        ###### Intermediary Step ######
      else
        # Create the new step
        new_step = create_step(@supervisor, project, 'created')

        # Assign this newly created step as the previous-step-in-the-loop's,
        # next step, like from line:65
        @previous_step.update!(next_step_id: new_step.id)

        # Set previous_step as as this step to later assign this steps next_step
        @previous_step = new_step
      end

      # Set the supervisor to the that of the person who a step was just created for.
      @supervisor = @supervisor.supervisor
    end

    ###### Final Step #######

    # Assign previous_step with this step as it's next step, and set
    #  workfow_run's @last_step to this step
    if first_loop == true
      @last_step = create_step(@supervisor, project, 'created')
    end
    if first_loop == false
      @last_step = create_step(@supervisor, project, 'pending')
    end
    self.first_step_id = @last_step.id if first_loop == false

    # and current_step
    self.current_step_id = @last_step.id if first_loop == false

    # Set the second-to-last step's next_step
    @previous_step.update!(next_step_id: @last_step.id) if !!@previous_step

    # Set the last step on the workflow to the final step.
    self.update!(last_step_id: @last_step.id)

    # update the project as pending approval
    project.update!(status: 'pending_approval')

    # Return not nil, so controller knows it passed. Otherwise
    # errors are raised...
    true
  end

  private

  def create_step(supervisor, project, status)
    byebug
    puts ''
    temp =
      Step.create!(
        name: "#{project.name}",
        project_id: project.id,
        status: status,
        user_id: supervisor.id,
        workflow_run_id: self.id
      )
    return temp
    # workflow_run: workflow_run
  end
end
