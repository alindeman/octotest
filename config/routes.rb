Octotest::Application.routes.draw do
  get '/', to: 'sessions#index'
  get '/auth/:provider/callback', to: 'sessions#create'
  get '/charts', to: 'sessions#charts'
end
