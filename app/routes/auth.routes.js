var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const HttpStatus = require("http-status-codes");

const mysql = require("../models/db.model");
const auth = require("../controllers/auth.controller");
const generic = require("../models/generic.model");

const verifyPassword = (req, res, next) => {
	const mobileNo = req.body.mobileNo;

	const query = `
    SELECT id AS userId, password, reset_default_password AS resetDefaultPassword
    FROM et_users
    WHERE deactivate = 0 AND mobile_no = ${mobileNo}`;

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
				const userId = result[0].userId;

				const password = req.body.password;
				const registeredPassword = result[0].password;
				const isValidPassword = bcrypt.compareSync(password, registeredPassword);

				if (isValidPassword) {
					if (!result[0].resetDefaultPassword) {
						req.userId = userId;
						next();
					} else {
						const q = `
              SELECT
                etu.id AS userId,
                etud.display_name AS name
              FROM
                et_users etu,
                et_user_details etud
              WHERE etu.id = ${userId} AND etu.id = etud.user_id`;

						mysql.query(q, (err, rs) => {
							if (err) {
								res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send({
									statusCode: HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
									statusMessage: HttpStatus.ReasonPhrases.INTERNAL_SERVER_ERROR
								});
							} else {
								res.send({
									statusCode: HttpStatus.StatusCodes.RESET_CONTENT,
									statusMessage: HttpStatus.ReasonPhrases.RESET_CONTENT,
									data: rs
								});
							}
						});
					}
				} else {
					res.status(HttpStatus.StatusCodes.UNAUTHORIZED).send({
						statusCode: HttpStatus.StatusCodes.UNAUTHORIZED,
						statusMessage: HttpStatus.ReasonPhrases.UNAUTHORIZED
					});
				}
			}
		}
	});
};

router.post("/", verifyPassword, (req, res) => {
	const mobileNo = req.body.mobileNo;

	const query = `
    SELECT
      etu.id,
      etu.mobile_no AS mobileNo,
      etud.display_name AS name,
      etuc.id AS userCategoryId,
      etuc.display_name AS userCategory,
      TRIM('/' FROM CONCAT_WS('/', etm.base_path, etm.path)) as defaultPath
    FROM
      et_users etu,
      et_user_categories etuc,
      et_authorize_default_menus etadm,
      et_menus etm,
      et_user_details etud
    WHERE
      etu.id = ${req.userId} AND etu.deactivate = 0 AND etu.block = 0
      AND etu.user_category_id = etuc.id
      AND etu.user_category_id = etadm.user_category_id AND etadm.menu_id = etm.id
      AND etu.id = etud.user_id`;

	mysql.query(query, (error, result) => {
		if (error) {
			res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send({
				statusCode: HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
				statusMessage: HttpStatus.ReasonPhrases.INTERNAL_SERVER_ERROR
			});
		} else {
			const authToken = auth.generateAuthToken(mobileNo);

			mysql.query(`
        UPDATE et_users
        SET
          last_logged_on = CURRENT_TIMESTAMP,
          visiting_count = IF(visiting_count > 0, visiting_count + 1, 1)
        WHERE id = ${req.userId}`);

			res.send({
				statusCode: HttpStatus.StatusCodes.OK,
				statusMessage: HttpStatus.ReasonPhrases.OK,
				authToken: authToken,
				data: result
			});
		}
	});
});

router.get("/menus/:userCategoryId", auth.verifyAuthToken, (req, res) => {
	const userCategoryId = req.params.userCategoryId;

	const query = `
    SELECT
      etm.id, etm.display_name AS name,
      etm.base_path AS basePath, etm.path, etm.display_order AS displayOrder,
      etm.css_class_names AS classNames, etm.icon
    FROM et_menus_authorization etma, et_menus etm
    WHERE
      etma.user_category_id = ${userCategoryId} AND etma.menu_id = etm.id
      AND etm.auth = 1 AND etm.block = 0 AND etm.type = 0
    ORDER BY etm.display_order ASC`;

	generic.fetchRecords(res, query);
});

router.get("/userMenus/:userCategoryId", auth.verifyAuthToken, (req, res) => {
	const userCategoryId = req.params.userCategoryId;

	const query = `
    SELECT
      etm.id, etm.name AS code, etm.display_name AS name,
      etm.display_order AS displayOrder,
      etm.css_class_names AS classNames, etm.icon
    FROM et_menus_authorization etma, et_menus etm
    WHERE
      etma.user_category_id = ${userCategoryId} AND etma.menu_id = etm.id
      AND etm.auth = 1 AND etm.block = 0 AND etm.type = 1
    ORDER BY etm.display_order ASC`;

	generic.fetchRecords(res, query);
});

module.exports = router;
