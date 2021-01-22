# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

project1 = Project.create user_id: user.id, workflow_id: workflow1.id

# Gernereate new users, Boards, Swimlanes,
#  and Cards, as well as associate all of them
require 'faker'

User.destroy_all
Project.destroy_all
Step.destroy_all
Organization.destroy_all
Workflow.destroy_all

#=> "kirsten.greenholt@corkeryfisher.info"
@users = []
5.times do |i|
  @users <<
    User.create!(
      name: Faker::Name.name,
      password: 'abc123',
      password_confirmation: 'abc123',
      email: Faker::Internet.email
    )
end

workflow =
  Workflow.create user_id: user.id,
                  name: 'DOA Workflow',
                  description: 'Workflow for DOA Approval.'

@projects = []
@users.each do |user|
  2.times do
    @projects <<
      Project.create(
        name: Faker::App.name,
        description:
          Faker::Lorem.sentence(
            word_count: 3, supplemental: false, random_words_to_add: 15
          ),
        user_id: user.id,
        workflow_id: workflow.id
      )
  end
end
