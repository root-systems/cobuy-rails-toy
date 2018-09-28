class AddPriceSpecIdToLineItems < ActiveRecord::Migration[5.2]
  def change
    add_column :line_items, :price_spec_id, :integer
  end
end
