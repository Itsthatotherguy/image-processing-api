import express from 'express';
import routes from './routes';

const app = express();

app.use('/api', routes);

const port = 3000;

app.listen(port, () => {
  console.log(`Image processing API listening on port ${port}`);
});

export default app;
