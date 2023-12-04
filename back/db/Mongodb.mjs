const mongoURL = process.env.MONGO_DB_URL;

const options = {
    mongoUrl: mongoURL,
    collectionName: 'sessions',
    dbName: 'raincife'
}

export default options; 