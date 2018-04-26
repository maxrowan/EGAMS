let createError = require( 'http-errors' );
let express = require( 'express' );
let path = require( 'path' );
let cookieParser = require( 'cookie-parser' );
let logger = require( 'morgan' );

let fs = require( 'fs' );
let hbs = require( 'hbs' );

let authRouter = require( './routes/auth' );
let homepageRouter = require( './routes/site' );
let adminRouter = require( './routes/admin' );

let app = express();

// register partials with handlebars
hbs.registerPartial( 'validateModal', fs.readFileSync( __dirname + '/views/partials/validateModal.hbs', 'utf8' ));
hbs.registerPartial( 'feedbackModal', fs.readFileSync( __dirname + '/views/partials/feedbackModal.hbs', 'utf8' ));
hbs.registerPartials(__dirname + '/views/partials' );

// view engine setup
app.set( 'views', path.join( __dirname, '/views' ) );
app.set( 'view engine', 'hbs' );

app.use( logger( 'dev' ) );
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );
app.use( cookieParser() );
app.use( express.static( path.join( __dirname, 'public' ) ) );

app.use( '/', authRouter );
app.use( '/site', homepageRouter );
app.use( '/admin', adminRouter );

// catch 404 and forward to error handler
app.use( function ( req, res, next ) {
	next( createError( 404 ) );
} );

// error handler
app.use( function ( err, req, res ) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get( 'env' ) === 'development' ? err : {};

	// render the error page
	res.status( err.status || 500 );
	res.render( 'error' );
} );

module.exports = app;
