class Product < ApplicationRecord
  belongs_to :supplier
  has_many :price_specs
end
