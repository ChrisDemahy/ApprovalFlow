require 'test_helper'

class OganizationUsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @oganization_user = oganization_users(:one)
  end

  test "should get index" do
    get oganization_users_url, as: :json
    assert_response :success
  end

  test "should create oganization_user" do
    assert_difference('OganizationUser.count') do
      post oganization_users_url, params: { oganization_user: { organization_id: @oganization_user.organization_id, user_id: @oganization_user.user_id } }, as: :json
    end

    assert_response 201
  end

  test "should show oganization_user" do
    get oganization_user_url(@oganization_user), as: :json
    assert_response :success
  end

  test "should update oganization_user" do
    patch oganization_user_url(@oganization_user), params: { oganization_user: { organization_id: @oganization_user.organization_id, user_id: @oganization_user.user_id } }, as: :json
    assert_response 200
  end

  test "should destroy oganization_user" do
    assert_difference('OganizationUser.count', -1) do
      delete oganization_user_url(@oganization_user), as: :json
    end

    assert_response 204
  end
end
