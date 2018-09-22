module Api::V1
  class ProductsController < ApiController
    before_action :set_product, only: [:show, :update, :destroy]

    # GET /products
    def index
      @products = Product.all
      render :json => @products
    end

    # GET /products/:id
    def show
      render :json => @product
    end

    # POST /products
    def create
      @product = Product.create!(product_params)
      if @product.errors.empty?
        render json: @product, status: :accepted
      else
        render json: { errors: @product.errors.full_messages },
               status: :unprocessable_entity
      end
    end

    # PUT /products/:id
    def update
      @product.update(product_params)
      if @product.errors.empty?
        render json: @product, status: :accepted
      else
        render json: { errors: @product.errors.full_messages },
               status: :unprocessable_entity
      end
    end

    # DELETE /products/:id
    def destroy
      @product.destroy
      head :no_content
    end

    private

    def product_params
      params.permit(:name, :description, :image, :supplier_id, :price_specs => [:price, :minimum, :currency, :product_id])
    end

    def set_product
      @product = Product.find(params[:id])
    end

  end
end
