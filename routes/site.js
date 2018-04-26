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
router.post( '/make_payment', siteController.post_make_payment );
router.post( '/dispute_payment', siteController.post_dispute_payment );

/**
 * pickup
 */
router.get( '/pickup', siteController.get_pickup );

/**
 * feedback
 */
router.get( '/feedback', siteController.get_feedback );
router.post( '/submit_feedback', siteController.post_feedback );

module.exports = router;