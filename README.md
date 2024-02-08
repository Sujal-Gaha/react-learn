# React class

This is a react project created with vite.

## Setting up the project

1. Install the dependencies

```bash
npm install
```

This installs the necessary dependencies for the project.

2. package.json file

- Contains the scripts for running the project.
- Contains the dependencies for the project.
- Contains the devDependencies for the project.

3. package-lock.json file (semantic versioning)

4. tsconfig.json and tsconfig.node.json file

- managing typescript configuration

5. vite.config.ts file

- managing vite configuration

6. index.html file

- Contains the root element for the react app.

7. .gitignore file

- Contains the files and folders to be ignored by git.

8. eslintrc.cjs file

- configuration for eslint

9. public folder

- Contains the static files for the project.

## JSX

- javascript extension

## State

- State is a value that changes when application runs.

## Homework for useEffect

- API: https://jsonplaceholder.typicode.com/photos
- Make a gallery for showing image in masonary style (we did in the css class.)

## REST API

- Rule for making backend api
- Methods:

  - GET: to get the resource
  - POST: to add/create resource
  - PUT: to update resource
  - PATCH: to update a field of a resource
  - DELETE: to remove resource

- Convention of path
  - Resource name of the path should always be plural. (e.g. posts, comments, categories, users)
  - e.g. i want to get the comments of post number 10 (use param)
    "/posts/:postId/comments"
  - search/filter should be done using query. i want to get comment number 25 and status is unapproved.
    "/posts/:postId/comments/:commentId?status=unapproved"

url: https://jsonplaceholder.typicode.com/posts/:postId?userId=2&status=PUBLISHED
path: /posts
param: :postId
query: ?userId=2