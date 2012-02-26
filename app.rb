require 'sinatra'
require 'omniauth'
require 'omniauth-twitter'
require 'haml'
require 'json'
require 'data_mapper'
require 'ruby-debug'
require './lib/models'

class IOU < Sinatra::Application
  set :root, File.dirname(__FILE__)
  set :haml, { format: :html5 }
  set :sass, { style: :compact, debug_info: false }
  
  enable :sessions
  
  def self.load_config(file)
    if File.exist? file
      yaml = YAML.load_file file
      set yaml
    end
  end
  
  configure do
    load_config "./config/twitter.yml"
  end
  
  use OmniAuth::Builder do
    provider :twitter, IOU.settings.consumer_key, IOU.settings.consumer_secret
  end

  
  helpers do
    def current_user
      @current_user ||= User.get(session[:user_id]) if session[:user_id]
    end
  end
  
  before do 
    unless ['/sign_in', "/auth/twitter", "/auth/twitter/callback"].include? request.path_info
      redirect '/sign_in' unless current_user
    end
  end

  
  get '/sign_in' do
    haml :sign_in
  end
  
  get '/auth/twitter/callback' do
    auth = request.env['omniauth.auth']
    user = User.first(uid: auth["uid"]) || User.create(provider: auth["provider"], uid: auth["uid"], name: auth["info"]["name"], nickname: auth["info"]["nickname"])
    session[:user_id] = user.id
    redirect '/'
  end
  
  get '/session/destroy' do
    session[:user_id] = nil
    redirect '/sign_in'
  end
    
  get '/' do
    
    haml :index
  end
  
  get '/api/debtors' do
    content_type :json
    current_user.debtors.all_with_tallies.to_json
  end
  
  post '/api/debtors' do
    
  end
  
  post '/api/tallies' do
    
    content_type :json
    
    params = request.body.read
    tally = Tally.new(JSON.parse(params))
    if tally.save
      tally.to_json#, status: 201
    end
    # 
    # record.to_json
  end
  

end