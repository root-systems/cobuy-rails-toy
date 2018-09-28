class AddMinimumAchievedAndConfirmedToLineItems < ActiveRecord::Migration[5.2]
  def change
    add_column :line_items, :minimum_achieved, :boolean, default: false
    add_column :line_items, :confirmed, :boolean, default: false
  end
end
