class Group < ApplicationRecord
  has_many :users
  has_many :suppliers

  def self.create_and_update_creator (group_params, creator)
    ActiveRecord::Base.transaction do
      group = Group.create!(group_params)
      creator.group = group
      creator.save!
      group
    end
  end
end
