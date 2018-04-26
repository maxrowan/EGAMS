let express = require( 'express' );
let adminController = require( '../controllers/adminController' );
let router = express.Router();
let cors = require( 'cors' );
router.use( cors() );

/**
 * route prefix is /admin
 */

/**
 * login
 */
router.get( '/', adminController.get_login );
router.post( '/login', adminController.post_login );

/**
 * create account
 */
router.get( '/createAccount', adminController.get_create_account );
router.post( '/createAccount', adminController.post_create_account );

/**
 * home
 */
router.get( '/home', adminController.get_home );

/**
 * find user
 */
router.get( '/userSearch', adminController.get_find_user );
router.post( '/userSearch', adminController.post_find_user );

/**
 * view user info
 */
router.get( '/user', adminController.get_user_info );
router.post( '/userInfo', adminController.post_user_info );

/**
 * suspend user account
 */
router.post( '/suspend', adminController.post_suspend );

/**
 * disputes
 */
router.get( '/billDisputes', adminController.get_disputes );
router.post( '/disputes', adminController.post_disputes );

/**
 * feedback
 */
router.get( '/feedback', adminController.get_feedback );
router.post( '/feedback', adminController.post_feedback );
router.get( '/message', adminController.get_message );

module.exports = router;
