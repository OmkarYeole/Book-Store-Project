import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from './models/bookModel.js';

const app = express();

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to MERN Stack Tutorial');
});

// Route for saving a new book
app.post('/books', async (request, response) => {
    try{
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.description 
        ) {
            return response.status(400).send({ message: 'Please fill all the required fields: title, author, publishYear',

             });
        }

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

mongoose
.connect(mongoDBURL)
.then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`);
    });
})
.catch((error) => {
    console.log("Error connecting to MongoDB", error);
});

