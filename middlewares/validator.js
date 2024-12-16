const Joi = require('joi');
exports.createEntrySchema = Joi.object({
    word: Joi.string()
		.min(6)
		.max(60)
		.required(),
    pronunciation: Joi.array().items({
        audio: Joi.string()
            .min(6)
            .max(600),
        sourceUrl: Joi.string()
            .min(6)
            .max(600)
    }),
    meanings: Joi.array().items({
        definitions: Joi.string()
            .min(6)
            .max(600),
        example: Joi.string()
            .min(6)
            .max(600)
    })
})