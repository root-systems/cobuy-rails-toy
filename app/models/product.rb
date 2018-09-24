class Product < ApplicationRecord
  belongs_to :supplier
  has_many :price_specs
  has_many :wants

  accepts_nested_attributes_for :price_specs
end
