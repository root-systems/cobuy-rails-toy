module Api::V1
  class GroupsController < ApiController
    before_action :set_group, only: [:show, :update, :destroy]

    # GET /groups
    def index
      @groups = Group.all
      render :json => @groups
    end

    # GET /groups/:id
    def show
      render :json => @group
    end

    # POST /groups
    def create
      @group.create!(group_params)
      render :json => @group
    end

    # PUT /groups/:id
    def update
      @group.update(group_params)
      head :no_content
    end

    # DELETE /groups/:id
    def destroy
      @group.destroy
      head :no_content
    end

    private

    def group_params
      params.permit(:name)
    end

    def set_group
      @group = Group.find(params[:id])
    end

  end
end