module Api::V1
  class SuppliersController < ApiController
    before_action :set_supplier, only: [:show, :update, :destroy]

    # GET /suppliers
    def index
      @suppliers = Supplier.all
      render :json => @suppliers
    end

    # GET /suppliers/:id
    def show
      render :json => @supplier
    end

    # POST /suppliers
    def create
      @supplier.create!(supplier_params)
      render :json => @supplier
    end

    # PUT /suppliers/:id
    def update
      @supplier.update(supplier_params)
      head :no_content
    end

    # DELETE /suppliers/:id
    def destroy
      @supplier.destroy
      head :no_content
    end

    private

    def supplier_params
      params.permit(:name, :group_id)
    end

    def set_supplier
      @supplier = Supplier.find(params[:id])
    end

  end
end
