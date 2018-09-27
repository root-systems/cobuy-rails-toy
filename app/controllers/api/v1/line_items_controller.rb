module Api::V1
  class LineItemsController < ApiController
    before_action :set_line_item, only: [:show, :update, :destroy]

    # GET /line_items
    def index
      @line_items = LineItem.all
      render :json => @line_items
    end

    # GET /line_items/:id
    def show
      render :json => @line_item
    end

    # POST /line_items
    def create
      @line_item = LineItem.create!(line_item_params)
      if @line_item.errors.empty?
        render json: @line_item, status: :ok
      else
        render json: { errors: @line_item.errors.full_messages },
               status: :unprocessable_entity
      end
    end

    # PUT /line_items/:id
    def update
      @line_item.update(line_item_params)
      if @line_item.errors.empty?
        render json: @line_item, status: :ok
      else
        render json: { errors: @line_item.errors.full_messages },
               status: :unprocessable_entity
      end
    end

    # DELETE /line_items/:id
    def destroy
      @line_item.destroy
      head :no_content
    end

    private

    def line_item_params
      params.permit(:product_id, :order_id, :total_price, :price_per_unit, :quantity)
    end

    def set_line_item
      @line_item = LineItem.find(params[:id])
    end

  end
end
