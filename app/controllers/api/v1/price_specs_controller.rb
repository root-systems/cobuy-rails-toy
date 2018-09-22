module Api::V1
  class PriceSpecsController < ApiController
    before_action :set_price_spec, only: [:show, :update, :destroy]

    # GET /price_specs
    def index
      @price_specs = PriceSpec.all
      render :json => @price_specs
    end

    # GET /price_specs/:id
    def show
      render :json => @price_spec
    end

    # POST /price_specs
    def create
      @price_spec = PriceSpec.create!(price_spec_params)
      if @price_spec.errors.empty?
        render json: @price_spec, status: :ok
      else
        render json: { errors: @price_spec.errors.full_messages },
               status: :unprocessable_entity
      end
    end

    # PUT /price_specs/:id
    def update
      @price_spec.update(price_spec_params)
      if @price_spec.errors.empty?
        render json: @price_spec, status: :ok
      else
        render json: { errors: @price_spec.errors.full_messages },
               status: :unprocessable_entity
      end
    end

    # DELETE /price_specs/:id
    def destroy
      @price_spec.destroy
      head :no_content
    end

    private

    def price_spec_params
      params.permit(:price, :minimum, :currency, :product_id)
    end

    def set_price_spec
      @price_spec = PriceSpec.find(params[:id])
    end

  end
end
