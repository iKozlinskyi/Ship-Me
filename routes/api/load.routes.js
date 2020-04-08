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
} = require('../../constants/responseStatuses');

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

router.delete('/:id', async (req, res, next) => {
  try {
    await loadService.remove(req.load);
    res.json({status: 'Load successfully removed'});
  } catch (err) {
    return next(err);
  }
});

router.put('/:id',
    validateCreateOrEditLoad,
    async (req, res, next) => {
      const load = req.load;
      const editedLoadData = req.body;

      try {
        const editedLoad = await loadService.update(load, editedLoadData);

        res.status(200).json(editedLoad);
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
