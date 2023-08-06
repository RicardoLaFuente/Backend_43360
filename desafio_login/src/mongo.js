import mongoose from "mongoose";

const dbConnect = () => {
    const mongoUri = 'mongodb+srv://ricardo:lafuente@cluster0.s0s53vt.mongodb.net/?retryWrites=true&w=majority';

    mongoose.set('strictQuery', false);
    mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Conexión exitosa a la base de datos');

        })
        .catch(error => {
            console.error('Error en la conexión a la base de datos:', error);
        });
}

export default dbConnect;