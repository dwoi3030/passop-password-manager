# Password Manager

A simple password manager built with React, Vite, Tailwind CSS, React Toastify, and UUID.

## Features

- Save website, username, and password entries
- Store saved passwords in browser localStorage
- Copy website, username, and password values to the clipboard
- Edit and delete saved password entries
- Show or hide the password input
- Toast notifications for save, delete, and copy actions
- Responsive layout for desktop and mobile screens

## Tech Stack

- React
- Vite
- Tailwind CSS
- React Toastify
- UUID

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```text
src/
  Component/
    Footer.jsx
    Manger.jsx
    NavBar.jsx
  assets/
  App.jsx
  main.jsx
```

## Note

This project stores passwords in browser localStorage. It is useful for practice and learning React, but it is not secure enough for real password storage.

