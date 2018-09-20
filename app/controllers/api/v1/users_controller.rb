module Api::V1
  class UsersController < ApiController
    before_action :set_user, only: [:show, :update, :destroy]

    # GET /users
    def index
      @users = User.all
      render :json => @users
    end

    # GET /users/:id
    def show
      render :json => @user
    end

    # POST /users
    def create
      @user = User.create!(user_params)
      render :json => @user
    end

    # PUT /users/:id
    def update
      @user.update(user_params)
      render :json => @user
    end

    # DELETE /users/:id
    def destroy
      @user.destroy
      head :no_content
    end

    private

    def user_params
      params.permit(:name, :phone, :shipping_address)
    end

    def set_user
      @user = User.find(params[:id])
    end

  end
end
