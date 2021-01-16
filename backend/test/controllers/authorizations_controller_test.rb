require 'test_helper'

class AuthorizationsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @authorization = authorizations(:one)
  end

  test "should get index" do
    get authorizations_url, as: :json
    assert_response :success
  end

  test "should create authorization" do
    assert_difference('Authorization.count') do
      post authorizations_url, params: { authorization: { description: @authorization.description, status: @authorization.status, step_id: @authorization.step_id, user_id: @authorization.user_id } }, as: :json
    end

    assert_response 201
  end

  test "should show authorization" do
    get authorization_url(@authorization), as: :json
    assert_response :success
  end

  test "should update authorization" do
    patch authorization_url(@authorization), params: { authorization: { description: @authorization.description, status: @authorization.status, step_id: @authorization.step_id, user_id: @authorization.user_id } }, as: :json
    assert_response 200
  end

  test "should destroy authorization" do
    assert_difference('Authorization.count', -1) do
      delete authorization_url(@authorization), as: :json
    end

    assert_response 204
  end
end
