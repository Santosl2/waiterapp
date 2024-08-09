# WaiterApp - The Waiter's App

![image](https://user-images.githubusercontent.com/82843173/202978820-d45133ce-00c4-4544-b305-09477e7854a8.png)

<hr/>

## What is WaiterApp?

WaiterApp was a project developed during the "JStack" week by [/maateusilva](http://github.com/maateusilva). This repository contains the complete application.

<hr/>

## Technologies used:

- Front-End

  - React
  - Styled-Components
  - Typescrip
  - Axios
  - Socket.io
  - React-Toastify

- Mobile

  - React Native
  - Expo
  - Styled-Components
  - Typescript
  - Axios

- Back-End

  - NodeJS
  - Express
  - Socket.io
  - Multer
  - Dotenv
  - Mongoose
  - Typescript

- Database

  - MongoDB
  <hr/>

# How to run the project?

> How to run the API?

```bash
# How to clone
$ git clone git@github.com:Santosl2/waiterapp.git

# Access the API
$ cd api

# Connect to the database by placing your `CONNECTIONSTRING` in the `.env` file

mongodb+srv://<your-username>:<your-password>@<your-cluster>.mongodb.net/?retryWrites=true&w=majority # if using mongoose with Atlas

mongodb://localhost:27017 # using Docker

# Run the API (access http://localhost:3001/).
# Install the API dependencies
$ npm i
$ npm run build
$ npm run start
```

> How to run the front-end?

```bash

# With the project already cloned
# Access the front-end folder
$ cd fe

# Install the front-end dependencies
$ npm i

# Run the project (access http://localhost:5173/).
$ npm run dev
```

> How to run the mobile app?

```bash
# With the project already cloned
# Access the mobile app folder
$ cd app

# Install the mobile dependencies
$ npm i

# Run the project.
$ npm run start
```
