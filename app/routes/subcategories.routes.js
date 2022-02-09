var express = require("express");
var router = express.Router();
const HttpStatus = require("http-status-codes");

const mysql = require("../models/db.model");
const generic = require("../models/generic.model");
const auth = require("../controllers/auth.controller");

router.get("/:id", auth.verifyAuthToken, (req, res) => {
	const id = req.params.id;

	const query = `SELECT display_name AS name FROM et_subcategories WHERE id = ${id} AND deactivate = 0`;

	generic.fetchRecords(res, query);
});

router.get("/:id/templates", auth.verifyAuthToken, (req, res) => {
	const id = req.params.id;

	const query = `
    SELECT ett.id, ett.display_name AS name, ett.created_on AS createdOn, etud.display_name AS createdBy
    FROM et_templates ett, et_user_details etud
    WHERE ett.subcategory_id = ${id} AND ett.deactivate = 0 AND ett.created_by = etud.user_id
    ORDER BY CASE WHEN ett.updated_on IS NOT NULL THEN ett.updated_on ELSE ett.created_on END DESC`;

	generic.fetchRecords(res, query);
});

router.post("/:id/templates/search", auth.verifyAuthToken, (req, res) => {
	const id = req.params.id;
	const searchText = req.body.searchText;

	const query = `
    SELECT ett.id, ett.display_name AS name, ett.created_on AS createdOn, etud.display_name AS createdBy
    FROM et_templates ett, et_user_details etud
    WHERE
      ett.subcategory_id = ${id} AND ett.deactivate = 0
      AND ett.display_name LIKE '%${searchText}%'
      AND ett.created_by = etud.user_id
    ORDER BY CASE WHEN ett.updated_on IS NOT NULL THEN ett.updated_on ELSE ett.created_on END DESC`;

	generic.fetchRecords(res, query);
});

router.post("/", auth.verifyAuthToken, (req, res) => {
	const userId = req.body.userId;
	const categoryId = req.body.categoryId;
	const displayName = req.body.name;
	const name = generic.processName(displayName);

	const query = `
	  INSERT INTO et_subcategories (category_id, name, display_name, created_by)
	  VALUES (${categoryId}, '${name}', '${displayName}', ${userId})`;

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
				message: "Subcategory added!"
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
    UPDATE et_subcategories
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
				message: "Subcategory updated!"
			});
		}
	});
});

router.delete("/:id", auth.verifyAuthToken, (req, res) => {
	const id = req.params.id;
	const query = `UPDATE et_subcategories SET deactivate = 1 WHERE id = ${id}`;

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
				message: "Subcategory deleted!"
			});
		}
	});
});

module.exports = router;
