let express = require( 'express' );
let siteController = require( '../controllers/siteController' );
let router = express.Router();
let cors = require( 'cors' );
router.use( cors() );

/**
 * get homepage
 */
router.get( '/', siteController.get_homepage );

/**
 * profile
 */
router.get( '/profile', siteController.get_profile );

/**
 * payments
 */
router.get( '/payments', siteController.get_payments );
router.post( '/payments', siteController.post_payments );

/**
 * pickup
 */
router.get( '/pickup', siteController.get_pickup );

/**
 * feedback
 */
router.get( '/feedback', siteController.get_feedback );

module.exports = router;