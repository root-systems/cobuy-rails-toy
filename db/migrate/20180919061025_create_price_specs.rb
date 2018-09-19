class CreatePriceSpecs < ActiveRecord::Migration[5.2]
  def change
    create_table :price_specs do |t|
      t.decimal :price
      t.float :minimum
      t.string :currency, :default => "NZD"
      t.integer :product_id

      t.timestamps
    end

    add_index :price_specs, :product_id
  end
end
