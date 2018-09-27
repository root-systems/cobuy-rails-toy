module Api::V1
  class WantsController < ApiController
    before_action :set_want, only: [:show, :update, :destroy]

    # GET /wants
    def index
      @wants = Want.where(user_id: current_user.id, disabled: false)
      render :json => @wants
    end

    # GET /wants/:id
    def show
      render :json => @want
    end

    # POST /wants
    def create
      @want = Want.create!(want_params)
      if @want.errors.empty?
        render json: @want, status: :ok
      else
        render json: { errors: @want.errors.full_messages },
               status: :unprocessable_entity
      end
    end

    # POST /wants/batch
    def batch_create
      wants_params = want_params[:wants]
      old_want_ids = want_params[:old_want_ids]
      order_id = nil
      if (old_want_ids.present?) && (old_want_ids.any?)
        old_want_ids.each do |old_want_id|
          old_want = Want.find(old_want_id)
          order_id = old_want.order_id
          old_want.disabled = true
          old_want.save!
        end
      end
      @new_wants = []
      if wants_params.any?
        wants_params.each do |want_params|
          want_params[:user_id] = current_user.id
          want = Want.create!(want_params)
          @new_wants << want
        end
      end
      if @new_wants.any?
        render json: @new_wants, status: :ok
      else
        # GK: TODO: this is a hack for an edge case where no new wants are submitted, so the old ones are deleted
        # so returning the order id so that the client knows which wants to remove from state
        # want to have a custom endpoint and a different action to handle such a scenario in future
        render json: { :order_id => order_id }, status: :ok
      end
    end

    # PUT /wants/:id
    def update
      @want.update(want_params)
      if @want.errors.empty?
        render json: @want, status: :ok
      else
        render json: { errors: @want.errors.full_messages },
               status: :unprocessable_entity
      end
    end

    # DELETE /wants/:id
    def destroy
      @want.destroy
      head :no_content
    end

    private

    def want_params
      params.permit(:user_id, :product_id, :order_id, :price_spec_id, :product_name, :quantity, :old_want_ids => [], :wants => [ :product_id, :order_id, :price_spec_id, :product_name, :quantity ])
    end

    def set_want
      @want = Want.find(params[:id])
    end

  end
end
