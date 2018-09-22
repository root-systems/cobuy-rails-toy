module Api::V1
  class WantsController < ApiController
    before_action :set_want, only: [:show, :update, :destroy]

    # GET /wants
    def index
      @wants = Want.all
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
        render json: @want, status: :accepted
      else
        render json: { errors: @want.errors.full_messages },
               status: :unprocessable_entity
      end
    end

    # PUT /wants/:id
    def update
      @want.update(want_params)
      if @want.errors.empty?
        render json: @want, status: :accepted
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
      params.permit(:user_id, :product_id, :order_id, :price_spec_id, :product_name, :quantity)
    end

    def set_want
      @want = Want.find(params[:id])
    end

  end
end
