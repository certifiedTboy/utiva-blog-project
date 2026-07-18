<div align="center" id="top"> 
 
  &#xa0;

  <!-- <a href="https://usermanagementapi.netlify.app">Demo</a> ---->
</div>

<h1 align="center">Ade's Note</h1>

<p align="center">
  <img alt="Github top language" src="https://img.shields.io/github/languages/top/certifiedTboy/utiva-blog-project?color=56BEB8">

  <img alt="Github language count" src="https://img.shields.io/github/languages/count/certifiedTboy/utiva-blog-project?color=56BEB8">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/certifiedTboy/utiva-blog-project?color=56BEB8">

</p>

> This is Ade's Note! A full-stack web application for my personal blogging and content creation.

## Key Features

- **User Authentication**: Secure sign-up and sign-in functionality using Google OAuth.
- **CRUD Operations for Blog Posts**: Create, read, update, and delete your blog posts.
- **Rich Text Editing**: A simple and intuitive editor for formatting your notes.
- **Responsive Design**: A seamless experience across desktop and mobile devices.
- **File Uploads**: Seamlessly upload and manage files with notes, stored securely and efficiently in AWS S3.
- **Background Job Processing**: A custom-built queue service for handling asynchronous tasks reliably.

## Technology Stack

This application is built with a modern technology stack, focusing on performance, scalability, and developer experience.

### Client-Side (Frontend)

- **React**: A declarative, component-based JavaScript library for building user interfaces.
- **TypeScript**: A statically typed superset of JavaScript that adds type safety to the application.
- **Redux Toolkit & RTK Query**: For predictable state management and efficient data fetching and caching. It simplifies API data handling, caching, and synchronization.
- **Wouter**: A minimalist and hook-based routing library for React, chosen for its small footprint and simplicity over more complex alternatives.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces.
  - **@tailwindcss/typography**: Used for beautiful and sensible typographic defaults.
- **Framer Motion**: A production-ready motion library for creating fluid animations.
- **React Hook Form**: For performant and flexible form handling with easy-to-use validation.
- **Formik**: A popular library for building forms in React, handling state, validation, and submission.
- **Yup**: A JavaScript schema builder for value parsing and validation, often used with form libraries like Formik or React Hook Form.
- **@react-oauth/google**: For easy integration of Google Authentication.

### Server-Side (Backend)

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine, used for building fast and scalable network applications.
- **Express.js**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **AWS SDK for S3**: Used for robust and scalable file storage, handling all file upload and retrieval operations with Amazon S3.
- **Node-Cron & EventEmitter**: A combination used to create a lightweight, in-process queue service for scheduling and processing background jobs.
- **MongoDB**: A NoSQL database used for storing user data and notes, providing flexibility and scalability.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js, managing relationships between data and providing schema validation.
- **JWT (JSON Web Tokens)**: For securely transmitting information between parties as a JSON object, used here for stateless authentication.

## Performance Improvements and Underlying Functionality

Performance is a key consideration in this application. Several strategies have been implemented to ensure a fast and responsive user experience.

### Frontend Performance

1.  **Code Splitting with React.lazy and Suspense**: The application uses code-splitting to break down the app into smaller chunks. This means users only download the code they need for a particular page, leading to faster initial load times.

2.  **State Management with Redux Toolkit**: Redux Toolkit is configured to be highly efficient. Selectors are used to ensure components only re-render when the specific data they need has changed.

3.  **Efficient Data Fetching with RTK Query**:
    - **Automated Caching**: RTK Query automatically caches data from API requests. If the same data is requested again, it's served from the cache, avoiding redundant network calls.
    - **Automated Re-fetching**: Data is intelligently re-fetched based on cache tags invalidation, or when the user re-focuses the window or reconnects, ensuring the UI always shows fresh data without manual intervention.
    - **Optimistic Updates**: For mutations (like updating or deleting a note), the UI can be updated "optimistically" before the server confirms the change. If the server request fails, the UI is automatically rolled back to its previous state. This makes the application feel instantaneous.

4.  **Component Memoization**: `React.memo` is used for functional components to prevent re-renders if their props haven't changed, optimizing rendering performance.

5.  **Utility-First CSS**: Tailwind CSS produces highly optimized, small CSS files by generating only the CSS classes that are actually used in the project.

### Backend Performance

1.  **Asynchronous Operations**: The Node.js backend leverages its non-blocking, event-driven architecture to handle many concurrent connections efficiently. All database and file system operations are asynchronous.

2.  **Database Indexing**: MongoDB collections have indexes on fields that are frequently queried (like user IDs or note IDs). This dramatically speeds up query execution time.

3.  **Connection Pooling**: The Mongoose library manages a connection pool to the MongoDB database. This avoids the overhead of establishing a new database connection for every request.

4.  **Stateless Authentication**: Using JWT for authentication is stateless. The server does not need to store session information in memory, which makes it easier to scale horizontally.
5.  **Asynchronous Job Queue**: By using Node.js's `EventEmitter` combined with `node-cron`, the application can offload long-running tasks (like handling file upload and delete, sending emails, adding or deleting comments, and reacting to posts) to a background queue. This ensures that the main request-response cycle remains fast and responsive, preventing HTTP requests from being blocked by intensive operations.
