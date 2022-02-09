var express = require("express");
var router = express.Router();
const HttpStatus = require("http-status-codes");

const mysql = require("../models/db.model");
const generic = require("../models/generic.model");
const auth = require("../controllers/auth.controller");

router.get("/", auth.verifyAuthToken, (req, res) => {
	const query = `
    SELECT
      etu.id, etuc.id AS userCategoryId, etuc.display_name AS userCategory,
      etud.display_name AS name, etud.mobile_no AS mobileNo,
      etu.created_on AS createdOn, etud_created_by.display_name AS createdBy,
      etu.block
    FROM
      et_users etu
        LEFT JOIN
          (SELECT user_id, display_name FROM et_user_details) etud_created_by
          ON etu.created_by = etud_created_by.user_id,
      et_user_categories etuc,
      et_user_details etud
    WHERE etuc.id NOT IN (1) AND etu.deactivate = 0 AND etu.user_category_id = etuc.id AND etu.id = etud.user_id
    ORDER BY CASE WHEN etu.updated_on IS NOT NULL THEN etu.updated_on ELSE etu.created_on END DESC`;

	generic.fetchRecords(res, query);
});

router.post("/search", auth.verifyAuthToken, (req, res) => {
	const searchText = req.body.searchText;
	const query = `
    SELECT
      etu.id, etuc.id AS userCategoryId, etuc.display_name AS userCategory,
      etud.display_name AS name, etud.mobile_no AS mobileNo,
      etu.created_on AS createdOn, etud_created_by.display_name AS createdBy,
      etu.block
    FROM
      et_users etu
        LEFT JOIN
          (SELECT user_id, display_name FROM et_user_details) etud_created_by
          ON etu.created_by = etud_created_by.user_id,
      et_user_categories etuc,
      et_user_details etud
    WHERE
      etuc.id NOT IN (1)
      AND etu.deactivate = 0 AND etu.user_category_id = etuc.id
      AND etu.id = etud.user_id AND etud.display_name LIKE '%${searchText}%'
    ORDER BY CASE WHEN etu.updated_on IS NOT NULL THEN etu.updated_on ELSE etu.created_on END DESC`;

	generic.fetchRecords(res, query);
});

router.get("/:id/userDetails", auth.verifyAuthToken, (req, res) => {
	const id = req.params.id;

	const query = `
    SELECT
      etud.display_name AS name, 
      etuc.display_name AS userCategory,
      etud.mobile_no AS mobileNo
    FROM
      et_users etu,
      et_user_categories etuc,
      et_user_details etud
    WHERE etu.id = ${id} AND etu.user_category_id = etuc.id AND etu.id = etud.user_id`;

	generic.fetchRecords(res, query);
});

router.get("/userCategories", auth.verifyAuthToken, (req, res) => {
	const query = `SELECT id, display_name AS name FROM et_user_categories WHERE id NOT IN (1)`;

	generic.fetchRecords(res, query);
});

router.post("/", auth.verifyAuthToken, (req, res) => {
	const userId = req.body.userId;
	const userCategoryId = req.body.userCategoryId;
	const displayName = req.body.name;
	const name = generic.processName(displayName);
	const mobileNo = req.body.mobileNo;

	const query = `
	  INSERT INTO et_users (user_category_id, created_by, created_on)
	  VALUES (${userCategoryId}, ${userId}, CURRENT_TIMESTAMP)`;

	mysql.query(query, (error, result) => {
		if (error) {
			res.send({
				statusCode: HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
				statusMessage: HttpStatus.ReasonPhrases.INTERNAL_SERVER_ERROR
			});
		} else {
			const q = `
        INSERT INTO et_user_details (user_id, name, display_name, mobile_no)
        VALUES (${result.insertId}, '${name}', '${displayName}', ${mobileNo})`;

			mysql.query(q, (err) => {
				if (err) {
					res.send({
						statusCode: HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
						statusMessage: HttpStatus.ReasonPhrases.INTERNAL_SERVER_ERROR
					});
				} else {
					res.send({
						statusCode: HttpStatus.StatusCodes.OK,
						statusMessage: HttpStatus.ReasonPhrases.OK,
						message: "User added!"
					});
				}
			});
		}
	});
});

router.put("/", auth.verifyAuthToken, (req, res) => {
	const userId = req.body.userId;
	const id = req.body.id;
	const userCategoryId = req.body.userCategoryId;
	const displayName = req.body.name;
	const name = generic.processName(displayName);
	const mobileNo = req.body.mobileNo;

	const query = `
	  UPDATE et_users
    SET
      user_category_id = ${userCategoryId},
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
			const q = `
        UPDATE et_user_details
        SET
          name = '${name}',
          display_name = '${displayName}',
          mobile_no = ${mobileNo}
        WHERE user_id = ${id}`;

			mysql.query(q, (err) => {
				if (err) {
					res.send({
						statusCode: HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
						statusMessage: HttpStatus.ReasonPhrases.INTERNAL_SERVER_ERROR
					});
				} else {
					res.send({
						statusCode: HttpStatus.StatusCodes.OK,
						statusMessage: HttpStatus.ReasonPhrases.OK,
						message: "User details updated!"
					});
				}
			});
		}
	});
});

router.put("/:id/block", auth.verifyAuthToken, (req, res) => {
	const id = req.params.id;
	const query = `UPDATE et_users SET block = 1 WHERE id = ${id}`;

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
				message: "User blocked!"
			});
		}
	});
});

router.put("/:id/unblock", auth.verifyAuthToken, (req, res) => {
	const id = req.params.id;
	const query = `UPDATE et_users SET block = 0 WHERE id = ${id}`;

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
				message: "User unblocked!"
			});
		}
	});
});

router.delete("/:id", auth.verifyAuthToken, (req, res) => {
	const id = req.params.id;
	const query = `UPDATE et_users SET deactivate = 1 WHERE id = ${id}`;

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
				message: "User deleted!"
			});
		}
	});
});

module.exports = router;
