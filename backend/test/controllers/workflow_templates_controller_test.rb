require 'test_helper'

class WorkflowTemplatesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @workflow_template = workflow_templates(:one)
  end

  test "should get index" do
    get workflow_templates_url, as: :json
    assert_response :success
  end

  test "should create workflow_template" do
    assert_difference('WorkflowTemplate.count') do
      post workflow_templates_url, params: { workflow_template: { name: @workflow_template.name } }, as: :json
    end

    assert_response 201
  end

  test "should show workflow_template" do
    get workflow_template_url(@workflow_template), as: :json
    assert_response :success
  end

  test "should update workflow_template" do
    patch workflow_template_url(@workflow_template), params: { workflow_template: { name: @workflow_template.name } }, as: :json
    assert_response 200
  end

  test "should destroy workflow_template" do
    assert_difference('WorkflowTemplate.count', -1) do
      delete workflow_template_url(@workflow_template), as: :json
    end

    assert_response 204
  end
end
