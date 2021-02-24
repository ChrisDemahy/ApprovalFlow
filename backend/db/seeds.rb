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
project_names = [
  'Oasis of the Seas Rudder Replacement',
  'Majesty of the Seas Bi-Yearly Mainenace',
  '2021 Port of Galveston Terminal Rennovation',
  'Independence of the Seas Cabin Rennovation',
  'Enchantment of the Seas Quadrennial Hull Inspection',
  '2020 Fiscal Year Annual Customer Experience Report'
]

# Project 1
project1 =
  Project.create!(
    name: 'Oasis of the Seas Rudder Replacement',
    description:
      'Maintenance showed damage to the main rudder of the Oasis of the Seas. Initial reports show arrangements should be made for full replacement of the rudder and will require the ship to be out of commision for many months. ',
    user_id: @fourth_user.id,
    total_cost: 65_000
  )

# Create the first workflow, to be denied and resubmitted
workflow_run1 =
  WorkflowRun.create!(
    name: 'Oasis of the Seas Rudder Replacement',
    description: 'First submission',
    project_id: project1.id
  )

# To setup a workflow, call the method that creates all the steps,
#   authorizations, etc...

# Submit for approval also saves the workflow_run
workflow_run1.submit_for_approval(@fourth_user)
byebug

# first Authorization
Authorization.create!(
  user_id: @fourth_user.id,
  step_id: workflow_run1.current_step_id,
  status: 'approved',
  description: 'Looks good!'
)
# second Authorization
Authorization.create!(
  user_id: @third_user.id,
  step_id: workflow_run1.current_step_id,
  status: 'denied',
  description: 'Dates need to be adjusted to account for the july 4th holidy.'
)

# Project 2

Project.create!(
  name: 'Majesty of the Seas Bi-Yearly Mainenace',
  description:
    'Majesty of the Seas requires maintenance in july. The maintanene will be done in the Port of Galveston and commence on the 3rd through the 29th.',
  user_id: @third_user.id,
  total_cost: 72_000
)

# Project 3

Project.create!(
  name: '2021 Port of Galveston Terminal Rennovation',
  description:
    '2021 will see the rennovation of the Royal Carribean facilities in Galveston. These will include a replacement of existing docks as well as refreshing the corporate branch office.',
  user_id: @fourth_user.id,
  total_cost: 105_000
)

# Project 4

Project.create!(
  name: 'Independence of the Seas Cabin Rennovation',
  description:
    '2022 will see the rennovation of the residential cabins on the Independence of the Seas. These will include updating furniture and bathroom fixtures, as well as supporting new technology services such as app integration.',
  user_id: @third_user.id,
  total_cost: 175_000
)

# Project 5

Project.create!(
  name: '2022 Fiscal Year Marketing Budget',
  description:
    'Annual budget summarizing the planned spending accross different teams under marketing.',
  user_id: @guest_user.id,
  total_cost: 90_000
)

@workflow_template = WorkflowTemplate.create(name: 'doa Approval')
