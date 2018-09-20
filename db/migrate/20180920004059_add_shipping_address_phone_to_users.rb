class AddShippingAddressPhoneToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :shipping_address, :string
    add_column :users, :phone, :string
  end
end
