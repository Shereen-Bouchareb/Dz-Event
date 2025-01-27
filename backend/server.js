// server.js
const app = require('./app'); 
require('dotenv').config();


// Set up the server to listen on a port
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
