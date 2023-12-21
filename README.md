# AdonisJS WebSocket Application for School Direct Student App

This is a project that manages WebSocket connections for [School Direct Student App](https://github.com/cgardesey/SchoolDirectStudent). The core functionality of the application is handled by the `ChatController` class, which manages WebSocket connections and message handling.

## Prerequisites

- Node.js (v14 or higher)
- AdonisJS v4
- PostgreSQL or MySQL database (for storing chat data)

## Installation

1. Clone the repository:

   ```bash
   git https://github.com/cgardesey/sd_node_backend.git
   sd_node_backend
2. Install dependencies:

   ```bash
   npm install
3. Update .env file with your database credentials:

   ```bash
   DB_CONNECTION=pg
   DB_HOST=127.0.0.1
   DB_PORT=5432
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_DATABASE=your_database_name

4. Run migrations:

   ```bash
   adonis migration:run
5. adonis serve --dev

   ```bash
   adonis serve --dev

## Prerequisites

1. Connect to the WebSocket server using a WebSocket client or frontend application.
2. Use the ChatController methods to handle incoming WebSocket messages, manage user connections, and broadcast messages to connected clients.

Example methods in ChatController:

1. onMessage(message): Handles incoming messages from WebSocket clients.
2. onClose(): Handles disconnection events and updates the database accordingly.

## WebSocket Endpoints

- WebSocket Server URL: ws://localhost:3333

## Contributing

 Contributions are welcome! Please feel free to open an issue or submit a pull request.

 ## License

This project is open-source and available under the [MIT License](https://opensource.org/licenses/MIT).

## Contact

If you have any questions or need assistance, please contact me at cyrilgardesey@gmail.com.

Happy coding!



