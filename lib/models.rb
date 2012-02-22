require 'digest'
require 'date'

DataMapper.setup(:default, ENV['DATABASE_URL'] || 'postgres://localhost/iou')

class User
  include DataMapper::Resource
  
  property :id,           Serial
  property :name,         String
  property :nickname,     String
  property :email,        String, unique: true
  property :uid,          String, unique: true
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
  
  def with_tallies
    tally_attrs = []
    tallies.each do |tally|
      tally_attrs << tally.attributes
    end
    self.attributes.merge({tallies: tally_attrs})
  end
  
  def self.all_with_tallies
    debtor_array = []
    all.each do |debtor|
      debtor_array << debtor.with_tallies
    end
    debtor_array
  end
end

class Tally
  include DataMapper::Resource
  
  property :id,       Serial
  property :amount,   Float
  
  belongs_to :debtor, key: true
end

User.storage_exists? ? User.auto_upgrade! : User.auto_migrate!
Debtor.storage_exists? ? Debtor.auto_upgrade! : Debtor.auto_migrate!
Tally.storage_exists? ? Tally.auto_upgrade! : Tally.auto_migrate!