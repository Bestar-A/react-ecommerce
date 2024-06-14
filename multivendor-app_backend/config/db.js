import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongo:${conn.connection.host}`)
    } catch (error) {
        
    }
}

export default connectDB