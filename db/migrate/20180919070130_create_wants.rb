class CreateWants < ActiveRecord::Migration[5.2]
  def change
    create_table :wants do |t|
      t.integer :user_id
      t.integer :product_id
      t.integer :price_spec_id
      t.integer :quantity
      t.string :product_name

      t.timestamps
    end

    add_index :wants, :user_id
    add_index :wants, :product_id
    add_index :wants, :price_spec_id
  end
end
