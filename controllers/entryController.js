const Entry = require('../models/entryModel')
const getAllEntries = async(req, res) => {
    const {page} = req.query
    const entryPerPage = 10
    try{
        if(page<=1){
            pageNum = 0
        }else{
            pageNum = page-1
        }
        const result = await Entry.find().sort({createdAt: -1}).skip(pageNum*entryPerPage).limit(entryPerPage)
        res.status(200).json({success: true, message: 'Entries', data: result})
    }catch(error){
        console.log(error)
    }
}

const getSingleEntry = async((req, res)=>{
    
})

const getSearchEntry = async((req, res)=>{
    
})

const createEntry = async((req, res)=>{
    
})

const updateEntry = async((req, res)=>{
    
})

const deleteEntry = async((req, res)=>{
    
})