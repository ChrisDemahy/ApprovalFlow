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

# Create the final user in the approval chain
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
    name: 'Mike Smith',
    password: 'abc123',
    password_confirmation: 'abc123',
    email: 'mike@gmail.com',
    organization_id: organization.id,
    doa: 40_000,
    supervisor_id: @first_user.id
  )

@third_user =
  User.create!(
    name: 'Jack Deaton',
    password: 'abc123',
    password_confirmation: 'abc123',
    email: 'jack@gmail.com',
    organization_id: organization.id,
    doa: 26_500,
    supervisor_id: @second_user.id
  )

@fourth_user =
  User.create!(
    name: 'Marry Horton',
    password: 'abc123',
    password_confirmation: 'abc123',
    email: 'Marry@gmail.com',
    organization_id: organization.id,
    doa: 86_500,
    supervisor_id: @second_user.id
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

project_names.each do |name|
  @projects <<
    Project.create!(
      name: name,
      description:
        Faker::Lorem.sentence(
          word_count: 3, supplemental: false, random_words_to_add: 15
        ),
      user_id: @third_user.id,
      total_cost: cost
    )
  cost = cost * 2
end

@workflow_template = WorkflowTemplate.create(name: 'doa Approval')
