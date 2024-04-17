import mongoose from 'mongoose';

let isConnected: boolean = false;

export const connectToDatabase = async () => {
    mongoose.set('strictQuery', true);

    if(!process.env.MONGODB_URL){
        return console.log('Mongoose URL does not exists')
    }
    if(isConnected){
        return console.log("DB is already connected");
    }

    try{
        await mongoose.connect(process.env.MONGODB_URL,{
            dbName:'DevOverFlowNew'
        })
        isConnected=true;
        console.log('Mongodb is connected');
    }catch(error){
        console.log('Error while connecting to Mongo DB', error);

    }

}