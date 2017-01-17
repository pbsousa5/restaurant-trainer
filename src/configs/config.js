/**
 * Global App Config
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
'use strict';

import Dimensions from 'Dimensions';
var window = Dimensions.get('window');

/* Setup ==================================================================== */
exports.title = 'GlobalConfig';

export default {
	// App Details
	appName: 'Service-Trainer',
	//snooth api url
	wineSearch: 'http://api.snooth.com/wines/?akey=kt9p890es3nxsgkbyipbvv475j44g0gdgk7na9hl6mibcrwm&q=',
	wineDetails: 'http://api.snooth.com/wine/?akey=kt9p890es3nxsgkbyipbvv475j44g0gdgk7na9hl6mibcrwm&id=',
	// Window Dimensions
	windowHeight: window.height,
	windowWidth: window.width,

	// Grid
	windowWidthHalf: window.width * 0.5,
	windowWidthYhird: window.width * 0.333,
	windowWidthYwoThirds: window.width * 0.666,
	windowWidthQuarter: window.width * 0.25,
	windowWidthThreeQuarters: window.width * 0.75,

	// General Element Dimensions
	navbarHeight: 64,
	statusBarHeight: 22,

	// Google Analytics - uses a 'dev' account while we're testing
  gaTrackingId: (__DEV__) ? 'UA-84284256-2' : 'UA-84284256-1',

	// Fonts
	baseFont: "Avenir",
	baseFontSize: 14,

	// Colors
	primaryColor: "#FFB333",
	secondaryColor: "#FFE229",
	whiteColor: "#ffffff",
	greyBack: "#393e42",//303337 //404040 //393e42
	lightGrey: "#ddd",
	menuColor: "#2d2d2d",
	secondaryTextColor: "#e7e7e7",
	textColor: "#555",
	whiteText: "#f6f5f3",
	borderColor: "#E7E7E7",
	greyGradient: ['#606466', '#393e42', '#182930'],
}