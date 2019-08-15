require('dotenv').config();

const server = require('./api/server.js');

// we'll read the port from the server environment if it is there
// heroku will have the PORT environment variable set
const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(process.env.PORT)
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});
