class CreateLineItems < ActiveRecord::Migration[5.2]
  def change
    create_table :line_items do |t|
      t.integer :order_id
      t.integer :product_id
      t.integer :quantity
      t.decimal :price_per_unit
      t.decimal :total_price
      t.timestamps
    end
    add_index :line_items, :order_id
    add_index :line_items, :product_id
  end
end
