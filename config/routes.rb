Rails.application.routes.draw do
  devise_for :users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  namespace :api do
    scope :v1 do
      mount_devise_token_auth_for 'User', at: 'auth'
    end
  end
  root 'tests#hello'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
