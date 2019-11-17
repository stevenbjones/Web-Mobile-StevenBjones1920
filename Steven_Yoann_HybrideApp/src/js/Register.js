import $$ from 'dom7';
import Framework7 from 'framework7/framework7.esm.bundle.js';

import Utils from './js/register.js';

// Import F7 Styles
import 'framework7/css/framework7.bundle.css';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.less';
// Import Cordova APIs
import cordovaApp from './cordova-app.js';
// Import Routes
import routes from './routes.js';

var app = new Framework7({
    root: '#app', // App root element
    id: 'io.framework7.Steven_Yoann_HybrideApp', // App bundle ID
    name: 'Steven_Yoann_HybrideApp', // App name
    theme: 'auto', // Automatic theme detection  
    
    // App routes
    routes: routes,


    // Input settings
    input: {
        scrollIntoViewOnFocus: Framework7.device.cordova && !Framework7.device.electron,
        scrollIntoViewCentered: Framework7.device.cordova && !Framework7.device.electron,
    },
    // Cordova Statusbar settings
    statusbar: {
        iosOverlaysWebView: true,
        androidOverlaysWebView: false,
    },
    on: {
        init: function() {
            var f7 = this;
            if (f7.device.cordova) {
                // Init cordova APIs (see cordova-app.js)
                cordovaApp.init(f7);
            }
        },
    },
});

//Request opties
let opties = {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "omit", // include, *same-origin, omit
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
};

window.addEventListener('load',function(){alert("test");});
// url van de api
let url = "http://stevenbjones.azurewebsites.net/php/api.php";

document.querySelector("#btnRegister").addEventListener("click", function(){
alert("test");
})