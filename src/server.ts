import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.path, () => {
      console.log(`Express app listening on port ${config.path}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
