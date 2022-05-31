var express = require("express");
var router = express.Router();
const HttpStatus = require("http-status-codes");

const mysql = require("../models/db.model");
const generic = require("../models/generic.model");
const auth = require("../controllers/auth.controller");

router.get("/", auth.verifyAuthToken, (req, res) => {
	const query = `
    SELECT etfn.id, etfn.display_name AS name, etfn.created_on AS createdOn, etud.display_name AS createdBy
    FROM et_field_names etfn, et_user_details etud
    WHERE etfn.deactivate = 0 AND etfn.created_by = etud.user_id
    ORDER BY etfn.display_name`;

	generic.fetchRecords(res, query);
});

router.post("/search", auth.verifyAuthToken, (req, res) => {
	const searchText = req.body.searchText;

	const query = `
    SELECT etfn.id, etfn.display_name AS name, etfn.created_on AS createdOn, etud.display_name AS createdBy
    FROM et_field_names etfn, et_user_details etud
    WHERE etfn.deactivate = 0 AND etfn.created_by = etud.user_id AND etfn.display_name LIKE '%${searchText}%'
    ORDER BY etfn.display_name`;

	generic.fetchRecords(res, query);
});

router.post("/", auth.verifyAuthToken, (req, res) => {
	const userId = req.body.userId;
	const displayName = req.body.name;
	const name = generic.processName(displayName);

	const query = `
    INSERT INTO et_field_names (name, display_name, created_by, created_on)
    VALUES ('${name}', '${displayName}', ${userId}, CURRENT_TIMESTAMP)`;

	mysql.query(query, (error) => {
		if (error) {
			res.send({
				statusCode: HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
				statusMessage: HttpStatus.ReasonPhrases.INTERNAL_SERVER_ERROR
			});
		} else {
			res.send({
				statusCode: HttpStatus.StatusCodes.OK,
				statusMessage: HttpStatus.ReasonPhrases.OK,
				message: "Field name added!"
			});
		}
	});
});

router.put("/", auth.verifyAuthToken, (req, res) => {
	const userId = req.body.userId;
	const id = req.body.id;
	const displayName = req.body.name;
	const name = generic.processName(displayName);

	const query = `
    UPDATE et_field_names
    SET
      name = '${name}',
      display_name = '${displayName}',
      updated_by = ${userId},
      updated_on = CURRENT_TIMESTAMP
    WHERE id = ${id}`;

	mysql.query(query, (error) => {
		if (error) {
			res.send({
				statusCode: HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
				statusMessage: HttpStatus.ReasonPhrases.INTERNAL_SERVER_ERROR
			});
		} else {
			res.send({
				statusCode: HttpStatus.StatusCodes.OK,
				statusMessage: HttpStatus.ReasonPhrases.OK,
				message: "Field name updated!"
			});
		}
	});
});

router.delete("/:id", auth.verifyAuthToken, (req, res) => {
	const id = req.params.id;
	const query = `UPDATE et_field_names SET deactivate = 1 WHERE id = ${id}`;

	mysql.query(query, (error) => {
		if (error) {
			res.send({
				statusCode: HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
				statusMessage: HttpStatus.ReasonPhrases.INTERNAL_SERVER_ERROR
			});
		} else {
			res.send({
				statusCode: HttpStatus.StatusCodes.OK,
				statusMessage: HttpStatus.ReasonPhrases.OK,
				message: "Field name deleted!"
			});
		}
	});
});

module.exports = router;
