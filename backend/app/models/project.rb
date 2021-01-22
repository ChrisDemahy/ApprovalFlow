class Project < ApplicationRecord
  belongs_to :user
  belongs_to :workflow

  # Project can be either created, pending, finshed
  before_save :validate_status
  
  # Que a job if the status dictates it, decided by validations 
  after_save :queue_workflow_creation
  private

  def queue_workflow_creation
    CreateDoaWorkflowJob.perform_later self if self.status == 'pending'
  end


  def validate_status
    
    # Grab the workflow template if it exists
    @workflow_template = self.workflow_template
    
    # If the workflow_template exists, and the status is 'created',
    #  then the workflow_template was just assigned 
    # And workflow_run should be created via ActiveJob
    if @workflow_template && self.status == "created"
      CreateWorkflowRunJob.perform_later self if self.status == 'pending'

    # if the workflow_template exists, and status is pending, then update
    #  the project status to that of the current step. if the current step
    #  is finshed/complate, so is the workflow and the project 
    elsif @workflow_template && self.status == "pending"
      @current_step = @workflow_template.current_step
      self.status= @current_step.status
    end 

    end
  end
end
