module Api::V1
  class WantsController < ApiController
    before_action :set_want, only: [:show, :update, :destroy]

    # GET /wants
    def index
      @wants = Want.where(user_id: current_user.id)
      render :json => @wants
    end

    # GET /wants/:id
    def show
      render :json => @want
    end

    # POST /wants
    def create
      @want = Want.create!(want_params)
      if @want.errors.empty?
        render json: @want, status: :ok
      else
        render json: { errors: @want.errors.full_messages },
               status: :unprocessable_entity
      end
    end

    # POST /wants/batch
    def batch_create
      wants_params = want_params[:wants]
      @new_wants = []
      wants_params.each do |want_params|
        want_params[:user_id] = current_user.id
        want = Want.create!(want_params)
        @new_wants << want
      end
      render json: @new_wants, status: :ok
    end

    # PUT /wants/:id
    def update
      @want.update(want_params)
      if @want.errors.empty?
        render json: @want, status: :ok
      else
        render json: { errors: @want.errors.full_messages },
               status: :unprocessable_entity
      end
    end

    # DELETE /wants/:id
    def destroy
      @want.destroy
      head :no_content
    end

    private

    def want_params
      params.permit(:user_id, :product_id, :order_id, :price_spec_id, :product_name, :quantity, :wants => [ :product_id, :order_id, :price_spec_id, :product_name, :quantity ])
    end

    def set_want
      @want = Want.find(params[:id])
    end

  end
end
