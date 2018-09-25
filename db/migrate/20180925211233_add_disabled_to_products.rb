class AddDisabledToProducts < ActiveRecord::Migration[5.2]
  def change
    add_column :products, :disabled, :boolean, default: false
  end
end
