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
          self.aggregate_and_update_line_items(line_item, wants, price_spec)
        else
          line_item.destroy!
        end
      end
    end
  end

  def self.confirm (order_id)
    line_items = LineItem.where(order_id: order_id)
    line_items_by_product_id = LineItem.where(order_id: 3).group_by { |li| li.product_id }
    line_items_by_product_id.each do |product_id, line_items|
      cheapest_achieved_line_item = line_items.select { |li| li.minimum_achieved == true }.sort_by { |li| li.price_per_unit }.first
      if cheapest_achieved_line_item.present?
        cheapest_achieved_line_item.confirmed = true
        cheapest_achieved_line_item.save!
      else
        return
      end
    end
  end

  def self.get_related_price_specs (product_id)
    PriceSpec.where(product_id: product_id)
  end

  def self.aggregate_and_update_line_items (line_item, wants, price_spec)
    total_quantity_wanted = wants.reduce(0) do |sofar, want|
      sofar + want.quantity
    end
    minimum_achieved = price_spec.minimum <= total_quantity_wanted
    total_price = total_quantity_wanted * price_spec.price
    line_item.update_attributes(quantity: total_quantity_wanted, total_price: total_price, minimum_achieved: minimum_achieved)
  end

end
