class Want < ApplicationRecord
  belongs_to :user
  belongs_to :product
  belongs_to :price_spec
end
