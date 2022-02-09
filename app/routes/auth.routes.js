var express = require("express");
var router = express.Router();
const HttpStatus = require("http-status-codes");

const mysql = require("../models/db.model");
const auth = require("../controllers/auth.controller");

router.post("/", (req, res) => {
	const mobileNo = req.body.mobileNo;

	const query = `SELECT user_id AS userId FROM et_user_details WHERE mobile_no = ${mobileNo}`;

	mysql.query(query, (error, result) => {
		if (error) {
			res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send({
				statusCode: HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
				statusMessage: HttpStatus.ReasonPhrases.INTERNAL_SERVER_ERROR
			});
		} else {
			if (!result.length) {
				res.status(HttpStatus.StatusCodes.UNAUTHORIZED).send({
					statusCode: HttpStatus.StatusCodes.UNAUTHORIZED,
					statusMessage: HttpStatus.ReasonPhrases.UNAUTHORIZED
				});
			} else {
				const q = `
            SELECT
              etu.id,
              etud.display_name AS name, 
              etuc.id AS userCategoryId,
              etuc.display_name AS userCategory,
              etud.mobile_no AS mobileNo
            FROM
              et_users etu,
              et_user_categories etuc,
              et_user_details etud
            WHERE etu.id = ${result[0].userId} AND etu.deactivate = 0 AND etu.block = 0 AND etu.user_category_id = etuc.id AND etu.id = etud.user_id`;

				mysql.query(q, (err, rs) => {
					if (err) {
						res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send({
							statusCode: HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
							statusMessage: HttpStatus.ReasonPhrases.INTERNAL_SERVER_ERROR
						});
					} else {
						if (!rs.length) {
							res.status(HttpStatus.StatusCodes.UNAUTHORIZED).send({
								statusCode: HttpStatus.StatusCodes.UNAUTHORIZED,
								statusMessage: HttpStatus.ReasonPhrases.UNAUTHORIZED
							});
						} else {
							const authToken = auth.generateAuthToken(mobileNo);
							res.send({
								statusCode: HttpStatus.StatusCodes.OK,
								statusMessage: HttpStatus.ReasonPhrases.OK,
								authToken: authToken,
								data: rs
							});
						}
					}
				});
			}
		}
	});
});

module.exports = router;
