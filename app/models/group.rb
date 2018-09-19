class Group < ApplicationRecord
  has_many :users
  has_one :supplier
end
