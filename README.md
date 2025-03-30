# UsePopcorn

UsePopcorn is a React-based movie application that allows users to search for movies, view their details, rate them, and keep track of watched movies.

![UsePopcorn Screenshot](https://placeholder-for-screenshot.com)

## Features

- **Search Movies**: Search for movies using the OMDB API
- **Movie Details**: View comprehensive information about each movie
- **Star Rating System**: Rate movies on a scale of 1-10
- **Watchlist Management**: Keep track of movies you've watched
- **Summary Statistics**: View average rating, runtime, and other stats for your watched movies

## Tech Stack

- React.js (v18.3.1)
- CSS for styling
- OMDB API for movie data

## Installation

1. Clone this repository
```bash
git clone https://github.com/yourusername/UsePopcorn.git
cd UsePopcorn
```

2. Install dependencies
```bash
npm install
```

3. Get an API key from [OMDB API](https://www.omdbapi.com/)

4. Start the development server
```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser

## Usage

1. **Search for Movies**: Use the search bar in the header to find movies by title
2. **View Movie Details**: Click on a movie poster to see detailed information
3. **Rate Movies**: Use the star rating component to rate movies (1-10 stars)
4. **Add to Watched**: After rating a movie, add it to your watched list
5. **View Statistics**: See your watched movies list with summary statistics

## Project Structure

- `App.js`: Main component with state management and API calls
- `MovieDetail.js`: Component for displaying detailed movie information
- `StarRating.js`: Reusable star rating component
- `WatchedMoviesList.js` & `WatchedSummary.js`: Components for watched movies section
- `MovieList.js`: Component for displaying search results
- `NavBar.js`: Header component with search functionality

## API

This project uses the [OMDB API](https://www.omdbapi.com/) to fetch movie data. You'll need to get your own API key to run the application.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [OMDB API](https://www.omdbapi.com/) for providing movie data
- [Create React App](https://github.com/facebook/create-react-app) for the project setup
