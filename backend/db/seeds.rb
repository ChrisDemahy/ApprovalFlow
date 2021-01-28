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

organization = Organization.create name: 'Royal Carribean'

#=> "kirsten.greenholt@corkeryfisher.info"
@users = []

# Create the final user in the approval chain
@super_user =
  User.create!(
    name: 'Chris Demahy',
    password: 'abc123',
    password_confirmation: 'abc123',
    email: 'demahyc@gmail.com',
    organization_id: organization.id,
    doa: 500_000
  )

@previous_user =
  User.create!(
    name: 'Mike Smith',
    password: 'abc123',
    password_confirmation: 'abc123',
    email: 'mike@gmail.com',
    organization_id: organization.id,
    doa: 12_000
  )
@users << @previous_user

doa = 76_500
1.times do |i|
  @new_user =
    User.create!(
      name: 'Jack Deaton',
      password: 'abc123',
      password_confirmation: 'abc123',
      email: Faker::Internet.email,
      organization_id: organization.id,
      doa: doa
    )
  @users << @new_user
  doa = doa + 1000

  @previous_user.supervisor = @new_user
  @previous_user.save
  @previous_user = @new_user
end
# Set the last personn's supervisor to the super user
@previous_user.supervisor_id = @super_user

@projects = []
cost = 17_000
project_names = [
  'Oasis of the Seas Rudder Replacement',
  'Majesty of the Seas Bi-Yearly Mainenace',
  '2021 Houston Port Rennovation'
]
3.times do |index|
  @projects <<
    Project.create!(
      name: project_names[index],
      description:
        Faker::Lorem.sentence(
          word_count: 3, supplemental: false, random_words_to_add: 15
        ),
      user_id: @users.first.id,
      total_cost: cost
    )
  cost = cost * 2
end

@workflow_template = WorkflowTemplate.create(name: 'doa Approval')
