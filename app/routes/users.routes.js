var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const HttpStatus = require("http-status-codes");

const mysql = require("../models/db.model");
const generic = require("../models/generic.model");
const auth = require("../controllers/auth.controller");

router.get("/", auth.verifyAuthToken, (req, res) => {
	const query = `
    SELECT
      etu.id, etuc.id AS userCategoryId,
      etu.mobile_no AS mobileNo, etuc.display_name AS userCategory,
      etud.display_name AS name,
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
      etu.id, etuc.id AS userCategoryId, etu.mobile_no AS mobileNo,
      etuc.display_name AS userCategory, etud.display_name AS name,
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
      etu.mobile_no AS mobileNo
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

const verifyMobileNo = (req, res, next) => {
	const mobileNo = req.body.mobileNo;
	const query = `SELECT COUNT(id) AS users FROM et_users WHERE mobile_no = ${mobileNo}`;

	mysql.query(query, (error, result) => {
		if (error) {
			res.send({
				statusCode: HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
				statusMessage: HttpStatus.ReasonPhrases.INTERNAL_SERVER_ERROR
			});
		} else {
			if (result[0].users) {
				res.send({
					statusCode: HttpStatus.StatusCodes.CONFLICT,
					statusMessage: HttpStatus.ReasonPhrases.CONFLICT,
					message: "User exists!"
				});
			} else {
				next();
			}
		}
	});
};

router.post("/", auth.verifyAuthToken, verifyMobileNo, (req, res) => {
	const userId = req.body.userId;
	const userCategoryId = req.body.userCategoryId;
	const displayName = req.body.name;
	const name = generic.processName(displayName);
	const mobileNo = req.body.mobileNo;
	const tpassword = process.env.DEFAULT_PASSWORD;
	const password = bcrypt.hashSync(tpassword, 8);

	const query = `
	  INSERT INTO et_users
      (user_category_id,
        mobile_no,
        tpassword,
        password,
        created_by,
        created_on,
        reset_default_password)
	  VALUES
      (${userCategoryId},
        ${mobileNo},
        '${tpassword}',
        '${password}',
        ${userId},
        CURRENT_TIMESTAMP,
        1)`;

	mysql.query(query, (error, result) => {
		if (error) {
			res.send({
				statusCode: HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
				statusMessage: HttpStatus.ReasonPhrases.INTERNAL_SERVER_ERROR
			});
		} else {
			const q = `
	      INSERT INTO et_user_details (user_id, name, display_name)
	      VALUES (${result.insertId}, '${name}', '${displayName}')`;

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
      mobile_no = ${mobileNo},
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
          display_name = '${displayName}'
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

const verifyOldPassword = (req, res, next) => {
	const userId = req.body.userId;

	const query = `SELECT password FROM et_users WHERE id = ${userId}`;

	mysql.query(query, (error, result) => {
		if (error) {
			res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send({
				statusCode: HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
				statusMessage: HttpStatus.ReasonPhrases.INTERNAL_SERVER_ERROR
			});
		} else {
			const password = req.body.oldPassword;
			const registeredPassword = result[0].password;

			const isValidPassword = bcrypt.compareSync(password, registeredPassword);

			if (isValidPassword) {
				next();
			} else {
				res.send({
					statusCode: HttpStatus.StatusCodes.UNAUTHORIZED,
					statusMessage: HttpStatus.ReasonPhrases.UNAUTHORIZED
				});
			}
		}
	});
};

router.put("/changePassword", auth.verifyAuthToken, verifyOldPassword, (req, res) => {
	const userId = req.body.userId;
	const newPassword = req.body.newPassword;

	const tpassword = newPassword;
	const password = bcrypt.hashSync(tpassword, 8);

	const query = `
    UPDATE et_users
    SET tpassword = '${tpassword}', password = '${password}'
    WHERE id = ${userId}`;

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
				message: "The password has been changed!"
			});
		}
	});
});

router.put("/changeDefaultPassword", (req, res) => {
	const userId = req.body.userId;
	const newPassword = req.body.newPassword;

	const tpassword = newPassword;
	const password = bcrypt.hashSync(tpassword, 8);

	const query = `
    UPDATE et_users
    SET tpassword = '${tpassword}', password = '${password}', reset_default_password = 0
    WHERE id = ${userId}`;

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
				message: "The password has been changed! Please login with new password."
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

router.put("/:id/resetPassword", auth.verifyAuthToken, (req, res) => {
	const id = req.params.id;
	const tpassword = process.env.DEFAULT_PASSWORD;
	const password = bcrypt.hashSync(tpassword, 8);

	const query = `
    UPDATE et_users
    SET tpassword = '${tpassword}', password = '${password}', reset_default_password = 1
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
				message: "The password has been reset!"
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
