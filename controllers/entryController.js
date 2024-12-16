const Entry = require('../models/entryModel')
const { createEntrySchema } = require('../middlewares/validator');
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
        res.status(200).json({success: true, message: 'entries', data: result})
    }catch(error){
        console.log(error)
    }
}

const getSingleEntry = async (req, res) => {
    const {_id} = req.query
    try{
        const singleEntry = await Entry.findOne({_id})
		if(!singleEntry){
			return res.status(404).json({success: false, message: 'Entry is not find'})
		}
		res.status(200).json({success: true, message: 'Entry ', data: singleEntry})
    }catch(e){
        console.log(e)
    }
}

const createEntry = async(req, res)=>{
    const { word, pronunciation, meanings } = req.body;
    try {
		const { error, value } = createEntrySchema.validate({
			word, pronunciation, meanings
		});
		if (error) {
			return res
				.status(401)
				.json({ success: false, message: error.details[0].message });
		}

		const result = await Entry.create({
			word, pronunciation, meanings
		});
        result.save()
		res.status(201).json({ success: true, message: 'created', data: result });
	} catch (error) {
		console.log(error);
	}
}

/*
const getSearchEntry = async(req, res)=>{
    
}
const updateEntry = async(req, res)=>{
    
}

const deleteEntry = async(req, res)=>{
    
}*/

module.exports = {
    getAllEntries,
    getSingleEntry,
    createEntry
}