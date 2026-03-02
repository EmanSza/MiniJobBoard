import mongoose from 'mongoose'

export default class {
    constructor(url) {
        this.url = url;
        this.isShuttingDown = false; // 👈 add this
    }
    /**
     * @method connect
     * @description Connect to the database
     * @returns {Promise<void>}
     */
    async connect() {
        try {
            await mongoose.connect(this.url);
            console.log('💾 SUCCESS | Database Connection Established');

            mongoose.connection.on('error', (err) => {
                console.error('Mongoose connection error:', err);
            });

            mongoose.connection.on('disconnected', () => {
                if (this.isShuttingDown) return; // 👈 stop reconnect loop
                console.log('Mongoose disconnected. Retrying in 5 seconds...');
                setTimeout(() => this.connect(), 5000);
            });

            process.on('SIGINT', async () => {
                await this.disconnect();
                process.exit(0);
            });

        } catch (error) {
            console.error('❌ Mongoose connection failed:', error.message);
            throw error;
        }
    }

    async disconnect() {
        this.isShuttingDown = true; // 👈 set flag before closing
        await mongoose.connection.close();
        console.log('💾 Database connection closed');
    }
}
