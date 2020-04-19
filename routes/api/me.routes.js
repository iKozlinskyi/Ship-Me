const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

/**
 * @apiDefine AuthHeader
 *
 * @apiHeader {String} Authorization JWT-auth token
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer j30ffsefoifesoifeofesoifesjisenirdndrgiudrngd"
 *     }
 */

/**
 * @api {get} /api/me Driver - Get logged driver data
 *
 * @apiName Me-Driver
 * @apiGroup Me
 *
 * @apiPermission driver
 *
 * @apiUse AuthHeader
 *
 * @apiSuccess (200) {String} _id Current user unique id
 * @apiSuccess (200) {String} username Current user username
 * @apiSuccess (200) {String} role User role
 * @apiSuccess (200) {Date} passwordLastChanged timestamp last password change
 * @apiSuccess (200) {String} [truck] Driver`s assigned truck _id
 * @apiSuccess (200) {String} [assignedLoad] Driver`s assigned load _id
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "role": "driver",
 *       "passwordLastChanged": "2020-04-08T12:37:06.692Z",
 *       "createdAt": "2020-04-08T12:37:06.692Z",
 *       "_id": "5e8dc5726c0040313c3cb6ee",
 *       "username": "Potato",
 *       "truck": "5e8ddf6bc0157f32f40ab292"
 *       "assignedLoad": "5e8ddf6bc0157f32f40ab293"
 *     }
 */

/**
 * @api {get} /api/me Shipper - Get logged shipper data
 *
 * @apiName Me-Shipper
 * @apiGroup Me
 *
 * @apiPermission driver
 *
 * @apiUse AuthHeader
 *
 * @apiSuccess (200) {String} _id Current user unique id
 * @apiSuccess (200) {String} username Current user username
 * @apiSuccess (200) {String} role User role
 * @apiSuccess (200) {Date} passwordLastChanged timestamp last password change
 * @apiSuccess (200) {Object[]} loads Shipper`s created loads
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "role": "shipper",
 *       "passwordLastChanged": "2020-04-08T12:37:06.692Z",
 *       "createdAt": "2020-04-08T12:37:06.692Z",
 *       "_id": "5e8dc5726c0040313c3cb13e",
 *       "username": "Banana",
 *       "loads": []
 *     }
 */
router.get('/', (req, res) => {
  res.json(req.user);
});

module.exports = router;

