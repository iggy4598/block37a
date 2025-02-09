const app = require('./app');
const { PORT } = require('./database');

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});