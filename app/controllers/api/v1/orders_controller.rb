module Api::V1
  class OrdersController < ApiController
    before_action :set_order, only: [:show, :update, :destroy]

    # GET /orders
    def index
      @orders = Order.all
      render :json => @orders
    end

    # GET /orders/:id
    def show
      render :json => @order
    end

    # POST /orders
    def create
      @order.create!(order_params)
      render :json => @order
    end

    # PUT /orders/:id
    def update
      @order.update(order_params)
      head :no_content
    end

    # DELETE /orders/:id
    def destroy
      @order.destroy
      head :no_content
    end

    private

    def order_params
      params.permit(:name)
    end

    def set_order
      @order = Order.find(params[:id])
    end

  end
end
