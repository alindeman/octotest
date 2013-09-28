class SessionsController < ApplicationController
  def index
    redirect_to '/auth/github'
  end

  def create
    session[:access_token] = request.env['omniauth.auth'].credentials.token
    redirect_to '/charts'
  end

  def charts
  end

  private
  def octokit_client
    Octokit::Client.new(access_token: session[:access_token])
  end

  def languages
    repositories = octokit_client.repositories
    languages = repositories.each_with_object(Hash.new(0)) do |repo, languages|
      octokit_client.languages(repo.full_name).attrs.each do |language, bytes|
        languages[language.to_s] += bytes
      end
    end

    languages.
      sort_by { |name, count| -count }.
      map     { |name, count| { name: name, count: count } }
  end
  helper_method :languages
end
