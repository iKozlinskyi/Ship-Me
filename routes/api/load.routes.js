const loadService = require('../../service/LoadService');
const express = require('express');
const {USER_LACKS_AUTHORITY} = require('../../constants/errors');
const {NEW} = require('../../constants/loadStatuses');
const router = express.Router();

router.param('loadId', async (req, res, next) => {
  const {loadId} = req.params;
  const shipper = req.user;

  try {
    req.load = await loadService.findById(loadId);
    if (!loadService.hasUserAuthorityForLoad(shipper, req.load)) {
      return res.status(403).json({error: USER_LACKS_AUTHORITY});
    }
    next();
  } catch (err) {
    return next(err);
  }
});

router.get('/', async (req, res) => {
  const userId = req.user._id;
  const loads = await loadService.findByCreatedUserId(userId);

  res.json({loads});
});

router.get('/:loadId', async (req, res) => {
  res.json({load: req.load});
});

router.post('/', async (req, res, next) => {
  const load = {
    ...req.body,
    createdBy: req.user._id,
    status: NEW,
  };

  try {
    const savedLoad = await loadService.processNewLoad(load);

    res.status(201).json(savedLoad);
  } catch (err) {
    return next(err);
  }
});

router.delete('/:loadId', async (req, res, next) => {
  try {
    await loadService.remove(req.load);
    res.json({status: 'Load successfully removed'});
  } catch (err) {
    return next(err);
  }
});

router.put('/:loadId', async (req, res, next) => {
  const load = req.load;
  const editedLoadData = req.body;

  try {
    const editedLoad = await loadService.update(load, editedLoadData);

    res.status(200).json(editedLoad);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
