module Api::V1
  class SuppliersController < ApiController
    before_action :set_supplier, only: [:show, :update, :destroy]

    # GET /suppliers
    def index
      @suppliers = Supplier.where(group_id: current_user.group_id)
      render :json => @suppliers
    end

    # GET /suppliers/:id
    def show
      render :json => @supplier
    end

    # POST /suppliers
    def create
      @supplier = Supplier.new(supplier_params)
      @supplier.group_id = current_user.group_id
      @supplier.save!
      if @supplier.errors.empty?
        render json: @supplier, status: :ok
      else
        render json: { errors: @supplier.errors.full_messages },
               status: :unprocessable_entity
      end
    end

    # PUT /suppliers/:id
    def update
      @supplier.update(supplier_params)
      if @supplier.errors.empty?
        render json: @supplier, status: :ok
      else
        render json: { errors: @supplier.errors.full_messages },
               status: :unprocessable_entity
      end
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
