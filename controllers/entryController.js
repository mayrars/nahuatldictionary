const Entry = require('../models/entryModel')
const { createEntrySchema,updateEntrySchema } = require('../middlewares/validator');
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

const deleteEntry = async(req, res)=>{
    const {_id} = req.query
    try {
		const existsEntry = await Entry.findOne({ _id });
		if(!existsEntry){
			return res.status(404).json({success: false, message: 'Entry are not find'})
		}
		await Entry.deleteOne({_id})
		res.status(200).json({ success: true, message: 'Entry deleted' });
	} catch (error) {
		console.log(error);
	}
}
const updateEntry = async(req, res)=>{
    const { word, pronunciation, meanings } = req.body;
    const {_id} = req.query
    try{
        const {error, value} = updateEntrySchema.validate({
            word, pronunciation, meanings
        })
        if(error){
            return res.status(401).json({success: false, message: error.details[0].message})
        }
        //verify if exists
        const existsEntry = await Entry.findOne({ _id });
        if(!existsEntry){
			return res.status(404).json({success: false, message: 'entry unavailable'})
		}
        existsEntry.word = word;
		existsEntry.pronunciation = pronunciation;
		existsEntry.meanings = meanings;
		const result = await existsEntry.save();
        res.status(200).json({ success: true, message: 'Entry Updated', data: result });
    }catch (error) {
		console.log(error);
	}
}

const getSearchEntry = async(req, res)=>{
    try{
        const query = req.query.q || '';
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const filter = {
            word: req.query.word,
            pronunciation: req.query.pronunciation,
            meanings: req.query.meanings
        }
        const searchData = {}
        if(query){
            searchData.$text = {$search: query}
        }
        if(filter.word) searchData.word = {$regex: filter.word, $options: 'i'};
        if(filter.pronunciation) searchData.pronunciation = {$regex: filter.pronunciation};
        if(filter.meanings) searchData.meanings = {$regex: filter.meanings};
        const entry = await Entry.find(searchData)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
        const totalEntries = await Entry.countDocuments(searchData);
        res.status(200).json({
            success: true,
            message: 'Entries found',
            data: entry,
            total: totalEntries,
            page,
            limit
        })

    }catch(error){
        console.log(error)
    }
}


module.exports = {
    getAllEntries,
    getSingleEntry,
    createEntry,
    deleteEntry,
    updateEntry,
    getSearchEntry
}