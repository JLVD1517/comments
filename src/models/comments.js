const mysql = require('mysql')
const { response } = require('express')
const pool = require(`${__dirname}/../helpers/connection`)


const create = (user_id, body) => {

    // Add new comment to comments table
    return new Promise( (resolve, reject) => {
        try{
            pool.getConnection(function (value, connection) {
                let query = "INSERT INTO COMMENTS (`USER_ID`, `COMMENT`) VALUES (?, ?)"
                let params = [user_id, body.comment]
                let queryStr = mysql.format(query, params)
                connection.query(queryStr, function (err, response) {
                    if (err) {
                        resolve({
                            success: false,
                            message: 'Error in creating comment',
                            error: err
                        })
                    } else {
                        resolve({
                            success: true,
                            message: 'Comment created successfully',
                            error: null,
                            data: response
                        })
                    }
                })
            })
        } catch (err) {
            resolve({
                success: false,
                message: 'Error in creating comment',
                error: err
            })
        }
    })
}

const reply = (query, body) => {

    // Add a reply to existing comment
    return new Promise( (resolve, reject) => {
        try{
            pool.getConnection(function (value, connection) {
                let sqlQuery = "INSERT INTO COMMENTS (`USER_ID`, `COMMENT`, `PARENT_ID`) VALUES (?, ?, ?)"
                let params = [query.user_id, body.comment, query.p_comment_id]
                let queryStr = mysql.format(sqlQuery, params)
                connection.query(queryStr, function (err, response) {
                    if (err) {
                        resolve({
                            success: false,
                            message: 'Error in adding comment',
                            error: err
                        })
                    } else {
                        resolve({
                            success: true,
                            message: 'Comment added successfully',
                            error: null,
                            data: response
                        })
                    }
                })
            })
        } catch (err) {
            resolve({
                success: false,
                message: 'Error in adding comment',
                error: err
            })
        }
    })
}

const update = (query, body) => {

    // Updating the already added comment
    return new Promise( (resolve, reject) => {
        try{
            pool.getConnection(function (value, connection) {
                let sqlQuery = "UPDATE COMMENTS SET COMMENT = ? WHERE USER_ID=? AND COMMENT_ID=?"
                let params = [body.comment, query.user_id, query.comment_id]
                let queryStr = mysql.format(sqlQuery, params)
                connection.query(queryStr, function (err, response) {
                    if (err) {
                        resolve({
                            success: false,
                            message: 'Error in updating comment',
                            error: err
                        })
                    } else {
                        // If affected rows are zero means invalid user is trying to update the comment
                        if(response.affectedRows == 0) {
                            resolve({
                                success: false,
                                message: 'User not allowed to update',
                                error: 'Access denied',
                                data: null

                            })
                        }
                        resolve({
                            success: true,
                            message: 'Comment updated successfully',
                            error: null,
                            data: response
                        })
                    }
                })
            })
        } catch (err) {
            resolve({
                success: false,
                message: 'Error in updaing comment',
                error: err
            })
        }
    })
}



module.exports = {
    create,
    reply,
    update
}