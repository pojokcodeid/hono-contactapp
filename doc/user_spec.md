# User API Specification

## Base URL

http://localhost:3000/api

## Endpoints Crete User

### Request

- Method
  POST
- URL
  {{BASE_URl}}/users
- Header
  Content-Type: application/json
- Request Body

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "conformPassword": "string"
}
```

### Response

- Success (201)

```json
{
  "message": "User created successfully",
  "data": {
    "id": "1",
    "name": "Pojok Code",
    "email": "code@gmail.com",
    "password": "********",
    "createdAt": "2025-01-29T10:40:57.447Z",
    "updatedAt": "2025-01-29T10:40:57.447Z"
  }
}
```

- Error (400)

```json
{
  "message": "Name cannot be empty",
  "data": null
}
```

## Endpoint Login User

### Request

- Method
  POST
- URL
  {{BASE_URl}}/login
- Header
  Content-Type: application/json
- Request Body

```json
{
  "email": "john@example.com",
  "password": "StrongPassword@123"
}
```

### Response

- Success (200)

```json
{
  "message": "User logged in successfully",
  "data": {
    "id": 3,
    "name": "John Doe",
    "email": "john@example.com",
    "password": "********",
    "createdAt": "2025-01-29T10:48:30.480Z",
    "updatedAt": "2025-01-29T10:48:44.819Z",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywic3ViIjp7ImlkIjozLCJuYW1lIjoiSm9obiBEb2UiLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJwYXNzd29yZCI6IioqKioqKioqIiwiY3JlYXRlZEF0IjoiMjAyNS0wMS0yOVQxMDo0ODozMC40ODBaIiwidXBkYXRlZEF0IjoiMjAyNS0wMS0yOVQxMDo0ODo0NC44MTlaIn0sImV4cCI6MTczODE0ODIyNX0.jlAT_6o8c6hHuHifCGFeZ8hginaW5DiwmGk9-KFL28Q",
    "refeshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywic3ViIjp7ImlkIjozLCJuYW1lIjoiSm9obiBEb2UiLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJwYXNzd29yZCI6IioqKioqKioqIiwiY3JlYXRlZEF0IjoiMjAyNS0wMS0yOVQxMDo0ODozMC40ODBaIiwidXBkYXRlZEF0IjoiMjAyNS0wMS0yOVQxMDo0ODo0NC44MTlaIn0sImV4cCI6MTczODE0ODIyNX0.jlAT_6o8c6hHuHifCGFeZ8hginaW5DiwmGk9-KFL28Q"
  }
}
```

- Error (404)

```json
{
  "message": "User not found",
  "data": null
}
```

## Endpoints Update User

### Request

- Method
  PUT
- URL
  {{BASE_URl}}/users/1
- Header
  Content-Type: application/json
  Authorization: Bearer xxxxxxxxxxxxxxxxxxxxx
- Request Body

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "conformPassword": "string"
}
```

### Response

- Success (200)

```json
{
  "message": "User updated successfully",
  "data": {
    "id": 3,
    "name": "John Doe",
    "email": "john@example.com",
    "password": "********",
    "createdAt": "2025-01-29T10:48:30.480Z",
    "updatedAt": "2025-01-29T10:48:44.819Z"
  }
}
```

- Error (401)

```json
{
  "message": "Unauthorized",
  "data": null
}
```

## Endpoints Delete User

### Request

- Method
  DELETE
- URL
  {{BASE_URl}}/users/1
- Header
  Content-Type: application/json
  Authorization: Bearer xxxxxxxxxxxxxxxxxxxxx
- Request Body

### Response

- Success (200)

```json
{
  "message": "User deleted successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "password": "********",
    "createdAt": "2025-01-29T10:48:30.480Z",
    "updatedAt": "2025-01-29T10:48:44.819Z"
  }
}
```

- Error (401)

```json
{
  "message": "Unauthorized",
  "data": null
}
```

## Endpoints Get All User

### Request

- Method
  GET
- URL
  {{BASE_URl}}/users
- Header
  Content-Type: application/json
  Authorization: Bearer xxxxxxxxxxxxxxxxxxxxx
- Request Body

### Response

- Success (200)

```json
{
  "message": "Users found",
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "password": "********",
      "createdAt": "2025-01-29T10:48:30.480Z",
      "updatedAt": "2025-01-29T10:48:44.819Z"
    }
  ]
}
```

- Error (401)

```json
{
  "message": "Unauthorized",
  "data": null
}
```

## Endpoints Get All User

### Request

- Method
  GET
- URL
  {{BASE_URl}}/users/1
- Header
  Content-Type: application/json
  Authorization: Bearer xxxxxxxxxxxxxxxxxxxxx
- Request Body
- Success (200)

```json
{
  "message": "Users found",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "password": "********",
    "createdAt": "2025-01-29T10:48:30.480Z",
    "updatedAt": "2025-01-29T10:48:44.819Z"
  }
}
```

- Error (401)

```json
{
  "message": "Unauthorized",
  "data": null
}
```
