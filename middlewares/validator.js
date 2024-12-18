const Joi = require('joi');

exports.createEntrySchema = Joi.object({
    word: Joi.string()
        .min(1) 
        .max(100) 
        .required()
        .messages({
            "string.empty": "Word is required",
            "string.min": "Word must be at least 1 character",
            "string.max": "Word cannot exceed 100 characters",
        }),
    pronunciation: Joi.array().items(
        Joi.object({
            audio: Joi.string()
                .uri()
                .max(600)
                .messages({
                    "string.uri": "Audio must be a valid URL",
                    "string.max": "Audio URL cannot exceed 600 characters",
                }),
            sourceUrl: Joi.string()
                .uri()
                .max(600)
                .messages({
                    "string.uri": "Source URL must be a valid URL",
                    "string.max": "Source URL cannot exceed 600 characters",
                }),
        })
    ),
    meanings: Joi.array().items(
        Joi.object({
            definitions: Joi.array()
                .items(Joi.string().min(1).max(600))
                .min(1)
                .required()
                .messages({
                    "array.min": "At least one definition is required",
                    "string.min": "Each definition must be at least 1 character",
                    "string.max": "Each definition cannot exceed 600 characters",
                }),
            example: Joi.string()
                .allow("")
                .max(600)
                .messages({
                    "string.max": "Example cannot exceed 600 characters",
                }),
        })
    ).min(1).messages({
        "array.min": "At least one meaning is required",
    }),
});

exports.updateEntrySchema = Joi.object({
    word: Joi.string()
        .min(1) 
        .max(100) 
        .required()
        .messages({
            "string.empty": "Word is required",
            "string.min": "Word must be at least 1 character",
            "string.max": "Word cannot exceed 100 characters",
        }),
    pronunciation: Joi.array().items(
        Joi.object({
            audio: Joi.string()
                .uri()
                .max(600)
                .messages({
                    "string.uri": "Audio must be a valid URL",
                    "string.max": "Audio URL cannot exceed 600 characters",
                }),
            sourceUrl: Joi.string()
                .uri()
                .max(600)
                .messages({
                    "string.uri": "Source URL must be a valid URL",
                    "string.max": "Source URL cannot exceed 600 characters",
                }),
        })
    ),
    meanings: Joi.array().items(
        Joi.object({
            definitions: Joi.array()
                .items(Joi.string().min(1).max(600))
                .min(1)
                .required()
                .messages({
                    "array.min": "At least one definition is required",
                    "string.min": "Each definition must be at least 1 character",
                    "string.max": "Each definition cannot exceed 600 characters",
                }),
            example: Joi.string()
                .allow("")
                .max(600)
                .messages({
                    "string.max": "Example cannot exceed 600 characters",
                }),
        })
    ).min(1).messages({
        "array.min": "At least one meaning is required",
    }),
});
