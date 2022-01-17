import mongoose from 'mongoose';

// const DB_CONNECT_OPTIONS = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

export const Database = {
  connect: () => {
    mongoose
      .connect(
        `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PWD}@clusterkko.bhxn2.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
      )
      .then(() => console.log('Database is connected.'))
      .catch(err => console.log(err));
  },
};
