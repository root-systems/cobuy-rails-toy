Rails.application.routes.draw do
  devise_for :users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth'
      resources :groups
      resources :suppliers
      resources :products
      resources :price_specs
      resources :wants
    end
  end
  root 'tests#hello'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
