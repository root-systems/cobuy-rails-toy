class Supplier < ApplicationRecord
  belongs_to :group
  has_many :products
end
