class Project < ApplicationRecord
  belongs_to :user

  belongs_to :workflow_template, optional: true

  has_many :previous_runs, class_name: 'WorkflowRun', foreign_key: 'project_id'
  has_one :workflow_run

  # Project can be either created, pending, finshed
  validates :status,
            inclusion: {
              in: %w[created pending approved denied],
              message: '%{value} is not a valid status'
            }

  after_save :validate_status

  private

  def validate_status()
    project = self
    # Grab the workflow template if it exists
    @workflow_template = project.workflow_template

    # If the workflow_template exists, and the status is 'created',
    #  then the workflow_template was just assigned
    # And workflow_run should be created via ActiveJob

    if @workflow_template && project.status == 'created'
      @project_submitter = project.user
      @supervisor = @project_submitter.supervisor
      @workflow_run =
        WorkflowRun.new name:
                          "#{@project_submitter.name}'s #{
                            project.name
                          } Approval Workflow",
                        project_id: self.id
      @steps = []
      while @supervisor.DOA < project.total_cost
        # If this is the first step, set it to pending.
        # TODO Add validation to Steps

        if @steps.count == 0
          # Create the first step in the workflow_run
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
      project.update

      @steps.each do |step|
        step.workflow_run_id = @workflow_run.id
        step.save
      end
    elsif @workflow_template && self.status == 'pending'
      # if the workflow_template exists, and status is pending, then update
      #  the project status to that of the current step. if the current step
      #  is finshed/complate, so is the workflow and the project
      @current_step = @workflow_template.current_step
      self.status = @current_step.status
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
