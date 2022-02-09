var express = require("express");
var router = express.Router();
const HttpStatus = require("http-status-codes");

const mysql = require("../models/db.model");
const generic = require("../models/generic.model");
const auth = require("../controllers/auth.controller");

router.get("/", auth.verifyAuthToken, (req, res) => {
	const query = `
    SELECT
      etc.id, etc.display_name AS name, COUNT(ets.id) AS subcategories,
      etc.created_on AS createdOn, etud.display_name AS createdBy
    FROM
      et_categories etc
      LEFT JOIN (SELECT id, category_id FROM et_subcategories WHERE deactivate = 0) ets ON etc.id = ets.category_id,
      et_user_details etud
    WHERE etc.deactivate = 0 AND etc.created_by = etud.user_id
    GROUP BY etc.id
    ORDER BY CASE WHEN etc.updated_on IS NOT NULL THEN etc.updated_on ELSE etc.created_on END DESC`;

	generic.fetchRecords(res, query);
});

router.post("/search", auth.verifyAuthToken, (req, res) => {
	const searchText = req.body.searchText;
	const query = `
    SELECT
      etc.id, etc.display_name AS name, COUNT(ets.id) AS subcategories,
      etc.created_on AS createdOn, etud.display_name AS createdBy
    FROM
      et_categories etc
      LEFT JOIN (SELECT id, category_id FROM et_subcategories WHERE deactivate = 0) ets ON etc.id = ets.category_id,
      et_user_details etud
    WHERE etc.deactivate = 0 AND etc.display_name LIKE '%${searchText}%' AND etc.created_by = etud.user_id
    GROUP BY etc.id
    ORDER BY CASE WHEN etc.updated_on IS NOT NULL THEN etc.updated_on ELSE etc.created_on END DESC`;

	generic.fetchRecords(res, query);
});

router.get("/:id", auth.verifyAuthToken, (req, res) => {
	const id = req.params.id;

	const query = `SELECT display_name AS name FROM et_categories WHERE id = ${id} AND deactivate = 0`;

	generic.fetchRecords(res, query);
});

router.get("/:id/subcategories", auth.verifyAuthToken, (req, res) => {
	const id = req.params.id;

	const query = `
    SELECT
      ets.id, ets.display_name AS name, COUNT(ett.id) AS templates,
      ets.created_on AS createdOn, etud.display_name AS createdBy
    FROM
      et_subcategories ets
      LEFT JOIN (SELECT id, subcategory_id FROM et_templates WHERE deactivate = 0) ett ON ets.id = ett.subcategory_id,
      et_user_details etud
    WHERE ets.category_id = ${id} AND ets.deactivate = 0 AND ets.created_by = etud.user_id
    GROUP BY ets.id
    ORDER BY CASE WHEN ets.updated_on IS NOT NULL THEN ets.updated_on ELSE ets.created_on END DESC`;

	generic.fetchRecords(res, query);
});

router.post("/:id/subcategories/search", auth.verifyAuthToken, (req, res) => {
	const id = req.params.id;
	const searchText = req.body.searchText;

	const query = `
    SELECT
      ets.id, ets.display_name AS name, COUNT(ett.id) AS templates,
      ets.created_on AS createdOn, etud.display_name AS createdBy
    FROM
      et_subcategories ets
      LEFT JOIN (SELECT id, subcategory_id FROM et_templates WHERE deactivate = 0) ett ON ets.id = ett.subcategory_id,
      et_user_details etud
    WHERE
      ets.category_id = ${id} AND ets.deactivate = 0
      AND ets.display_name LIKE '%${searchText}%'
      AND ets.created_by = etud.user_id
    GROUP BY ets.id
    ORDER BY CASE WHEN ets.updated_on IS NOT NULL THEN ets.updated_on ELSE ets.created_on END DESC`;

	generic.fetchRecords(res, query);
});

router.post("/", auth.verifyAuthToken, (req, res) => {
	const userId = req.body.userId;
	const displayName = req.body.name;
	const name = generic.processName(displayName);

	const query = `
	  INSERT INTO et_categories (name, display_name, created_by)
	  VALUES ('${name}', '${displayName}', ${userId})`;

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
				message: "Category added!"
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
    UPDATE et_categories
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
				message: "Category updated!"
			});
		}
	});
});

router.delete("/:id", auth.verifyAuthToken, (req, res) => {
	const id = req.params.id;
	const query = `UPDATE et_categories SET deactivate = 1 WHERE id = ${id}`;

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
				message: "Category deleted!"
			});
		}
	});
});

module.exports = router;
