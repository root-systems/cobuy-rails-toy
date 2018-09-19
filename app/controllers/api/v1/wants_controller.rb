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
      @want.create!(want_params)
      render :json => @want
    end

    # PUT /wants/:id
    def update
      @want.update(want_params)
      head :no_content
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
