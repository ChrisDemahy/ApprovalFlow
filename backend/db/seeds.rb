# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all

user =
  User.create! name: 'John Doe',
               email: 'john@gmail.com',
               password: 'topsecret',
               password_confirmation: 'topsecret'
workflow1 = Workflow.create user_id: user1.id
project1 = Project.create user_id: user1.id, workflow_id: workflow1.id
