class AddDisabledToWants < ActiveRecord::Migration[5.2]
  def change
    add_column :wants, :disabled, :boolean, default: false
  end
end
