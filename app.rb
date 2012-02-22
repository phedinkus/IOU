require 'sinatra'
require 'omniauth'
require 'omniauth-twitter'
require 'haml'
require 'json'
require 'data_mapper'
require 'ruby-debug'
require './lib/models'

class IOU < Sinatra::Application
  
  set :haml, { format: :html5 }
  set :sass, { style: :compact, debug_info: false }
  
  use Rack::Session::Cookie

  use OmniAuth::Builder do
    # provider :open_id, OpenID::Store::Filesystem.new('/tmp')
    provider :twitter, 'OyahKCdOr60bNQHQ59YVxQ', '2wYZPDZaoNI8ELK843c44e1wXGPsEaM02BIa5HiN5Y'
  end
  
  helpers do
    def current_user  
      @current_user ||= User.get(session[:user_id]) if session[:user_id]  
    end
  end
  
  before do
    unless ["/sign_in", "/auth/twitter", "/auth/twitter/callback"].include? request.path_info
      
      redirect '/sign_in' unless current_user
    end
  end
  
  get '/sign_in' do
    haml :sign_in
  end
  
  get '/auth/twitter/callback' do
    auth = request.env['omniauth.auth']
    user = User.get(uid: auth["uid"]) || User.create(provider: auth["provider"], uid: auth["uid"], name: auth["info"]["name"], nickname: auth["info"]["nickname"])
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