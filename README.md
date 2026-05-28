# Intern Practical Task: Todo Demo (Requirements Only)

## Goal
Build a runnable Todo application including:
- Web frontend
- Backend API
- Persistent database

Any tech stack is allowed.

## Scope
Todo features only. No need for:
- Sign up / login / user system
- Authorization / permissions
- Deployment
- Complex UI

## Must-have Requirements

### Todo Data
- `id`: unique identifier
- `title`: required
- `completed`: boolean completion flag

### Backend API
- `POST /todos`: create a Todo (`title` is required)
- `GET /todos`: list all Todos
- `PATCH /todos/:id`: update a Todo (must support updating `completed`; optional support for updating `title`)
- `DELETE /todos/:id`: delete a Todo

Rules:
- `title` cannot be empty (basic validation is enough)
- Return 404 (or a consistent error response) when a Todo does not exist
- Must use a real persistent database (no in-memory-only storage)

### Frontend Page
- Display the Todo list
- Add a new Todo
- Toggle completed / not completed
- Delete a Todo

## Database Requirements
- Any database is acceptable (SQLite is fine)
- Data must persist after restarting the backend service
- Provide a database initialization method (SQL schema or migrations)

---
