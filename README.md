# Book Search Engine

A MERN stack application that allows users to search for books using the Google Books API and save their favorite books to their account. The application uses GraphQL with Apollo Server for the API.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Screenshots](#screenshots)
- [License](#license)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd book-search-engine
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the server directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Usage

1. Start the development server:
```bash
npm run develop
```

2. Open your browser and navigate to `http://localhost:3000`

3. Sign up for an account or log in if you already have one

4. Search for books using the search bar

5. Save books to your account by clicking the "Save This Book!" button

6. View your saved books by clicking on the "See Your Books" link in the navigation bar

## Technologies Used

- MongoDB
- Express.js
- React
- Node.js
- GraphQL
- Apollo Server
- Apollo Client
- TypeScript
- Bootstrap

## Features

- User authentication (signup/login)
- Book search using Google Books API
- Save books to user account
- Remove books from saved list
- Responsive design
- GraphQL API

## Screenshots

[Add screenshots of your application here]

## License

This project is licensed under the MIT License.
