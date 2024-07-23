import mongoose from 'mongoose'

import {ENV_VARS} from './varEnv.js'

export const connectDB = async () => {
    
    try {
        const conn = await mongoose.connect(ENV_VARS.MONGO_URI)
        console.log('MongoDB connect: ' + ENV_VARS.MONGO_URI);
    } catch (error) {
        console.error("ERROR connect: " + error);
        // Sutdown server
        process.exit(1) // 1 là gặp lỗi, 0 là thành công
    }
}