class CreateOrders < ActiveRecord::Migration[5.2]
  def change
    create_table :orders do |t|
      t.string :name
      t.integer :group_id
      t.integer :supplier_id

      t.timestamps
    end
  end
end
