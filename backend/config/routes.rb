Rails.application.routes.draw do
  resources :organization_users
  resources :notifications
  resources :authorizations
  resources :steps
  resources :workflows
  resources :projects
    scope :api, defaults: { format: :json } do
        devise_for :users,
                   controllers: { sessions: :sessions },
                   path_names: { sign_in: :login }

        resource :user, only: %i[show update]
        resources :organizations
    end
end
