module Api::V1
  class ProductsController < ApiController
    before_action :set_product, only: [:show, :update, :destroy]

    # GET /products
    def index
      related_supplier_ids = Supplier.where(group_id: current_user.group_id).map(&:id)
      @products = Product.where(supplier_id: related_supplier_ids)
      render :json => @products.to_json( :include => [:price_specs] )
    end

    # GET /products/:id
    def show
      render :json => @product
    end

    # POST /products
    def create
      @product = Product.create!(product_params)
      if @product.errors.empty?
        render json: @product.to_json( :include => [:price_specs] ), status: :ok
      else
        render json: { errors: @product.errors.full_messages },
               status: :unprocessable_entity
      end
    end

    # PUT /products/:id
    def update
      @product.update(product_params)
      if @product.errors.empty?
        render json: @product, status: :ok
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
      params.permit(:name, :description, :image, :supplier_id, :unit, :price_specs_attributes => [:price, :minimum, :currency, :product_id])
    end

    def set_product
      @product = Product.find(params[:id])
    end

  end
end
