Rails.application.routes.draw do
  resources :workflow_templates
  resources :workflow_runs
  scope :api, defaults: { format: :json } do
    devise_for :users,
               controllers: { sessions: :sessions },
               path_names: { sign_in: :login }
      resources :notifications
    resources :authorizations
    resources :steps
      resources :projects

    resource :user, only: %i[show update]
    resources :organizations
  end
end
