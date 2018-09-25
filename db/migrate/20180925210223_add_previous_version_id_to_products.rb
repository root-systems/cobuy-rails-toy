class AddPreviousVersionIdToProducts < ActiveRecord::Migration[5.2]
  def change
    add_column :products, :previous_version_id, :integer
  end
end
