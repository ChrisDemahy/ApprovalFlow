# Approval Flow README

## First Release

First release of approval flow. Users can sign in, view projects, and submit them for approval based on the total cost on the project. When a project is submitted, a workflow is created that sends approval requests to the submitters' supervisor and their supervisors until the DOA is met.

The project was built with Ruby on Rails and PostgreSQL on the backend and React.js and Typescript on the frontend. It uses JWT Authentication to log in the user and communicates with the backend using React Query and axios to cache requests to the server.
