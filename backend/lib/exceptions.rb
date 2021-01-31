class NoSubmitterSupervisor < StandardError
  def message
    'Project submitter does not have an assigned supervisor'
  end
end

class CreateStepError < StandardError
  def message
    'There was an error assigning a user to the workflow'
  end
end

class NoStepSupervisor < StandardError
  def message
    'One of the users assigned during the workflow creation does not have a supervisor'
  end
end
