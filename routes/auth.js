let express = require( 'express' );
let authController = require( '../controllers/authController' );
let router = express.Router();
let cors = require( 'cors' );
router.use( cors() );

router.get( '/', authController.auth_login_get );
router.post( '/login', authController.auth_login_post );

router.post( '/validate', authController.auth_validate_post );

router.post( '/update', authController.post_user_info_update );

router.get( '/signup', authController.auth_signup_get );
router.post( '/signup', authController.auth_signup_post );

module.exports = router;