const express = require("express");
const cors = require('cors');
const dictionaryRouter = require("./routes/entryRouter");
const mongose = require('mongoose');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
mongose.connect(process.env.MONGO_URI).then(() => {
    console.log('connected to db')
}).catch((err) => {
    console.log(err)
})
app.use("/api/v1/dictionary", dictionaryRouter);
app.listen(PORT), () => {
    console.log('listen...')
}