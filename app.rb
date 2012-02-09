require 'bundler'
Bundler.require
require './lib/json_db'

class IOU < Sinatra::Application
  
  set :haml, { format: :html5 }
  set :sass, { style: :compact, debug_info: false }
  
  before do
    @db = JSONDb.new "db-#{ENV['RACK-ENV']}.json"
  end
    
  get '/' do
    haml :index
  end
  
  get '/debts' do
    content_type :json
    [{amount: 5, name: "adam"}, {amount: 10, name: "eve"}, {amount: -4, name: "dino"}].to_json
    # @db.members.to_json
  end
end