# Personal API Specification

## Base URL

http://localhost:3000/api

## Endpoints Crete Personal

### Request

- Method
  POST
- URL
  {{BASE_URl}}/personal
- Header
  Content-Type: application/json
- Request Body

```json
{
  "name": "Test Personal"
}
```

### Response

- Success (201)

```json
{
  "message": "Personal created successfully",
  "data": {
    "id": 54,
    "name": "Test Personal",
    "userId": 5
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

## Endpoints Update User

### Request

- Method
  PUT
- URL
  {{BASE_URl}}/personal/1
- Header
  Content-Type: application/json
  Authorization: Bearer xxxxxxxxxxxxxxxxxxxxx
- Request Body

```json
{
  "name": "string"
}
```

### Response

- Success (200)

```json
{
  "message": "Personal updated successfully",
  "data": {
    "id": 54,
    "name": "Test Personal",
    "userId": 5
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

## Endpoints Delete Personal

### Request

- Method
  DELETE
- URL
  {{BASE_URl}}/personal/1
- Header
  Content-Type: application/json
  Authorization: Bearer xxxxxxxxxxxxxxxxxxxxx
- Request Body

### Response

- Success (200)

```json
{
  "message": "Personal deleted successfully",
  "data": {
    "id": 54,
    "name": "Test Personal",
    "userId": 5
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

## Endpoints Get All Personal

### Request

- Method
  GET
- URL
  {{BASE_URl}}/personal
- Header
  Content-Type: application/json
  Authorization: Bearer xxxxxxxxxxxxxxxxxxxxx
- Request Body
- Success (200)

```json

```

### Response

- Success (200)

```json
{
  "message": "Personal found",
  "data": [
    {
      "id": 54,
      "name": "Test Personal",
      "userId": 5
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

## Endpoints Get Personal By Id

### Request

- Method
  GET
- URL
  {{BASE_URl}}/personal/1
- Header
  Content-Type: application/json
  Authorization: Bearer xxxxxxxxxxxxxxxxxxxxx
- Request Body
- Success (200)

```json

```

### Response

- Success (200)

```json
{
  "message": "Personal found",
  "data": {
    "id": 54,
    "name": "Test Personal",
    "userId": 5
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
