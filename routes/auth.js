let express = require( 'express' );
let authController = require( '../controllers/authController' );

let router = express.Router();

/**
 * login endpoints
 */
router.get( '/', authController.auth_login_get );
router.post( '/login', authController.auth_login_post );

/**
 * signup endpoints
 */
router.get( '/signup', authController.auth_signup_get );
router.post( '/signup', authController.auth_signup_post );

module.exports = router;