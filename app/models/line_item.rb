class LineItem < ApplicationRecord
  belongs_to :order
  belongs_to :product

  def self.recompute (order_id, product_ids)
    product_ids.each do |product_id|
      line_item = LineItem.where(order_id: order_id, product_id: product_id)
      if line_item.present?
        puts "a line item exists for this product and order"
        # GK: TODO: logic here
      else
        puts "a line item doesn't yet exist for this product and order"
        # GK: TODO: logic here
      end
    end
  end
end
