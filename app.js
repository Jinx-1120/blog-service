const { port } = require('./config/config');
const app = require('./config/express');
const mongoose = require('./config/mongoose');

mongoose.connect();

app.listen(port, () => console.log(`server started on port ${port}`));
