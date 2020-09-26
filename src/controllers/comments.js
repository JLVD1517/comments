/**
 * Controller file consisting all APIs for comments
 */

const Joi = require('@hapi/joi')
const model = require(`${__dirname}/../models/comments`)


module.exports.create = (req, res) => {
    const query = req.query;
    const body = req.body;

    const schema = Joi.object()
    .keys({
        query: {
            user_id: Joi.number().required()
        },
        body: {
            comment: Joi.string().required()
        }
    })
    
    const request  = {query, body}
    Joi.validate(request, schema, async (err, value) => {
        if(err) {
            res.status(400).send({
                success: false,
                message: 'Invalid request data',
                error: err.details
            })
        } else {
            /**
             * Algorithm:
             * ---------
             * Step 1: Insert new comment in comments table
             * Step 2: Return response
             */
            const response = await model.create(query.user_id, body);
            return res.status(200).send(response);
        }
    })
}

module.exports.reply = (req, res) => {
    const query = req.query;
    const body = req.body;

    const schema = Joi.object()
    .keys({
        query: {
            user_id: Joi.number().required(),
            p_comment_id: Joi.number().required()
        },
        body: {
            comment: Joi.string().required()
        }
    })
    
    const request  = {query, body}
    Joi.validate(request, schema, async (err, value) => {
        if(err) {
            res.status(400).send({
                success: false,
                message: 'Invalid request data',
                error: err.details
            })
        } else {
            /**
             * Algorithm:
             * ---------
             * Step 1: Add a comment to existing post/comment using parent comment id
             * Step 2: Return response
             */
            const response = await model.reply(query, body);
            return res.status(200).send(response);
        }
    })
}

module.exports.update = (req, res) => {
    const query = req.query;
    const body = req.body;
    const params = req.params

    const schema = Joi.object()
    .keys({
        query: {
            user_id: Joi.number().required(),
            comment_id: Joi.number().required()
        },
        body: {
            comment: Joi.string().required()
        }
    }) 

    const request  = {query, body}
    Joi.validate(request, schema, async (err, value) => {
        if(err) {
            res.status(400).send({
                success: false,
                message: 'Invalid request data',
                error: err.details
            })
        } else {
            /**
             * Algorithm:
             * ---------
             * Step 1: Update the existing comment using comment id and user id
             * Step 2: If the affected rows are zero after update that means the user trying edit is invalid
             * Step 3: Return success in case of affected rows is not zero and send failure in case of affected rows is zero
             */
            const response = await model.update(query, body);
            return res.status(200).send(response);
        }
    })
}