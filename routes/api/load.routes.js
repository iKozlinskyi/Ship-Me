const {SHIPPER, DRIVER} = require('../../constants/userRoles');
const loadService = require('../../service/LoadService');
const express = require('express');
const {
  USER_LACKS_AUTHORITY,
  WRONG_ID_FORMAT,
} = require('../../constants/errors');
const requireRole = require('../middleware/requireUserRole');
const validateGetLoads = require('../validation/load/getLoads');
const validateCreateOrEditLoad =
  require('../validation/load/validateCreateOrEditLoad');
const {isValidObjectId} = require('../../utils/isValidObjectId');
const HttpError = require('../../utils/HttpError');
const router = express.Router();
const {
  LOAD_STATE_CHANGED,
  LOAD_CREATED,
  SUCCESS,
  LOAD_POSTED,
  NO_DRIVERS_FOUND,
  LOAD_EDITED,
} = require('../../constants/responseStatuses');

/**
 * @apiDefine WrongRequestFormat
 *
 * @apiError (400) WrongRequestFormat Request payload has wrong format
 */

/**
 * @apiDefine LoadNotFound
 *
 * @apiError (404) LoadNotFound Cannot find load with given <code>id</code>
 */

/**
 * @apiDefine NoPermission
 *
 * @apiError (401) NoPermission User lacks permission
 */


router.param('id', async (req, res, next) => {
  const {id} = req.params;
  if (!isValidObjectId(id)) {
    return next(new HttpError(404, WRONG_ID_FORMAT));
  }
  const shipper = req.user;

  try {
    req.load = await loadService.findById(id);
    if (!loadService.hasUserAuthorityForLoad(shipper, req.load)) {
      return res.status(403).json({error: USER_LACKS_AUTHORITY});
    }
    next();
  } catch (err) {
    return next(err);
  }
});

/**
 * @api {get} api/loads Retrieve list of loads (for this shipper).
 * @apiName GetLoads
 * @apiGroup Load
 * @apiParam {Number} [pageNo=1] Page number (used for pagination of results)
 * @apiParam {Number} [size] Number of results per page
 * @apiParam {String} [state] Load state
 *
 * @apiSuccess (200) {String} status response status.
 * @apiSuccess (200) {Object[]} loads Loads created by current Shipper.
 * @apiSuccess (200) {String} load._id load unique id
 * @apiSuccess (200) {String} load.assigned_to unique id of
 * driver who has this load assigned
 * @apiSuccess (200) {String} load.created_by unique id of
 * shipper who created this load
 * @apiSuccess (200) {String} load.status load status
 * @apiSuccess (200) {String} load.state load state
 * @apiSuccess (200) {Number} load.payload load payload
 * @apiSuccess (200) {Object} load.dimensions load dimensions object
 * @apiSuccess (200) {Number} load.dimensions.width load width
 * @apiSuccess (200) {Number} load.dimensions.height load height
 * @apiSuccess (200) {Number} load.dimensions.length load length
 * @apiSuccess (200) {Object[]} logs array of history logs
 * @apiSuccess (200) {String} log.message log message
 * @apiSuccess (200) {Number} log.time log timestamp
 */
router.get('/', validateGetLoads, async (req, res, next) => {
  const match = {
    status: req.query.status,
  };

  const pageNo = parseInt(req.query.pageNo) || 1;
  const size = parseInt(req.query.size) || 0;
  const options = {
    limit: size,
    skip: size * (pageNo - 1),
  };
  try {
    const loadEntityList =
      await loadService.getLoadsForRole(req.user, match, options);
    const loadResponseDtoList =
      loadService.convertEntityListToResponseDtoList(loadEntityList);

    res.json({status: SUCCESS, loads: loadResponseDtoList});
  } catch (err) {
    next(err);
  }
});

/**
 * @api {get} api/loads/:id Retrieve load by id
 * @apiName GetLoadById
 * @apiGroup Load
 * @apiParam {Number} id Load unique id
 *
 * @apiSuccess (200) {String} status response status.
 * @apiSuccess (200) {Object} load Load with given id
 * @apiSuccess (200) {String} load._id load unique id
 * @apiSuccess (200) {String} load.assigned_to unique id of
 * driver who has this load assigned
 * @apiSuccess (200) {String} load.created_by unique id of
 * shipper who created this load
 * @apiSuccess (200) {String} load.status load status
 * @apiSuccess (200) {String} load.state load state
 * @apiSuccess (200) {Number} load.payload load payload
 * @apiSuccess (200) {Object} load.dimensions load dimensions object
 * @apiSuccess (200) {Number} load.dimensions.width load width
 * @apiSuccess (200) {Number} load.dimensions.height load height
 * @apiSuccess (200) {Number} load.dimensions.length load length
 * @apiSuccess (200) {Object[]} logs array of history logs
 * @apiSuccess (200) {String} log.message log message
 * @apiSuccess (200) {Number} log.time log timestamp

 *
 * @apiUse LoadNotFound
 * @apiUse NoPermission
 */
router.get('/:id', async (req, res) => {
  const loadResponseDto =
    loadService.convertLoadEntityToLoadResponseDto(req.load);

  res.json({status: SUCCESS, load: loadResponseDto});
});

router.post('/',
    requireRole(SHIPPER),
    validateCreateOrEditLoad,
    async (req, res, next) => {
      const load = {
        ...req.body,
        createdBy: req.user._id,
      };

      try {
        await loadService.createLoad(load);
        res.json({status: LOAD_CREATED});
      } catch (err) {
        return next(err);
      }
    });

/**
 * @api {delete} api/loads/:id Delete load with given id
 * @apiName DeleteLoadById
 * @apiGroup Load
 * @apiParam {Number} id Load unique id
 *
 * (200) @apiSuccess {String} status response status
 *
 * @apiUse LoadNotFound
 * @apiUse NoPermission
 */
router.delete('/:id', async (req, res, next) => {
  try {
    await loadService.remove(req.load);
    res.json({status: 'Load successfully removed'});
  } catch (err) {
    return next(err);
  }
});

/**
 * @api {put} api/loads/:id Edit load
 * @apiName EditLoad
 * @apiGroup Load
 * @apiParam {Number} load.payload load payload
 * @apiParam {Object} load.dimensions load dimensions object
 * @apiParam {Number} load.dimensions.width load width
 * @apiParam {Number} load.dimensions.height load height
 * @apiParam {Number} load.dimensions.length load length
 *
 * @apiSuccess (200) {String} status response status
 *
 * @apiUse WrongRequestFormat
 * @apiUse LoadNotFound
 * @apiUse NoPermission
 */
router.put('/:id',
    validateCreateOrEditLoad,
    async (req, res, next) => {
      const load = req.load;
      const editedLoadData = req.body;

      try {
        await loadService.update(load, editedLoadData);

        res.status(200).json({status: LOAD_EDITED});
      } catch (err) {
        return next(err);
      }
    });

router.patch('/:id/state',
    requireRole(DRIVER),
    async (req, res, next) => {
      const load = req.load;
      try {
        await loadService.performLoadStateChange(load);

        res.json({status: LOAD_STATE_CHANGED});
      } catch (err) {
        return next(err);
      }
    });

router.post('/:id/post', requireRole(SHIPPER), async (req, res, next) => {
  const {id} = req.params;

  try {
    const postedLoad = await loadService.postLoadById(id);
    if (!!postedLoad.assignedTo) {
      return res.json({
        status: LOAD_POSTED,
        assigned_to: postedLoad.assignedTo,
      });
    }

    res.json({status: NO_DRIVERS_FOUND});
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
