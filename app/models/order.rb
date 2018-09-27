class Order < ApplicationRecord
  belongs_to :group
  belongs_to :supplier
  has_many :wants
  has_many :line_items
end
