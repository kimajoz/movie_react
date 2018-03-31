/* eslint consistent-return:0 */

const express = require('express');
const logger = require('./logger');

const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
const resolve = require('path').resolve;
const app = express();

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

const movies = [
  {
    id: 0,
    title: 'Pacific Rim: Uprising (2018)',
    desc: 'Jake Pentecost, son of Stacker Pentecost, reunites with Mako Mori to lead a new generation of Jaeger pilots, including rival Lambert and 15-year-old hacker Amara, against a new Kaiju threat.',
    director: 'Steven S. DeKnight',
    image: 'https://ia.media-imdb.com/images/M/MV5BMjI3Nzg0MTM5NF5BMl5BanBnXkFtZTgwOTE2MTgwNTM@._V1_UX182_CR0,0,182,268_AL_.jpg',
    movielink: 'https://www.imdb.com/title/tt2557478/',
  },
  {
    id: 1,
    title: 'Tomb Raider (2018)',
    desc: 'Lara Croft, the fiercely independent daughter of a missing adventurer, must push herself beyond her limits when she finds herself on the island where her father disappeared.',
    director: 'Roar Uthaug',
    image: 'https://ia.media-imdb.com/images/M/MV5BOTY4NDcyZGQtYmVlNy00ODgwLTljYTMtYzQ2OTE3NDhjODMwXkEyXkFqcGdeQXVyNzYzODM3Mzg@._V1_UX182_CR0,0,182,268_AL_.jpg',
    movielink: 'https://www.imdb.com/title/tt1365519/',
  },
  {
    id: 2,
    title: 'Black Panther (2018)',
    desc: 'Challa, the King of Wakanda, rises to the throne in the isolated, technologically advanced African nation, but his claim is challenged by a vengeful outsider who was a childhood victim of T\'Challa\'s father\'s mistake.',
    director: 'Ryan Coogler',
    image: 'https://ia.media-imdb.com/images/M/MV5BMTg1MTY2MjYzNV5BMl5BanBnXkFtZTgwMTc4NTMwNDI@._V1_UX182_CR0,0,182,268_AL_.jpg',
    movielink: 'https://www.imdb.com/title/tt1825683/',
  },
];

app.get('/api/movies', ((req, res) => {
  const allMovies = movies.map((movie) => ({
    id: movie.id,
    director: movie.director,
    title: movie.title,
    image: movie.image,
    movielink: movie.movielink,
    desc: movie.desc,
  }));
  res.json(allMovies);
}));

app.get('/api/movies/:id', ((req, res) => {
  res.json(movies.filter((movie) => movie.id === parseInt(req.params.id, 10)));
}));

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// Start your app.
app.listen(port, host, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr) {
        return logger.error(innerErr);
      }

      logger.appStarted(port, prettyHost, url);
    });
  } else {
    logger.appStarted(port, prettyHost);
  }
});
