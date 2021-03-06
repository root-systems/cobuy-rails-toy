Rails.application.routes.draw do
  devise_for :users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth', skip: [:invitations]
      devise_for :users, path: "auth", only: [:invitations], controllers: { invitations: 'api/v1/invitations' }
      resources :groups
      resources :suppliers
      resources :products
      resources :price_specs
      resources :wants
      post '/wants/batch', to: 'wants#batch_create'
      resources :orders
      patch '/orders/:id/confirm', to: 'orders#confirm'
      resources :users
      resources :line_items
    end
  end
  root 'tests#hello'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
