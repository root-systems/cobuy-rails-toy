class AddConfirmedAtToOrders < ActiveRecord::Migration[5.2]
  def change
    add_column :orders, :confirmed_at, :timestamp
  end
end
