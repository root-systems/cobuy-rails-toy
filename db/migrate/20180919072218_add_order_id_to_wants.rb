class AddOrderIdToWants < ActiveRecord::Migration[5.2]
  def change
    add_column :wants, :order_id, :integer
    add_index :wants, :order_id
  end
end
