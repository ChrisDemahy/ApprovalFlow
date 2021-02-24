# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_02_24_195042) do
  # These are extensions that must be enabled in order to support this database
  enable_extension 'plpgsql'

  create_table 'authorizations', force: :cascade do |t|
    t.bigint 'user_id'
    t.bigint 'step_id'
    t.string 'status'
    t.text 'description'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index %w[step_id], name: 'index_authorizations_on_step_id'
    t.index %w[user_id], name: 'index_authorizations_on_user_id'
  end

  create_table 'notifications', force: :cascade do |t|
    t.bigint 'user_id', null: false
    t.string 'name'
    t.string 'content'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.bigint 'authorization_id'
    t.bigint 'project_id'
    t.index %w[authorization_id],
            name: 'index_notifications_on_authorization_id'
    t.index %w[project_id], name: 'index_notifications_on_project_id'
    t.index %w[user_id], name: 'index_notifications_on_user_id'
  end

  create_table 'organizations', force: :cascade do |t|
    t.string 'name'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
  end

  create_table 'projects', force: :cascade do |t|
    t.bigint 'user_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.float 'total_cost'
    t.string 'status', default: 'created'
    t.string 'name'
    t.bigint 'workflow_run_id'
    t.bigint 'workflow_template_id'
    t.text 'description'
    t.index %w[user_id], name: 'index_projects_on_user_id'
    t.index %w[workflow_run_id], name: 'index_projects_on_workflow_run_id'
    t.index %w[workflow_template_id],
            name: 'index_projects_on_workflow_template_id'
  end

  create_table 'steps', force: :cascade do |t|
    t.string 'name'
    t.string 'status'
    t.text 'description'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.bigint 'workflow_run_id'
    t.bigint 'next_step_id'
    t.bigint 'user_id', null: false
    t.bigint 'project_id'
    t.index %w[next_step_id], name: 'index_steps_on_next_step_id'
    t.index %w[project_id], name: 'index_steps_on_project_id'
    t.index %w[user_id], name: 'index_steps_on_user_id'
    t.index %w[workflow_run_id], name: 'index_steps_on_workflow_run_id'
  end

  create_table 'users', force: :cascade do |t|
    t.string 'email', default: '', null: false
    t.string 'encrypted_password', default: '', null: false
    t.string 'reset_password_token'
    t.datetime 'reset_password_sent_at'
    t.datetime 'remember_created_at'
    t.integer 'sign_in_count', default: 0, null: false
    t.datetime 'current_sign_in_at'
    t.datetime 'last_sign_in_at'
    t.inet 'current_sign_in_ip'
    t.inet 'last_sign_in_ip'
    t.string 'confirmation_token'
    t.datetime 'confirmed_at'
    t.datetime 'confirmation_sent_at'
    t.string 'unconfirmed_email'
    t.integer 'failed_attempts', default: 0, null: false
    t.string 'unlock_token'
    t.datetime 'locked_at'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.bigint 'organization_id'
    t.float 'doa'
    t.bigint 'supervisor_id'
    t.string 'name'
    t.index %w[confirmation_token],
            name: 'index_users_on_confirmation_token', unique: true
    t.index %w[email], name: 'index_users_on_email', unique: true
    t.index %w[organization_id], name: 'index_users_on_organization_id'
    t.index %w[reset_password_token],
            name: 'index_users_on_reset_password_token', unique: true
    t.index %w[supervisor_id], name: 'index_users_on_supervisor_id'
    t.index %w[unlock_token], name: 'index_users_on_unlock_token', unique: true
  end

  create_table 'workflow_runs', force: :cascade do |t|
    t.string 'name'
    t.text 'description'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.bigint 'first_step_id'
    t.bigint 'current_step_id'
    t.bigint 'last_step_id'
    t.bigint 'project_id', null: false
    t.string 'status'
    t.index %w[current_step_id], name: 'index_workflow_runs_on_current_step_id'
    t.index %w[first_step_id], name: 'index_workflow_runs_on_first_step_id'
    t.index %w[last_step_id], name: 'index_workflow_runs_on_last_step_id'
    t.index %w[project_id], name: 'index_workflow_runs_on_project_id'
  end

  create_table 'workflow_templates', force: :cascade do |t|
    t.string 'name'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
  end

  add_foreign_key 'authorizations', 'steps'
  add_foreign_key 'authorizations', 'users'
  add_foreign_key 'notifications', 'authorizations'
  add_foreign_key 'notifications', 'projects'
  add_foreign_key 'notifications', 'users'
  add_foreign_key 'projects', 'users'
  add_foreign_key 'projects', 'workflow_runs'
  add_foreign_key 'projects', 'workflow_templates'
  add_foreign_key 'steps', 'users'
  add_foreign_key 'steps', 'workflow_runs'
  add_foreign_key 'users', 'organizations'
  add_foreign_key 'workflow_runs', 'projects'
end
