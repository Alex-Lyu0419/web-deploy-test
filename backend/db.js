import mongoose from 'mongoose';
import dotenv from 'dotenv-defaults';

export default {
    connect: () => {
        dotenv.config();
        mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then((res) => console.log("mongo db connection created"));

        const db = mongoose.connection;
        db.on('error', (error) => {
            console.log(error)
        });
        
        db.once('connected', () => {
            console.log('Database Connected');
        });
    }
};
