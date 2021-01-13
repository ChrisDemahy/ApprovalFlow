# Approval Flow Proposal

## Introduction

Project approval application that allows the user to build workflows to efficiently get things approved in an automated fashion. The main avenue this application supports is DOA approval or delegation of authority. DOA is used in large enterprises and generally refers to the dollar amount an individual has the authority to approve with regards to expenditures. The main goal of  ApprovalFlow is to ease this burden on managers and administrators by allowing them to create workflows for their projects to get approved.  

## Goals

- Allow users to create projects and assign them names, descriptions, and DOA amounts.
- Give those users the ability to assign those projects to workflows.
- These workflows allow for projects to be moved from one user to the next based on a set of rules.
- Once a user is up for approval, they get sent an email with the information about the project and a link to approve or reject the project.
- If a project is rejected, an email is sent to notify the creator of the project. They are then allowed to then modify the project and resubmit it with changes.
- If a project is resubmitted, it is considered up for revision.
- Once a project is approved or rejected, the project creator is notified.
- Allow the organization owner to see some light statistics in a dashboard, like outstanding projects and the average time for approvals.

## Stretch Goals

- Create custom workflows using triggers and steps to move projects from user to user based on a set of rules.
- Postgres level change tracking for every table and allow administrators to see minute by minute changelogs.
- Add user groups, or departments, which are within organizations and led by a new kind of user: administrators. Administrators are department leaders.
- Add different kinds of notifications, such as push mobile or sms. Maybe setup integration with an authentication app for 2-factor.

## User Stories

### User

- As a user, I can make a new account with an email and password.
- During this registration, the user would be able to create an organization or join one. This is a required step in user onboarding.
- As a user , once I register I can see other members of my organisation.

### Projects

- As a user, I can see a list of projects in my organization. On that list, I can see the name, status, and next person in the approval chain.
- As a user, I can create a new project for myself. The project will have a name, a DOA level (dollar amount), and a workflow associated with it.
- Once a project has been approved or rejected, it can be resubmitted with different details for re-approval. The project is then considered up for revision.

### Workflows

- As a user, I can create a new workflow and give it a name and description. I can also give the workflow a maximum DOA level.
- A workflow must have at least one step, and that step must be an authorizing user. If a workflow has one step, it cannot be another workflow.
- As a User, I can see all projects and steps that are using this workflow.
- I can see a visualization of this workflow, seeing all steps that are involved from beginning to end.

### Steps

- As a user, I can create a new step and associate it with a workflow. I must give it a name. I can also optionally give it a description.
- As a user, I can associate a user to authorize this step, as long as their DOA is equal to or above that of the project.
- As a user, I can associate a workflow to authorize this request. When a workflow is used to authorize a request, the project moves through it like any other workflow. Once the workflow is approved, this approves the step.

### Departments

- As an administrator, I can create a new department and assign it a name.
- As the administrator of the new department, I can add other members to the department.
- As the owner, I can create a specific workflow for that department. Department workflows can only have users from that department.
- As a user, I can assign a department workflow as a step in a normal workflow. When a project reaches this step, it will go through the department workflow.

### Notifications

- As a user, I will receive notifications regarding approvals whenever I have the app open
- When I view a notification, it will be 'dismissed' and the user will no longer see an indicator on the toolbar.

## Triggers

1. DOA level - maximum dollar amount
2. Seniority - Moves project from user's superior to superior
3. Custom - Create custom steps where I choose the next user 

## Stacks

Ruby on Rails

Active job using sidekiq

PostgreSQL

Redis (active job and rate limiting)

React

Snowpack (webpack is too slow)

Typescript 

Sass

Semantic UI (or tailwinds based design system)
