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
      @product.create!(product_params)
      render :json => @product
    end

    # PUT /products/:id
    def update
      @product.update(product_params)
      head :no_content
    end

    # DELETE /products/:id
    def destroy
      @product.destroy
      head :no_content
    end

    private

    def product_params
      params.permit(:name)
    end

    def set_product
      @product = Product.find(params[:id])
    end

  end
end
