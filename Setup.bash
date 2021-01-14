
rails generate devise:install &&
rails generate devise User &&


rails generate scaffold Organization name:string &&
rails generate migration AddProfileFieldsToUsers organization:references 

rails db:migrate

# rails g scaffold oganizationUser user:references organization:references &&

# rails g scaffold Project user:references && # workflow:references 
# rails g scaffold Workflow name:string description:text User:references &&
# rails g scaffold Step name:string status:string descriptiont:text workflow:references &&   # Authorization:references # PreviousStep NextStep
# rails g scaffold Authorization User:references Step:references Status:string description:text && # rails g scaffold AuthorizingUser

# rails g scaffold Notification User:references name:string content:string

# rails g migration AddWorkflowToProject workflow:references
# rails g migration AddAuthorizationToStep Authorization:references
# rails g migration AddPreviousStepToStep Step:references  
# rails g migration AddNextStepToStep Step:references



# rails destroy scaffold Organization name:string &&
# rails destroy scaffold User FirstName:string  Email:string Password:digest &&
# rails destroy scaffold OganizationUser User:references Organization:references &&

# rails destroy scaffold Project User:references && # workflow:references 
# rails destroy scaffold Workflow name:string description:text User:references &&
# rails destroy scaffold Step name:string status:string descriptiont:text workflow:references &&   # Authorization:references # PreviousStep NextStep
# rails destroy scaffold Authorization User:references Step:references Status:string description:text && # rails destroy scaffold AuthorizingUser

# rails destroy scaffold Notification User:references name:string content:string

# rails destroy migration AddWorkflowToProject workflow:references
# rails destroy migration AddAuthorizationToStep Authorization:references
# rails destroy migration AddPreviousStepToStep Step:references  
# rails destroy migration AddNextStepToStep Step:references