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

router.post("/:id/templates", auth.verifyAuthToken, (req, res) => {
	const id = req.params.id;
	const userId = req.body.userId;
	const userCategoryId = req.body.userCategoryId;

	const userIdCondition = userId ? `AND ett.created_by = ${userId}` : ``;

	let query = ``;
	if (!userCategoryId || userCategoryId === 1) {
		query = `
      SELECT ett.id, ett.display_name AS name, ett.created_on AS createdOn, etud.display_name AS createdBy
      FROM et_templates ett, et_user_details etud
      WHERE ett.subcategory_id = ${id} AND ett.deactivate = 0 ${userIdCondition} AND ett.created_by = etud.user_id
      ORDER BY CASE WHEN ett.updated_on IS NOT NULL THEN ett.updated_on ELSE ett.created_on END DESC`;
	} else {
		query = `
      SELECT ett.id, ett.display_name AS name, ett.created_on AS createdOn, etud.display_name AS createdBy
      FROM
        et_templates ett, et_user_details etud, (SELECT id AS userId FROM et_users WHERE user_category_id = 1) etu
      WHERE
        ett.subcategory_id = ${id} AND ett.deactivate = 0
        AND ett.created_by IN (${userId}, etu.userId) AND ett.created_by = etud.user_id
      ORDER BY ett.created_by DESC, CASE WHEN ett.updated_on IS NOT NULL THEN ett.updated_on ELSE ett.created_on END DESC`;
	}

	generic.fetchRecords(res, query);
});

router.post("/:id/templates/search", auth.verifyAuthToken, (req, res) => {
	const id = req.params.id;
	const searchText = req.body.searchText;
	const userId = req.body.userId;

	const userIdCondition = userId ? `AND ett.created_by = ${userId}` : ``;

	const query = `
    SELECT ett.id, ett.display_name AS name, ett.created_on AS createdOn, etud.display_name AS createdBy
    FROM et_templates ett, et_user_details etud
    WHERE
      ett.subcategory_id = ${id} AND ett.deactivate = 0 ${userIdCondition}
      AND ett.display_name LIKE '%${searchText}%'
      AND ett.created_by = etud.user_id
    ORDER BY CASE WHEN ett.updated_on IS NOT NULL THEN ett.updated_on ELSE ett.created_on END DESC`;

	generic.fetchRecords(res, query);
});

router.get("/:id/subcategoryTypes", auth.verifyAuthToken, (req, res) => {
	const id = req.params.id;

	const query = `
    SELECT etst.id, etst.display_name AS name, etst.created_on AS createdOn,
      CASE WHEN etstv.subcategoryTypeValues IS NOT NULL THEN etstv.subcategoryTypeValues ELSE 0 END AS subcategoryTypeValues,
      etud.display_name AS createdBy
    FROM et_subcategory_types etst
    LEFT JOIN
      (
        SELECT COUNT(id) AS subcategoryTypeValues, subcategory_type_id
        FROM et_subcategory_type_values
        WHERE deactivate = 0
        GROUP BY subcategory_type_id
      ) etstv
      ON etst.id = etstv.subcategory_type_id,
    et_user_details etud
    WHERE etst.subcategory_id = ${id} AND etst.deactivate = 0 AND etst.created_by = etud.user_id
    ORDER BY etst.display_name`;

	generic.fetchRecords(res, query);
});

router.post("/:id/subcategoryTypes/search", auth.verifyAuthToken, (req, res) => {
	const id = req.params.id;
	const searchText = req.body.searchText;

	const query = `
    SELECT etst.id, etst.display_name AS name, etst.created_on AS createdOn, etud.display_name AS createdBy
    FROM et_subcategory_types etst, et_user_details etud
    WHERE
      etst.subcategory_id = ${id} AND etst.deactivate = 0
      AND etst.display_name LIKE '%${searchText}%'
      AND etst.created_by = etud.user_id
    ORDER BY etst.display_name`;

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
