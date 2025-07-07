# Movie Recommendation App

Welcome to the Movie Recommendation App! This project is a simple, frontend-focused web application that allows users to discover and explore movies using data fetched from The Movie Database (TMDB) API. It features authentication, search, pagination, loaders and more. The app is built with React (using hooks and context), styled with Bootstrap, and deployed via Firebase Hosting with CI/CD configured in GitHub Actions.

---

## Table of Contents

1. [Features](#features)  
2. [Technologies Used](#technologies-used)  
3. [Installation & Setup](#installation--setup)  
4. [Project Structure](#project-structure)  
5. [CI/CD Pipeline](#cicd-pipeline)  
6. [Deployment](#deployment)  
7. [Bonus Implemented](#bonus-implemented)  
8. [Contributing](#contributing)  
9. [License](#license)  

---

## Features

- **Data Fetching**  
  - Fetches movie data (popular, top-rated, search results) from TMDB API.  
  - Implements a dedicated API service with built-in caching to minimize redundant requests.

- **Authentication**  
  - Implements Firebase Authentication (Email/Password and Google Sign-In).  
  - Protects certain routes (e.g., Movie Details) behind login.

- **User Interface**  
  - **Movie List**: Displays a grid of movies with poster, title, and overview snippet.  
  - **Movie Details**: Shows detailed information including full overview, cast, crew, ratings, release date, genres, and trailer link.  
  - **Search Functionality**: Allows users to search by keyword or title; displays live suggestions.  
  - **Loaders**: Displays loading spinners while fetching data.  
  - **Pagination**: Supports page navigation for large result sets (popular movies, search results).  
  - Built with **React** (functional components + hooks) and styled using **Cascading tyle Sheets** for a responsive, consistent design.

- **State Management**  
  - Uses **React Context** to store global state: current user info, search query, selected movie details, and cached movie lists.

- **Code Quality**  
  - Configured **ESLint** with Airbnb rules for consistent code style and to catch common errors.  


- **CI/CD**  
  - **GitHub Actions** workflow to run linting on every pull request.  
  - Automated deployment to **Firebase Hosting** on merges into `production` branch, after lint and build checks pass.

---

## Technologies Used

- **Frontend**  
  - React (v19.1.0, Hooks, Context API)  
  - Bootstrap 5 (v5.3.6, for responsive design)  
  - Axios (v1.9.0, for HTTP requests)  
  - React Router (v7.6.1)  
  - React Toastify (v11.0.5, for in-app notifications)  
  - Web Vitals (v2.1.4)

- **Authentication & Hosting**  
  - Firebase (v11.8.1)  
    - Firebase Authentication (Email/Password + Google)  
    - Firebase Hosting  

- **State Management & Routing**  
  - React Context API  
  - React Router DOM (v7.6.1)

- **Linting & Formatting**  
  - ESLint (v8.57.1, Airbnb configuration)  
  - ESLint Config Prettier (v10.1.5)  
  - ESLint Plugin React (v7.37.5)  
  - Prettier (v3.5.3)

- **CI/CD**  
  - GitHub Actions  
  - Firebase CLI  

---

## Installation & Setup

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**
- **Firebase CLI** (for deployment)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Martin888Maina/Movie-Recommendation-App.git
   cd Movie-Recommendation-App
   ```

2. **Navigate to the application directory**
   ```bash
   cd movie-app
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Set up environment variables**
   Create a `.env` file in the `movie-app` directory with your Firebase and TMDB API configurations:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
   REACT_APP_TMDB_API_KEY=your_tmdb_api_key
   ```

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000` to view the application.

### Available Scripts

In the `movie-app` directory, you can run:

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm run lint` - Runs ESLint to check code quality
- `npm run lint:fix` - Automatically fixes ESLint issues
- `npm run format` - Formats code using Prettier
- `npm run format:check` - Checks code formatting
- `npm test` - Launches the test runner

---

## Project Structure

```
Movie-Recommendation-App/
├── .github/
│   └── workflows/
│       └── cicd-pipeline.yml     # CI/CD pipeline configuration
├── movie-app/                    # React application root
│   ├── public/
│   ├── src/
│   │   ├── components/           # Reusable React components
│   │   ├── contexts/             # React Context providers
│   │   ├── pages/                # Page components
│   │   ├── services/             # API services
│   │   └── App.js                # Main App component
│   ├── package.json              # Dependencies and scripts
│   └── build/                    # Production build output
├── firebase.json                 # Firebase hosting configuration
├── .firebaserc                   # Firebase project configuration
└── README.md                     # Project documentation
```

---

## CI/CD Pipeline

This project implements a comprehensive CI/CD pipeline using GitHub Actions:

### Workflow Triggers
- **Push to `development`**: Runs linting and build checks
- **Push to `production`**: Runs linting, build, and deploys to Firebase
- **Pull requests to `production`**: Runs linting, build, and creates preview deployment

### Pipeline Jobs

1. **Lint and Build**
   - Installs dependencies
   - Runs ESLint for code quality checks
   - Checks code formatting with Prettier
   - Builds the React application
   - Uploads build artifacts

2. **Deploy to Production**
   - Downloads build artifacts
   - Deploys to Firebase Hosting (live site)
   - Only runs on `production` branch pushes

3. **Preview Deploy**
   - Creates preview deployments for pull requests
   - Allows testing before merging to production

### Branch Strategy
- `development` - Active development branch
- `production` - Production-ready code, triggers live deployment

---

## Deployment

- **Live Version**: [https://my-modern-movie-app.web.app](https://my-modern-movie-app.web.app)  
- **Source Code**: [https://github.com/Martin888Maina/Movie-Recommendation-App.git](https://github.com/Martin888Maina/Movie-Recommendation-App.git)

### Manual Deployment

If you need to deploy manually:

1. **Build the application**
   ```bash
   cd movie-app
   npm run build
   ```

2. **Deploy to Firebase**
   ```bash
   firebase deploy --only hosting
   ```

### Automated Deployment

The application automatically deploys when:
- Code passes linting checks
- Build completes successfully
- Changes are pushed to the `production` branch

---

## Bonus Implemented

- **Enhanced Pagination**:  
  - Smart pagination with First/Previous/Next/Last navigation buttons, ellipses for skipped page ranges, and a quick-jump input for large result sets.  
  - Shows a summary (`Showing page X of Y (A – B of Z results)`) for better user context.

- **Skeleton Loaders & Error/Empty States**:  
  - `MovieCardSkeleton` placeholders displayed while content is loading or loading more items.  
  - Custom error state UI in `MovieList` that shows an icon, message, and "Try Again" button when fetching fails.  
  - Custom empty state UI in `MovieList` that shows an icon and "No Movies Found" message when the list is empty.

- **Lazy Loading & Placeholder Handling**:  
  - Poster images in `MovieCard` lazy-load with a placeholder spinner until fully loaded.  
  - Fallback UI in `MovieCard` for image load errors, displaying an icon and "No Image" text.

- **Dynamic Rating Badges**:  
  - Rating badges in `MovieCard` dynamically color-coded (green/yellow/red) based on the movie's average rating.

- **Wishlist & Share Actions**:  
  - "Add to Wishlist" button in `MovieCard` (logs the movie ID to console; placeholder for actual wishlist integration).  
  - "Share Movie" button uses the Web Share API or, if unsupported, copies the movie URL to the clipboard and displays an alert.

- **View Mode Toggle & Smooth Scrolling**:  
  - Users can toggle between "grid" and "list" layouts in `MovieList`.  
  - When changing pages, the list container scrolls smoothly to the top.

- **Caching**:  
  - `MovieList` maintains an internal `displayedMovies` state that syncs with incoming `movies` props to avoid unnecessary re-renders.  
  - Service-level caching (e.g., in-memory objects or `sessionStorage`) reduces redundant TMDB API calls.

- **Performance Optimizations**:  
  - Debounced search input prevents excessive API calls on rapid typing.  
  - Memoized computations (e.g., rating color calculation, pagination ranges) minimize recalculations on re-render.  
  - Code-splitting with `React.lazy` and `Suspense` for optimal loading performance.

- **Animations & Transitions**:  
  - Subtle CSS transitions in `MovieCard` (image fade-in when loaded, hover overlay animations).  
  - Loader components animate while fetching data to improve user experience.

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run linting and tests (`npm run lint` and `npm test`)
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Workflow

1. Work on the `development` branch
2. Create Pull Requests to `production` for review
3. Merge to `production` triggers automatic deployment

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## API Credits

- **The Movie Database (TMDB)**: This product uses the TMDB API but is not endorsed or certified by TMDB.
- **Firebase**: Authentication and hosting services provided by Google Firebase.

---

## Support

If you encounter any issues or have questions, please:
1. Check the [Issues](https://github.com/Martin888Maina/Movie-Recommendation-App.git!/issues) section





