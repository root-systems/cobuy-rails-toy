class TestsController < ApiController
  def hello
    render json: { 'hi': 'there' }
  end
end
