require 'test_helper'

class WorkflowsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @workflow = workflows(:one)
  end

  test "should get index" do
    get workflows_url, as: :json
    assert_response :success
  end

  test "should create workflow" do
    assert_difference('Workflow.count') do
      post workflows_url, params: { workflow: { description: @workflow.description, name: @workflow.name, user_id: @workflow.user_id } }, as: :json
    end

    assert_response 201
  end

  test "should show workflow" do
    get workflow_url(@workflow), as: :json
    assert_response :success
  end

  test "should update workflow" do
    patch workflow_url(@workflow), params: { workflow: { description: @workflow.description, name: @workflow.name, user_id: @workflow.user_id } }, as: :json
    assert_response 200
  end

  test "should destroy workflow" do
    assert_difference('Workflow.count', -1) do
      delete workflow_url(@workflow), as: :json
    end

    assert_response 204
  end
end
