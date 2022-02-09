var express = require("express");
var router = express.Router();
const HttpStatus = require("http-status-codes");
const { randomUUID } = require("crypto");

const mysql = require("../models/db.model");
const generic = require("../models/generic.model");
const auth = require("../controllers/auth.controller");

// Templates START >>
router.get("/:id", auth.verifyAuthToken, (req, res) => {
	const id = req.params.id;

	const query = `SELECT display_name AS name FROM et_templates WHERE id = ${id} AND deactivate = 0`;

	generic.fetchRecords(res, query);
});

router.get("/:id/fields", auth.verifyAuthToken, (req, res) => {
	const id = req.params.id;

	const query = `
    SELECT id, display_name AS name
    FROM et_template_fields
    WHERE template_id = ${id} AND deactivate = 0`;

	generic.fetchRecords(res, query);
});

router.get("/:id/text", auth.verifyAuthToken, (req, res) => {
	const id = req.params.id;

	const query = `SELECT id, text FROM et_template_text WHERE template_id = ${id}`;

	generic.fetchRecords(res, query);
});

router.post("/", auth.verifyAuthToken, (req, res) => {
	const userId = req.body.userId;
	const subcategoryId = req.body.subcategoryId;
	const displayName = req.body.name;
	const name = generic.processName(displayName);

	const query = `
	  INSERT INTO et_templates (subcategory_id, name, display_name, created_by)
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
				message: "Template added!"
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
    UPDATE et_templates
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
				message: "Template updated!"
			});
		}
	});
});

router.delete("/:id", auth.verifyAuthToken, (req, res) => {
	const id = req.params.id;
	const query = `UPDATE et_templates SET deactivate = 1 WHERE id = ${id}`;

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
				message: "Template deleted!"
			});
		}
	});
});
// << END Templates

// Compose Template START >>
const insertOrUpdateTemplateText = (res, userId, id, textId, text) => {
	const query = `
    INSERT INTO et_template_text (id, template_id, text, created_by, created_on, updated_by, updated_on)
    VALUES (${textId}, ${id}, '${text}', ${userId}, CURRENT_TIMESTAMP, NULL, NULL)
    ON DUPLICATE KEY
    UPDATE text = VALUES(text), updated_by = ${userId}, updated_on = CURRENT_TIMESTAMP`;

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
				message: "Template composition saved!"
			});
		}
	});
};

const insertOrUpdateTemplateFields = (res, userId, id, fields, textId, text) => {
	mysql.query(`UPDATE et_template_fields SET deactivate = 1 WHERE template_id = ${id}`);

	const query = `
	  INSERT INTO et_template_fields (id, template_id, name, display_name, created_by, created_on, updated_by, updated_on, deactivate)
	  VALUES ${fields.join(", ")}
    ON DUPLICATE KEY
    UPDATE name = VALUES(name), display_name = VALUES(display_name), updated_by = ${userId}, updated_on = CURRENT_TIMESTAMP, deactivate = 0`;

	mysql.query(query, (error) => {
		if (error) {
			res.send({
				statusCode: HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
				statusMessage: HttpStatus.ReasonPhrases.INTERNAL_SERVER_ERROR
			});
		} else {
			insertOrUpdateTemplateText(res, userId, id, textId, text);
		}
	});
};

router.post("/composeTemplate", auth.verifyAuthToken, (req, res) => {
	const userId = req.body.userId;
	const id = req.body.id;
	const fields = [];
	const textId = req.body.textId;
	const text = req.body.text;

	if (req.body?.fields.length > 0) {
		req.body?.fields.forEach((field) => {
			const fieldId = field.id;
			const displayName = field.name;
			const name = generic.processName(displayName);

			fields.push(
				`(${fieldId}, ${id}, '${name}', '${displayName}', ${userId}, CURRENT_TIMESTAMP, NULL, NULL, 0)`
			);
		});

		if (fields.length > 0) {
			insertOrUpdateTemplateFields(res, userId, id, fields, textId, text);
		}
	} else {
		mysql.query(`UPDATE et_template_fields SET deactivate = 1 WHERE template_id = ${id}`);
		insertOrUpdateTemplateText(res, userId, id, textId, text);
	}
});
// << END Compose Template

// User Templates START >>
router.get("/userTemplates/:userId/all", auth.verifyAuthToken, (req, res) => {
	const userId = req.params.userId;
	const query = `
    SELECT id, uuid, created_on AS createdOn
    FROM et_user_templates
    WHERE deactivate = 0 AND user_id = ${userId}
    ORDER BY created_on DESC`;

	mysql.query(query, (error, result) => {
		if (error) {
			res.send({
				statusCode: HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
				statusMessage: HttpStatus.ReasonPhrases.INTERNAL_SERVER_ERROR
			});
		} else {
			res.send({
				statusCode: HttpStatus.StatusCodes.OK,
				statusMessage: HttpStatus.ReasonPhrases.OK,
				data: result
			});
		}
	});
});

router.get("/userTemplates/:id", auth.verifyAuthToken, (req, res) => {
	const id = req.params.id;
	const query = `SELECT uuid, text FROM et_user_templates WHERE id = ${id}`;

	mysql.query(query, (error, result) => {
		if (error) {
			res.send({
				statusCode: HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
				statusMessage: HttpStatus.ReasonPhrases.INTERNAL_SERVER_ERROR
			});
		} else {
			res.send({
				statusCode: HttpStatus.StatusCodes.OK,
				statusMessage: HttpStatus.ReasonPhrases.OK,
				data: result
			});
		}
	});
});

router.put("/userTemplates", auth.verifyAuthToken, (req, res) => {
	const userId = req.body.userId;
	const uuid = randomUUID();
	const text = req.body.text;

	const query = `
    INSERT INTO et_user_templates (user_id, uuid, text, created_on)
    VALUES (${userId}, '${uuid}', '${text}', CURRENT_TIMESTAMP)`;

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
				message: "Template updated!"
			});
		}
	});
});

router.delete("/userTemplates/:id", auth.verifyAuthToken, (req, res) => {
	const id = req.params.id;
	const query = `UPDATE et_user_templates SET deactivate = 1 WHERE id = ${id}`;

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
				message: "Template deleted!"
			});
		}
	});
});
// << END User Templates

module.exports = router;
