class LineItem < ApplicationRecord
  belongs_to :order
  belongs_to :product

  def self.recompute (order_id, product_ids)
    product_ids.each do |product_id|
      price_specs = self.get_related_price_specs(product_id)
      price_specs.each do |price_spec|
        line_item = LineItem.where(price_spec_id: price_spec.id, product_id: product_id, order_id: order_id, price_per_unit: price_spec.price).first_or_create
        wants = Want.where(price_spec_id: price_spec.id, disabled: false)
        if wants.any?
          self.aggregate(line_item, wants, price_spec)
        else
          line_item.update_attributes(quantity: 0, total_price: 0, minimum_achieved: false)
        end
      end
    end
  end

  def self.get_related_price_specs (product_id)
    PriceSpec.where(product_id: product_id)
  end

  def self.aggregate (line_item, wants, price_spec)
    total_quantity_wanted = wants.reduce(0) do |sofar, want|
      sofar + want.quantity
    end
    minimum_achieved = price_spec.minimum <= total_quantity_wanted
    total_price = total_quantity_wanted * price_spec.price
    line_item.update_attributes(quantity: total_quantity_wanted, total_price: total_price, minimum_achieved: minimum_achieved)
  end

end
