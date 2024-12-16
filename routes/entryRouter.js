const express = require("express")
const entryController = require("../controllers/entryController")
const router = express.Router()
router
    .get('/',entryController.getAllEntries)
    .get('/single-entry',entryController.getSingleEntry)
    .post('/create-entry', entryController.createEntry)
    //.get('/search',entryController.getSearchEntry)
    //.put('/update-entry', entryController.updateEntry)
    //.delete('/delete-entry',entryController.deleteEntry)


module.exports = router