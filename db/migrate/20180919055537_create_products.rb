class CreateProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :products do |t|
      t.string :name
      t.text :description
      t.string :image
      t.integer :supplier_id

      t.timestamps
    end
    add_index :products, :supplier_id
  end
end
