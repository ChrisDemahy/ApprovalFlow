class CreateDoaWorkflowJob < ApplicationJob
  queue_as :default

  def perform(project)
    @project_submitter = project.user_id
    @supervisor = @project_submitter.supervisor

    while @supervisor.DOA < project.total_cost
      new_supervisor = @supervisor.supervisor
      @supervisor = new_supervisor
    end

    @step =
      Step.create(
        name:
          "#{@supervisor.first_name} #{@supervisor.last_name}'s Approval Of #{
            project.name
          }",
        status: 'pending',
        workflow_id: project.workflow_id
      )
  end
end
