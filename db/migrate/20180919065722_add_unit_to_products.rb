class AddUnitToProducts < ActiveRecord::Migration[5.2]
  def change
    add_column :products, :unit, :string
  end
end
