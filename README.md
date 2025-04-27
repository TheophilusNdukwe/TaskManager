# Task Manager

A simple, elegant task management application built with Node.js, Express, and MongoDB. This application allows users to create accounts, manage tasks, and track their progress.

## Features

- User authentication (signup, login, logout)
- Personal profile management
- Create, read, update, and delete tasks
- Mark tasks as complete
- Mobile-responsive design with Bootstrap 3

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript, Bootstrap 3, EJS templating
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Passport.js
- **Icons**: Font Awesome

## Installation

1. Clone the repository

   ```
   git clone https://github.com/yourusername/TaskManager.git
   ```

2. Navigate to the project directory

   ```
   cd TaskManager
   ```

3. Install dependencies

   ```
   npm install
   ```

4. Create a `.env` file in the root directory with the following variables:

   ```
   DB_STRING=your_mongodb_connection_string
   PORT=8000
   ```

5. Start the server

   ```
   npm start
   ```

6. Visit `http://localhost:8080` in your browser

## Usage

### Creating an Account

1. Navigate to the home page
2. Click "Signup"
3. Enter your email and password
4. Click "Signup" to create your account

### Adding Tasks

1. Log in to your account
2. Enter your task in the "Enter a task" field
3. Click "Add Task" to save it

### Managing Tasks

- Click the ✓ icon to mark a task as complete
- Click the 🗑️ icon to delete a task

## Project Structure

```
task-manager/
├── public/
│   ├── css/
│   │   └── style.css
│   ├── img/
│   └── js/
│       └── main.js
├── views/
│   ├── dashboard.ejs
│   ├── index.ejs
│   ├── login.ejs
│   └── signup.ejs
├── config/
│   ├── database.js
│   └── passport.js
├── models/
│   └── user.js
├── routes/
│   └── routes.js
├── server.js
├── package.json
└── README.md
```

## Future Enhancements

- Task categories and labels
- Due dates and reminders
- Task priority levels
- User profile pictures
- Sharing tasks with other users
- Dark mode

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Bootstrap for the responsive design framework
- Font Awesome for the icons
- The Express.js and MongoDB communities for their excellent documentation
