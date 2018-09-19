class CreateSuppliers < ActiveRecord::Migration[5.2]
  def change
    create_table :suppliers do |t|
      t.string :name
      t.integer :group_id
      t.timestamps
    end

    add_index :suppliers, :group_id
  end
end
