class LineItem < ApplicationRecord
  belongs_to :order
  belongs_to :product

  def self.recompute (order_id, product_ids)
    product_ids.each do |product_id|
      line_item = self.get_related_line_item(order_id, product_id)
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
    aggregated_wants_per_price_spec = price_specs.map do |price_spec|
      related_wants = wants.select { |w| w.price_spec_id == price_spec.id }
      total_quantity_wanted = related_wants.reduce do |sofar, related_want|
        sofar + related_want.quantity
      end
      { price: price_spec.price,
        total_quantity_wanted: total_quantity_wanted,
        minimum_achieved: total_quantity_wanted > price_spec.minimum }
    end
    achieved_aggregated_wants_per_price_spec = aggregated_wants_per_price_spec.select { |x| x[:minimum_achieved] == true }
    lowest_priced = achieved_aggregated_wants_per_price_spec.reduce do |last, current|
      if last[:price] < current[:price]
        last
      else
        current
      end
    end
    line_item.quantity = lowest_priced.quantity
    line_item.price_per_unit = lowest_priced.price
    line_item.total_price = lowest_priced.quantity * lowest_priced.price
    line_item.save!
  end

end
