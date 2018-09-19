class PriceSpec < ApplicationRecord
  belongs_to :product
  has_many :wants
end
