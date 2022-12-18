require('dotenv').config();
const app = require('./app');
const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send('YUNEDA TEAM !!');
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
