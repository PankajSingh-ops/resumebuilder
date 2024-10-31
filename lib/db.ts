import mongoose from 'mongoose';

const connection: { isConnected?: number } = {};


async function dbConnect() {
    
    
    if (connection.isConnected) {
        return;
    }
    console.log(process.env.MONGODB_URI,"id");

    
    const db=await mongoose.connect(process.env.MONGODB_URI!);
    console.log(db,"fbb");
    
    connection.isConnected=db.connections[0].readyState;
}

export default dbConnect;