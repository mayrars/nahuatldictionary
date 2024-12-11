const express = require("express")
const router = express.Router()
const entryController = require("../controllers/entryController")
router
    .get('/',entryController.getAllEntries)
    .get('/single-entry',entryController.getSingleEntry)
    .get('/search',entryController.getSearchEntry)
    .post('/create-entry', entryController.createEntry)
    .put('/update-entry', entryController.updateEntry)
    .delete('/delete-entry',entryController.deleteEntry)


module.exports = router