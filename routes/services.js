var express 		= require('express');
var router 			= express.Router();
var auth 			= require('../middleware/auth');
var Controller 		= require('../controllers/service');

router.post('/',auth.ensureAuthenticated, auth.isDelivery, Controller.create);
router.get('/all', Controller.getAll);
router.get('/search', Controller.search);
router.get('/', Controller.get);
router.put('/', auth.ensureAuthenticated, auth.isDelivery, Controller.update);
router.delete('/', auth.ensureAuthenticated, auth.isDelivery, Controller.delete);


module.exports = router;