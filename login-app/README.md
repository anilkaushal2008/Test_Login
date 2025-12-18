# Login App

This project is a simple login application built with React and TypeScript. It provides a user interface for logging in and includes functionality for testing login credentials.

## Project Structure

```
login-app
├── src
│   ├── index.tsx          # Entry point of the application
│   ├── App.tsx            # Main application component
│   ├── pages
│   │   └── LoginPage.tsx  # Login page component
│   ├── components
│   │   └── LoginForm.tsx   # Login form component
│   ├── services
│   │   └── auth.ts        # Authentication service
│   ├── hooks
│   │   └── useAuth.ts     # Custom authentication hook
│   └── types
│       └── index.ts       # TypeScript types and interfaces
├── tests
│   ├── unit
│   │   └── LoginForm.test.tsx # Unit tests for LoginForm
│   └── e2e
│       └── login.spec.ts  # End-to-end tests for login functionality
├── package.json           # npm configuration file
├── tsconfig.json          # TypeScript configuration file
├── jest.config.ts         # Jest configuration file
├── cypress.config.ts      # Cypress configuration file
└── README.md              # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone https://github.com/anilkaushal2008/Test_Login.git
   cd Test_Login
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the application:**
   ```
   npm start
   ```

4. **Run tests:**
   - For unit tests:
     ```
     npm test
     ```
   - For end-to-end tests:
     ```
     npx cypress open
     ```

## Usage

- Navigate to the login page to enter your credentials.
- The application will validate the credentials and provide feedback on successful or failed login attempts.

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.