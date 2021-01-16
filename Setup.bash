
rails g scaffold oganizationUser user:references organization:references &&

rails g scaffold project user:references && # workflow:references 
rails g scaffold workflow name:string description:text user:references &&
rails g scaffold step name:string status:string description:text workflow:references &&   # Authorization:references # PreviousStep NextStep
rails g scaffold authorization user:references step:references status:string description:text &&

rails g scaffold notification user:references name:string content:string &&

rails g migration AddWorkflowToProject workflow:references &&
rails g migration AddAuthorizationToStep authorization:references && 
rails g migration AddPreviousStepToStep step:references &&
rails g migration AddNextStepToStep step:references 




 rails destroy scaffold organization name:string &&

 rails destroy scaffold oganizationUser User:references Organization:references &&

rails destroy scaffold project user:references && # workflow:references 
rails destroy scaffold workflow name:string description:text User:references &&
rails destroy scaffold step name:string status:string description:text workflow:references &&   # Authorization:references # PreviousStep NextStep
rails destroy scaffold authorization user:references step:references status:string description:text &&

rails destroy scaffold notification user:references name:string content:string &&

rails destroy migration AddWorkflowToProject workflow:references &&
rails destroy migration AddAuthorizationToStep authorization:references && 
rails destroy migration AddPreviousStepToStep step:references &&
rails destroy migration AddNextStepToStep step:references 