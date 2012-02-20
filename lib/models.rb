require 'digest'
require 'date'

DataMapper.setup(:default, ENV['DATABASE_URL'] || 'postgres://localhost/iou')

class User
  include DataMapper::Resource
  
  property :id,           Serial
  property :name,         String
  property :nickname,     String
  property :email,        String
  property :uid,          String
  property :created_at,   DateTime
  property :provider,     String
  
  has n, :debtors
  has n, :tallies, through: :debtors
  
end

class Debtor
  include DataMapper::Resource
  
  property :id,       Serial
  property :name,     String
  property :email,    String
  
  belongs_to :user, key: true
  has n, :tallies
  
end

class Tally
  include DataMapper::Resource
  
  property :id,       Serial
  property :amount,   Float
  
  belongs_to :debtor, key: true
  has 1, :user, through: :debtor
end

User.storage_exists? ? User.auto_upgrade! : User.auto_migrate!
Debtor.storage_exists? ? Debtor.auto_upgrade! : Debtor.auto_migrate!
Tally.storage_exists? ? Tally.auto_upgrade! : Tally.auto_migrate!