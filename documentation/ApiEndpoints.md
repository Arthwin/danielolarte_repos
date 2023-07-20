Ejercicio práctico BackEnd Developer - Globant - BancoPichincha - deuna!

API Endpoints:

1. Endpoint to get a list of repository verifications using a mock external API:
- Get repository verifications:
  ```
  GET /api/verifications
  ```


2. CRUD operations for "organizations" object:
- Create an organization:
  ```
  POST /api/organizations
  Request Body: {
    "name": "Example Org",
    "status": 0
  }
  ```

- Read all organizations:
  ```
  GET /api/organizations
  ```

- Read a specific organization:
  ```
  GET /api/organizations/{organizationId}
  ```

- Update an organization:
  ```
  PUT /api/organizations/{organizationId}
  Request Body: {
    "name": "Updated Org Name",
    "status": 1
  }
  ```

- Delete an organization:
  ```
  DELETE /api/organizations/{organizationId}
  ```

3. Endpoint to generate metrics by tribe ID:

- Get metrics by tribe ID:
  ```
  GET /api/metrics/{tribeId}
  ```

4. Endpoint to generate a CSV for the above metrics:

- Get metrics in CSV format by tribe ID:
  ```
  GET /api/metrics/{tribeId}/csv
  ```