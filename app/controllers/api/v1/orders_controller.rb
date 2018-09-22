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
      @order = Order.create!(order_params)
      render :json => @order
    end

    # PUT /orders/:id
    def update
      @order.update(order_params)
      render :json => @order
    end

    # DELETE /orders/:id
    def destroy
      @order.destroy
      head :no_content
    end

    private

    def order_params
      params.permit(:name, :group_id, :supplier_id)
    end

    def set_order
      @order = Order.find(params[:id])
    end

  end
end
