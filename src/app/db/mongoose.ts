import mongoose from "mongoose";
const MONGOOSE_URI = process.env.MONGOOSE_URI || "mongodb://localhost:27017/cru";
if (!MONGOOSE_URI) {
    throw new Error("Please define the MONGOOSE_URI environment variable inside .env.local");
}
let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }
    
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGOOSE_URI, {
            dbName: "cru",
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw new Error("Failed to connect to MongoDB");
    }
    return cached.conn;
}