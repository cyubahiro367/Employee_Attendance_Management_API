# Employee Attendance Management System API

## Overview

The Employee Attendance Management System API is a RESTful API designed for managing employee records and their attendance. It provides endpoints to create, read, update, and delete employee and attendance records.

## API Documentation

The API follows the OpenAPI 3.0 specification and is documented using Swagger. You can access the interactive API documentation at:

[Swagger UI](http://localhost:3000/api-docs) *(Replace with your actual Swagger UI URL)*

## Base URL

The base URL for the API is: ```http://localhost:3000/api```

### Setup
These are the procedures to follow when setting up system for the first time.

- Copy the .env.example into .env
    ```shell
    cp .env.example .env
    ```
- Install node_modules
    ```shell
    npm install
    ```
- Start the project **(keep this running in a tab)**
    ```shell
    npm run serve
    ```