const express = require("express")
const entryController = require("../controllers/entryController")
const router = express.Router()
router
    .get('/',entryController.getAllEntries)
    .get('/single-entry',entryController.getSingleEntry)
    .post('/create-entry', entryController.createEntry)
    .delete('/delete-entry',entryController.deleteEntry)
    //.get('/search',entryController.getSearchEntry)
    //.put('/update-entry', entryController.updateEntry)


module.exports = router