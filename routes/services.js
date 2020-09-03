var express 		= require('express');
var router 			= express.Router();
var auth 			= require('../middleware/auth');
var Controller 		= require('../controllers/service');
var Permission 		= require('../controllers/permission');

router.post('/',auth.ensureAuthenticated, auth.isDelivery, Controller.create);
router.get('/all', Controller.getAll);
router.get('/search', Controller.search);
router.get('/', Controller.get);
router.put('/', auth.ensureAuthenticated, auth.isDelivery, Controller.update);
router.delete('/', auth.ensureAuthenticated, auth.isDelivery, Controller.delete);

router.post('/permission', auth.ensureAuthenticated, auth.isDelivery, Permission.create);
router.get('/permission', auth.ensureAuthenticated, auth.isDelivery, Permission.get);
router.put('/permission', auth.ensureAuthenticated, auth.isDelivery, Permission.update);
router.delete('/permission', auth.ensureAuthenticated, auth.isDelivery, Permission.delete);


module.exports = router;