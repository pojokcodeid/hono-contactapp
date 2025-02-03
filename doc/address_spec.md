# Address API Specification

## Base URL

http://localhost:3000/api

## Endpoints Crete Personal

### Request

- Method
  POST
- URL
  {{BASE_URl}}/address
- Header
  Content-Type: application/json
- Request Body

```json
{
  "addressName": "Home",
  "address": "123 Main St",
  "city": "Test City",
  "province": "Test Province",
  "country": "Test Country"
}
```

### Response

- Success (201)

```json
{
  "message": "Address created successfully",
  "data": {
    "id": 2,
    "addressName": "Home",
    "address": "Jl Jurago no 78",
    "city": "Depaok",
    "province": "Jawa barat",
    "country": "Indonesia",
    "personalId": 53
  }
}
```

- Error (400)

```json
{
  "message": "Address name is required",
  "data": null
}
```

## Endpoints Update Address

### Request

- Method
  PUT
- URL
  {{BASE_URl}}/address/1
- Header
  Content-Type: application/json
  Authorization: Bearer xxxxxxxxxxxxxxxxxxxxx
- Request Body

```json
{
  "addressName": "Home",
  "address": "123 Main St",
  "city": "Test City",
  "province": "Test Province",
  "country": "Test Country"
}
```

### Response

- Success (200)

```json
{
  "message": "address updated successfully",
  "data": {
    "id": 2,
    "addressName": "Home",
    "address": "Jl Jurago no 78",
    "city": "Depaok",
    "province": "Jawa barat",
    "country": "Indonesia",
    "personalId": 53
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

## Endpoints Delete Address

### Request

- Method
  DELETE
- URL
  {{BASE_URl}}/address/1
- Header
  Content-Type: application/json
  Authorization: Bearer xxxxxxxxxxxxxxxxxxxxx
- Request Body

### Response

- Success (200)

```json
{
  "message": "Address deleted successfully",
  "data": {
    "id": 2,
    "addressName": "Home",
    "address": "Jl Jurago no 78",
    "city": "Depaok",
    "province": "Jawa barat",
    "country": "Indonesia",
    "personalId": 53
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

## Endpoints Get All Address

### Request

- Method
  GET
- URL
  {{BASE_URl}}/address
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
  "message": "Address found",
  "data": [
    {
      "id": 2,
      "addressName": "Home",
      "address": "Jl Jurago no 78",
      "city": "Depaok",
      "province": "Jawa barat",
      "country": "Indonesia",
      "personalId": 53
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

## Endpoints Get Address By Id

### Request

- Method
  GET
- URL
  {{BASE_URl}}/address/1
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
  "message": "Address found",
  "data": {
    "id": 2,
    "addressName": "Home",
    "address": "Jl Jurago no 78",
    "city": "Depaok",
    "province": "Jawa barat",
    "country": "Indonesia",
    "personalId": 53
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
