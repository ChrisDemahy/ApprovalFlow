# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Gernereate new users, Boards, Swimlanes,
#  and Cards, as well as associate all of them
require 'faker'

Notification.destroy_all
Authorization.destroy_all
Step.destroy_all
WorkflowRun.destroy_all
Project.destroy_all
User.destroy_all
Organization.destroy_all
WorkflowTemplate.destroy_all

organization = Organization.create! name: 'Royal Carribean'

#=> "kirsten.greenholt@corkeryfisher.info"

# Create the users

@first_user =
  User.create!(
    name: 'Chris Demahy',
    password: 'abc123',
    password_confirmation: 'abc123',
    email: 'demahyc@gmail.com',
    organization_id: organization.id,
    doa: 700_000
  )
@first_user.update! supervisor_id: @first_user.id

@second_user =
  User.create!(
    name: 'Marry Horton',
    password: 'abc123',
    password_confirmation: 'abc123',
    email: 'Marry@gmail.com',
    organization_id: organization.id,
    doa: 86_500,
    supervisor_id: @first_user.id
  )

@guest_user =
  User.create!(
    name: 'Recruiter',
    password: 'abc123',
    password_confirmation: 'abc123',
    email: 'guest@awesomecompany.com',
    organization_id: organization.id,
    doa: 50_000,
    supervisor_id: @second_user.id
  )

@third_user =
  User.create!(
    name: 'Mike Smith',
    password: 'abc123',
    password_confirmation: 'abc123',
    email: 'mike@gmail.com',
    organization_id: organization.id,
    doa: 40_000,
    supervisor_id: @guest_user.id
  )

@fourth_user =
  User.create!(
    name: 'Jack Deaton',
    password: 'abc123',
    password_confirmation: 'abc123',
    email: 'jack@gmail.com',
    organization_id: organization.id,
    doa: 26_500,
    supervisor_id: @third_user.id
  )

@projects = []
cost = 17_000
# project_names
#   'Oasis of the Seas Rudder Replacement',
#   'Majesty of the Seas Bi-Yearly Mainenace',
#   '2021 Port of Galveston Terminal Rennovation',
#   'Independence of the Seas Cabin Rennovation',
#   'Enchantment of the Seas Quadrennial Hull Inspection',
#   '2020 Fiscal Year Annual Customer Experience Report'

# Project 1
oasis_project =
  Project.create!(
    name: 'Oasis of the Seas Rudder Replacement',
    description:
      'Maintenance showed damage to the main rudder of the Oasis of the Seas. Initial reports show arrangements should be made for full replacement of the rudder and will require the ship to be out of commision for many months. ',
    user_id: @fourth_user.id,
    total_cost: 65_000
  )

# Create the first workflow, to be denied and resubmitted
oasis_workflow =
  WorkflowRun.create!(
    name: 'Oasis of the Seas Rudder Replacement',
    description: 'First submission',
    project_id: oasis_project.id,
    status: 'created'
  )

# Submit for approval also saves the workflow_run
oasis_workflow.submit_for_approval(@fourth_user)

# Approve the first step and deny the second

oasis_step1 = Step.find_by id: oasis_workflow.current_step_id
oasis_step1.authorization.update! status: 'approved'
oasis_step2 = Step.find_by id: oasis_step1.next_step_id
oasis_step2.authorization.update! status: 'denied'

# Now create a second workflow not to be denied
oasis_workflow =
  WorkflowRun.create!(
    name: 'Oasis of the Seas Rudder Replacement',
    description: 'Changed dates to accomodate the july 4th holidy.',
    project_id: oasis_project.id,
    status: 'created'
  )

# Submit for approval also saves the workflow_run
oasis_workflow.submit_for_approval(@fourth_user)

# Approve the first step and leave the second

# Project 2
majesty_project =
  Project.create!(
    name: 'Majesty of the Seas Bi-Yearly Mainenace',
    description:
      'Majesty of the Seas requires maintenance in july. The maintanene will be done in the Port of Galveston and commence on the 3rd through the 29th.',
    user_id: @third_user.id,
    total_cost: 72_000
  )

# Create the first workflow, to be assigned for approval by the guest
majesty_workflow =
  WorkflowRun.create!(
    name: 'Majesty of the Seas Bi-Yearly Mainenace',
    description: 'First submission',
    project_id: majesty_project.id,
    status: 'created'
  )

# Submit for approval also saves the workflow_run
majesty_workflow.submit_for_approval(@third_user)

# Project 3

port_project =
  Project.create!(
    name: '2021 Port of Galveston Terminal Rennovation',
    description:
      '2021 will see the rennovation of the Royal Carribean facilities in Galveston. These will include a replacement of existing docks as well as refreshing the corporate branch office.',
    user_id: @fourth_user.id,
    total_cost: 105_000
  )

# Create the first workflow, to be denied and resubmitted
port_workflow =
  WorkflowRun.create!(
    name: '2021 Port of Galveston Terminal Rennovation',
    description: 'First submission',
    project_id: port_project.id,
    status: 'created'
  )

# Submit for approval also saves the workflow_run
port_workflow.submit_for_approval(@fourth_user)

# Approve the first step and deny the second

port_step1 = Step.find_by id: port_workflow.current_step_id
port_step1.authorization.update! status: 'approved'

# Project 4

independence_project =
  Project.create!(
    name: 'Independence of the Seas Cabin Rennovation',
    description:
      '2022 will see the rennovation of the residential cabins on the Independence of the Seas. These will include updating furniture and bathroom fixtures, as well as supporting new technology services such as app integration.',
    user_id: @third_user.id,
    total_cost: 175_000
  )
# Create the first workflow, to be denied and resubmitted
independence_workflow =
  WorkflowRun.create!(
    name: 'Independence of the Seas Cabin Rennovation',
    description: 'First submission',
    project_id: independence_project.id,
    status: 'created'
  )

# Submit for approval also saves the workflow_run
independence_workflow.submit_for_approval(@third_user)

# Approve the first step and deny the second

independence_step1 = Step.find_by id: independence_workflow.current_step_id
independence_step1.authorization.update! status: 'approved'

# Project 5

Project.create!(
  name: '2022 Fiscal Year Spring Marketing Plan',
  description:
    'Marketing report summarizing the planned spending accross departments during the 2022 spring season.',
  user_id: @guest_user.id,
  total_cost: 90_000
)

@workflow_template = WorkflowTemplate.create(name: 'doa Approval')
