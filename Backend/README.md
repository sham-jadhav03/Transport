# Users API - Register Endpoint

## POST /users/register

Description
- Register a new user and return a JWT token and created user object.

Request
- URL: `/users/register`
- Method: `POST`
- Content-Type: `application/json`

Request body schema
```json
{
  "fullname": {
    "firstname": "string", // Required, min 3 chars
    "lastname": "string"   // Optional
  },
  "email": "string",      // Required, valid email
  "password": "string"    // Required, min 6 chars
}
```

Validation rules
- `fullname.firstname`: required, minimum 3 characters
- `email`: required, must be a valid email address
- `password`: required, minimum 6 characters

Example request
```json
{
  "fullname": { "firstname": "Alice", "lastname": "Smith" },
  "email": "alice@example.com",
  "password": "secret123"
}
```

Success response
- Status code: `201 Created`
- Response body:
```json
{
  "token": "<jwt-token>",
  "user": {
    "_id": "<user-id>",
    "fullname": { "firstname": "Alice", "lastname": "Smith" },
    "email": "alice@example.com"
  }
}
```

Error responses
- `400 Bad Request` - validation errors. Example:
```json
{
  "errors": [
    { "msg": "First name must be at least 3 characters long", "param": "fullname.firstname" }
  ]
}
```
- `500 Internal Server Error` - server/database errors. Example:
```json
{ "error": "Database error message" }
```

Notes
- Passwords should be hashed before storage (the project hashes passwords in the model/service layer).
- A JWT token is generated on successful registration and returned in the response.
- Ensure the `Content-Type: application/json` header is set. 
- Field names must match the server validation schema (e.g., `fullname.firstname`).

## POST /users/login

Description
- Authenticate a user with email and password. On success the endpoint returns a JWT token and the user object. The token is also set as a cookie named `token`.

Request
- URL: `/users/login`
- Method: `POST`
- Content-Type: `application/json`

Request body schema
```json
{
  "email": "string",    // Required, valid email
  "password": "string"  // Required, min 6 chars
}
```

Validation rules
- `email`: required, must be a valid email address
- `password`: required, minimum 6 characters

Example request
```json
{
  "email": "alice@example.com",
  "password": "secret123"
}
```

Success response
- Status code: `200 OK`
- Response body:
```json
{
  "token": "<jwt-token>",
  "user": {
    "_id": "<user-id>",
    "fullname": { "firstname": "Alice", "lastname": "Smith" },
    "email": "alice@example.com"
  }
}
```

Notes on cookies and auth
- On success the server sets an HTTP cookie named `token` containing the JWT. Clients can also read the returned `token` from the JSON response and use it in an `Authorization: Bearer <token>` header for subsequent requests.

Error responses
- `400 Bad Request` - validation errors.
- `401 Unauthorized` - invalid credentials. Example:
```json
{ "message": "Invalid email or password" }
```
- `500 Internal Server Error` - server/database errors.

## GET /users/logout

Description
- Log out the authenticated user by clearing the `token` cookie and blacklisting the token so it cannot be reused.

Request
- URL: `/users/logout`
- Method: `GET`
- Authentication: Required. The user must be authenticated via the `token` cookie or `Authorization: Bearer <token>` header.

Example request (cookie)
```
GET /users/logout
Cookie: token=<jwt-token>
```

Example request (Authorization header)
```
GET /users/logout
Authorization: Bearer <jwt-token>
```

Success response
- Status code: `200 OK`
- Response body:
```json
{ "message": "Logged out" }
```

Error responses
- `401 Unauthorized` - missing or invalid token.
- `500 Internal Server Error` - server/database errors when blacklisting the token.

Notes
- The endpoint clears the `token` cookie and stores the token in a `BlacklistToken` collection so the token is invalidated server-side.
- Ensure the client removes any locally stored tokens after logout.

## Captains API - Endpoint

The Captains API provides endpoints for captain registration and login. These endpoints mirror the users endpoints but include additional `vehicle` fields required at registration.

### POST /captains/register

Description
- Register a new captain, including vehicle details. Returns a JWT token and the created captain object.

Request
- URL: `/captains/register`
- Method: `POST`
- Content-Type: `application/json`

Request body schema
```json
{
  "fullname": {
    "firstname": "string", // Required, min 3 chars
    "lastname": "string"   // Optional
  },
  "email": "string",      // Required, valid email
  "password": "string",   // Required, min 6 chars
  "vehicle": {
    "color": "string",      // Required, min 3 chars
    "plate": "string",      // Required, min 3 chars
    "capacity": 1,            // Required, integer >= 1
    "vehicleType": "string" // Required, one of: "car", "motorcycle", "auto"
  }
}
```

Validation rules
- `fullname.firstname`: required, minimum 3 characters
- `email`: required, must be a valid email address
- `password`: required, minimum 6 characters
- `vehicle.color`: required, minimum 3 characters
- `vehicle.plate`: required, minimum 3 characters
- `vehicle.capacity`: required, integer >= 1
- `vehicle.vehicleType`: required, one of `car`, `motorcycle`, `auto`

Example request
```json
{
  "fullname": { "firstname": "Bob", "lastname": "Rider" },
  "email": "bob@example.com",
  "password": "strongpass",
  "vehicle": { "color": "red", "plate": "ABC123", "capacity": 4, "vehicleType": "car" }
}
```

Success response
- Status code: `201 Created`
- Response body:
```json
{
  "token": "<jwt-token>",
  "captain": {
    "_id": "<captain-id>",
    "fullname": { "firstname": "Bob", "lastname": "Rider" },
    "email": "bob@example.com",
    "vehicle": { "color": "red", "plate": "ABC123", "capacity": 4, "vehicleType": "car" }
  }
}
```

Error responses
- `400 Bad Request` - validation errors or captain already exists.
- `500 Internal Server Error` - server/database errors.

### POST /captains/login

Description
- Authenticate a captain using email and password. Returns a JWT token and the captain object.

Request
- URL: `/captains/login`
- Method: `POST`
- Content-Type: `application/json`

Request body schema
```json
{
  "email": "string",    // Required, valid email
  "password": "string"  // Required, min 6 chars
}
```

Validation rules
- `email`: required, must be a valid email address
- `password`: required, minimum 6 characters

Example request
```json
{
  "email": "bob@example.com",
  "password": "strongpass"
}
```

Success response
- Status code: `200 OK`
- Response body:
```json
{
  "token": "<jwt-token>",
  "captain": {
    "_id": "<captain-id>",
    "fullname": { "firstname": "Bob", "lastname": "Rider" },
    "email": "bob@example.com",
    "vehicle": { "color": "red", "plate": "ABC123", "capacity": 4, "vehicleType": "car" }
  }
}
```

Error responses
- `400 Bad Request` - validation errors.
- `401 Unauthorized` - invalid credentials.
- `500 Internal Server Error` - server/database errors.

Notes
- Captain registration requires vehicle details; missing vehicle fields will cause validation errors.
- Passwords are hashed before storage and a JWT token is returned on successful authentication.

### GET /captains/profile

Description
- Retrieve the authenticated captain's profile.

Request
- URL: `/captains/profile`
- Method: `GET`
- Authentication: Required (cookie `token` or `Authorization: Bearer <token>` header)

Success response
- Status code: `200 OK`
- Response body:
```json
{
  "captain": {
    "_id": "<captain-id>",
    "fullname": { "firstname": "Bob", "lastname": "Rider" },
    "email": "bob@example.com",
    "vehicle": { "color": "red", "plate": "ABC123", "capacity": 4, "vehicleType": "car" }
  }
}
```

Error responses
- `401 Unauthorized` - missing/invalid/blacklisted token.
- `500 Internal Server Error` - server/database errors.

Required headers / cookie
- Either include the Authorization header:
  - `Authorization: Bearer <jwt-token>`
- Or send a cookie named `token` with the JWT: `Cookie: token=<jwt-token>`

Example curl (Authorization header)
```bash
curl -i -H "Authorization: Bearer <jwt-token>" \
  http://localhost:4000/captains/profile
```

Example curl (cookie)
```bash
curl -i --cookie "token=<jwt-token>" http://localhost:4000/captains/profile
```

Notes
- The `authCaptain` middleware sets `req.captain` when the token is valid and not blacklisted. The endpoint returns the captain object under the `captain` key.
- If the token is blacklisted (stored in `BlacklistToken`), the middleware will return `401 Unauthorized`.

### GET /captains/logout

Description
- Log out the authenticated captain by clearing the `token` cookie and blacklisting the token.

Request
- URL: `/captains/logout`
- Method: `GET`
- Authentication: Required (cookie `token` or `Authorization: Bearer <token>` header)

Success response
- Status code: `200 OK`
- Response body:
```json
{ "message": "Logout successfully" }
```

Error responses
- `401 Unauthorized` - missing or invalid token.
- `500 Internal Server Error` - server/database errors when blacklisting the token.

Notes / Potential issues to check in code
- `auth.middleware`: make sure blacklist checks use the `blackListTokenModel` for both users and captains (there's currently an incorrect lookup against `userModel` in `authCaptain`).
- `auth.middleware`: use the same variable name when reading the authorization header: `req.headers.authorization` (note the plural `headers`) and guard against undefined before splitting.
- `captain.controller.logoutCaptain`: ensure `res.clearCookie('token')` and `blackListTokenModel.create({ token })` are both called; the route currently does this but make sure the model import matches `blackListTokenModel`.
- `captain.routes`: endpoints `/profile` and `/logout` use `authMiddleware.authCaptain` — ensure that middleware sets `req.captain` correctly (it does in the current code).

