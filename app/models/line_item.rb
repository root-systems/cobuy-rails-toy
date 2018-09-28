class LineItem < ApplicationRecord
  belongs_to :order
  belongs_to :product

  def self.recompute (order_id, product_ids)
    product_ids.each do |product_id|
      line_item = self.get_related_line_item
      wants = self.get_related_wants(order_id, product_id)
      price_specs = self.get_related_price_specs(product_id)
      if line_item.present?
        puts "a line item exists for this product and order"
        if wants.none?
          puts "wants no longer exist for this line item, so destroy it"
          line_item.destroy!
          return
        end
        self.aggregate(line_item, wants, price_specs)
      else
        puts "a line item doesn't yet exist for this product and order, creating one"
        new_line_item = LineItem.create!(order_id: order_id, product_id: product_id)
        self.aggregate(new_line_item, wants, price_specs)
      end
    end
  end

  def self.get_related_wants (order_id, product_id)
    Want.where(order_id: order_id, product_id: product_id, disabled: false)
  end

  def self.get_related_price_specs (product_id)
    PriceSpec.where(product_id: product_id)
  end

  def self.get_related_line_item (order_id, product_id)
    LineItem.where(order_id: order_id, product_id: product_id).first
  end

  def self.aggregate (line_item, wants, price_specs)
    # GK: TODO: aggregation logic here
  end
end
