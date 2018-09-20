module Api::V1
  class InvitationsController < Devise::InvitationsController
    include DeviseTokenAuth::Concerns::SetUserByToken
    include InvitableMethods
    before_action :authenticate_user!, only: :create
    before_action :resource_from_invitation_token, only: [:edit, :update]

    def create
      User.invite!(invite_params, current_user)
      render json: { success: ['User invited.'] }, status: :created
    end

    # def edit
    #   redirect_to "#{client_api_url}?invitation_token=#{params[:invitation_token]}"
    # end
    #
    # def update
    #   user = User.accept_invitation!(accept_invitation_params)
    #   if @user.errors.empty?
    #     render json: { success: ['User updated.'] }, status: :accepted
    #   else
    #     render json: { errors: user.errors.full_messages },
    #            status: :unprocessable_entity
    #   end
    # end

    private

    def invite_params
      params.permit(:email, :invitation_token, :provider, :skip_invitation)
      # params.permit(user: [:email, :invitation_token, :provider, :skip_invitation])
    end

    def accept_invitation_params
      params.permit(:password, :password_confirmation, :invitation_token)
    end
  end
end
