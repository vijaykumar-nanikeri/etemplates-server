var express = require("express");
var router = express.Router();
const HttpStatus = require("http-status-codes");

const mysql = require("../models/db.model");
const generic = require("../models/generic.model");
const auth = require("../controllers/auth.controller");

router.get("/:id", auth.verifyAuthToken, (req, res) => {
	const id = req.params.id;

	const query = `SELECT display_name AS name FROM et_subcategory_types WHERE id = ${id} AND deactivate = 0`;

	generic.fetchRecords(res, query);
});

router.post("/", auth.verifyAuthToken, (req, res) => {
	const userId = req.body.userId;
	const subcategoryId = req.body.subcategoryId;
	const displayName = req.body.name;
	const name = generic.processName(displayName);

	const query = `
	  INSERT INTO et_subcategory_types (subcategory_id, name, display_name, created_by)
	  VALUES (${subcategoryId}, '${name}', '${displayName}', ${userId})`;

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
				message: "Subcategory type added!"
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
    UPDATE et_subcategory_types
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
				message: "Subcategory type updated!"
			});
		}
	});
});

router.delete("/:id", auth.verifyAuthToken, (req, res) => {
	const id = req.params.id;
	const query = `UPDATE et_subcategory_types SET deactivate = 1 WHERE id = ${id}`;

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
				message: "Subcategory type deleted!"
			});
		}
	});
});

// Subcategory Type Values START >>
router.get("/:id/values", auth.verifyAuthToken, (req, res) => {
	const id = req.params.id;

	const query = `
    SELECT etstv.id, etstv.display_name AS name, etstv.created_on AS createdOn, etud.display_name AS createdBy
    FROM et_subcategory_type_values etstv, et_user_details etud
    WHERE etstv.subcategory_type_id = ${id} AND etstv.deactivate = 0 AND etstv.created_by = etud.user_id
    ORDER BY etstv.display_name`;

	generic.fetchRecords(res, query);
});

router.post("/values", auth.verifyAuthToken, (req, res) => {
	const userId = req.body.userId;
	const subcategoryTypeId = req.body.subcategoryTypeId;
	const displayName = req.body.name;
	const name = generic.processName(displayName);

	const query = `
	  INSERT INTO et_subcategory_type_values (subcategory_type_id, name, display_name, created_by)
	  VALUES (${subcategoryTypeId}, '${name}', '${displayName}', ${userId})`;

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
				message: "Subcategory type value added!"
			});
		}
	});
});

router.put("/values", auth.verifyAuthToken, (req, res) => {
	const userId = req.body.userId;
	const id = req.body.id;
	const displayName = req.body.name;
	const name = generic.processName(displayName);

	const query = `
    UPDATE et_subcategory_type_values
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
				message: "Subcategory type value updated!"
			});
		}
	});
});

router.delete("/values/:id", auth.verifyAuthToken, (req, res) => {
	const id = req.params.id;
	const query = `UPDATE et_subcategory_type_values SET deactivate = 1 WHERE id = ${id}`;

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
				message: "Subcategory type value deleted!"
			});
		}
	});
});
// << END Subcategory Type Values

module.exports = router;
