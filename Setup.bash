
# rails g scaffold oganizationUser user:references organization:references &&

# rails g scaffold project user:references && # workflow:references 
# rails g scaffold workflow name:string description:text user:references &&
# rails g scaffold step name:string status:string description:text workflow:references &&   # Authorization:references # PreviousStep NextStep
# rails g scaffold authorization user:references step:references status:string description:text &&

# rails g scaffold notification user:references name:string content:string &&

# rails g migration AddWorkflowToProject workflow:references &&
# rails g migration AddAuthorizationToStep authorization:references && 
# rails g migration AddPreviousStepToStep step:references &&
# rails g migration AddNextStepToStep step:references 




#  rails destroy scaffold organization name:string &&

#  rails destroy scaffold oganizationUser User:references Organization:references &&

# rails destroy scaffold project user:references && # workflow:references 
# rails destroy scaffold workflow name:string description:text User:references &&
# rails destroy scaffold step name:string status:string description:text workflow:references &&   # Authorization:references # PreviousStep NextStep
# rails destroy scaffold authorization user:references step:references status:string description:text &&

# rails destroy scaffold notification user:references name:string content:string &&

# rails destroy migration AddWorkflowToProject workflow:references &&
# rails destroy migration AddAuthorizationToStep authorization:references && 
# rails destroy migration AddPreviousStepToStep step:references &&
# rails destroy migration AddNextStepToStep step:references 



# AddWorkflowToStep
# AddWorkflowToProject
rails destroy scaffold oganizationUser user:references organization:references &&
# Organization no longer has many orgusers : Users belong to Org
rails g migration AddOrganizationToUser organization:references &&

rails g scaffold WorkflowRun name:string description:text user:references &&
# FIXME Add Relations to models 
rails g migration AddFirstStepToWorkflowRun first_step:references
rails g migration AddCurrentStepToWorkflowRun current_step:references
rails g migration AddLastStepToWorkflowRun last_step:references

rails g scaffold WorkflowTemplate name:string &&

# Workflow Templates are static. For now there is one workflow template
rails g migration AddWorkflowRunToProject workflow_run:references &&
rails g migration AddWorkflowTemplateToProject workflow_template:references &&

rails g migration AddWorkflowRunToStep workflow_run:references 

# Status validations

# Project is pending until it is assigned a workflow_run


