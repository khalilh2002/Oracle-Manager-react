# Oracle-Manager

Oracle-Manager is a full-stack application designed for managing Oracle databases efficiently. The project consists of two main components:

1. **Frontend**: A React-based user interface for interacting with the Oracle database.
2. **Backend**: A Java Spring-based backend for managing database operations and integrating RMAN (Recovery Manager).

---

## Features

- **Frontend**:
  - Built with React.js.
  - Intuitive and user-friendly interface for database management.
  - Supports CRUD operations on database entities.

- **Backend**:
  - Developed using Java Spring Boot.
  - Integrates with Oracle DBA running in Docker.
  - Utilizes Oracle RMAN for backup and recovery tasks.

---

## Requirements

### Backend Requirements
- Java 17+
- Maven 3+
- Docker and Docker Compose (for Oracle DBA container)

### Frontend Requirements
- Node.js 16+
- npm or yarn

---

## Getting Started

### Clone the Repository
```bash
git clone https://github.com/khalilh2002/Oracle-Manager.git
cd Oracle-Manager
```

---

### Backend Setup

1. Build the backend project using Maven:
   ```bash
   mvn clean install
   ```

2. Start the Oracle DBA container using Docker Compose:
   ```bash
   docker-compose up -d
   ```

3. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

---

### Frontend Setup

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

2. Start the React development server:
   ```bash
   npm start
   # or
   yarn start
   ```

---

## Docker Setup for Oracle DBA

This project uses a Docker container for running Oracle Database.

1. Ensure Docker is installed on your system.
2. Configure the `docker-compose.yml` file for Oracle Database.
3. Use the following command to start the container:
   ```bash
   docker-compose up -d
   ```
4. Access Oracle Enterprise Manager via the provided URL.

---

## RMAN Integration

The backend leverages Oracle RMAN (Recovery Manager) for backup and recovery tasks. Make sure RMAN is properly configured in the Oracle database instance.

---

## Project Structure

### Frontend (React)
- Located in the `frontend` folder.
- Uses modern React practices with hooks and functional components.

### Backend (Java Spring)
- Located in the `backend` folder.
- Contains RESTful APIs for database operations.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with a detailed explanation of your changes.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

## Contact

For any inquiries or issues, please contact:
- **Name**: Khalil H.
- **GitHub**: [khalilh2002](https://github.com/khalilh2002)
