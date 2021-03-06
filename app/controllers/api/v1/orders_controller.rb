module Api::V1
  class OrdersController < ApiController
    before_action :set_order, only: [:show, :update, :destroy, :confirm]

    # GET /orders
    def index
      @orders = Order.where(group_id: current_user.group_id)
      render :json => @orders
    end

    # GET /orders/:id
    def show
      render :json => @order
    end

    # POST /orders
    def create
      @order = Order.create!(order_params)
      if @order.errors.empty?
        render json: @order, status: :ok
      else
        render json: { errors: @order.errors.full_messages },
               status: :unprocessable_entity
      end
    end

    # PUT /orders/:id
    def update
      @order.update(order_params)
      if @order.errors.empty?
        render json: @order, status: :ok
      else
        render json: { errors: @order.errors.full_messages },
               status: :unprocessable_entity
      end
    end

    # PATCH /orders/:id/confirm
    def confirm
      @order.confirmed_at = Time.now
      LineItem.confirm(@order.id)
      @order.save!
      if @order.errors.empty?
        render json: @order, status: :ok
      else
        render json: { errors: @order.errors.full_messages },
               status: :unprocessable_entity
      end
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
