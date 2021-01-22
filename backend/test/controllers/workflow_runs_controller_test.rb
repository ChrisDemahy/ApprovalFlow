require 'test_helper'

class WorkflowRunsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @workflow_run = workflow_runs(:one)
  end

  test "should get index" do
    get workflow_runs_url, as: :json
    assert_response :success
  end

  test "should create workflow_run" do
    assert_difference('WorkflowRun.count') do
      post workflow_runs_url, params: { workflow_run: { description: @workflow_run.description, name: @workflow_run.name } }, as: :json
    end

    assert_response 201
  end

  test "should show workflow_run" do
    get workflow_run_url(@workflow_run), as: :json
    assert_response :success
  end

  test "should update workflow_run" do
    patch workflow_run_url(@workflow_run), params: { workflow_run: { description: @workflow_run.description, name: @workflow_run.name } }, as: :json
    assert_response 200
  end

  test "should destroy workflow_run" do
    assert_difference('WorkflowRun.count', -1) do
      delete workflow_run_url(@workflow_run), as: :json
    end

    assert_response 204
  end
end
