import $$ from 'dom7';
import Framework7 from 'framework7/framework7.esm.bundle.js';

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
    // App root data
    data: function() {
        return {
            user: {
                firstName: 'John',
                lastName: 'Doe',
            },
            // Demo products for Catalog section
            products: [{
                    id: '1',
                    title: 'Apple iPhone 8',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis.'
                },
                {
                    id: '2',
                    title: 'Apple iPhone 8 Plus',
                    description: 'Velit odit autem modi saepe ratione totam minus, aperiam, labore quia provident temporibus quasi est ut aliquid blanditiis beatae suscipit odio vel! Nostrum porro sunt sint eveniet maiores, dolorem itaque!'
                },
                {
                    id: '3',
                    title: 'Apple iPhone X',
                    description: 'Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.'
                },
            ]
        };
    },
    // App root methods
    methods: {
        helloWorld: function() {
            alert('Hello World!');
        },
    },
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

        //Bij het laden van de formpage wordt deze code uitevoerd
        //Registreer user


        pageAfterIn: function(FormPage) {

            let username = document.getElementById("registerNaam");
            let password = document.getElementById("registerPassword");


            //Maak event listner aan van de register button 
            document.getElementById("btnRegister").addEventListener("click", function() {
             
                maakRequestBody("login");

                fetch(url, opties)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(responseData) {
                        // test status van de response        
                        if (responseData.status < 200 || responseData.status > 299) {
                            // login faalde, boodschap weergeven                  
                            console.log("api error");
                            // return, zodat de rest van de fetch niet verder uitgevoerd wordt
                            return;
                        }


                        // de verwerking van de data
                        var list = responseData.data;

                        if (Object.keys(list).length > 0) {
                            //Hier wilt zeggen dat de user bestaat, close de login
                            console.log("user bestaat");
                            alert("gelive een andere username in te geven , deze bestaat al");
                            
                        } else {
                            console.log("user bestaat niet");
                            //Roep api op met bewerking register
                            maakRequestBody("register");
                            //Doe een fetch
                            fetch(url, opties)
                                .then(function(response) {
                                    return response;
                                })
                                .then(function(responseData) {
                                    // test status van de response  

                                    if (responseData.status < 200 || responseData.status > 299) {
                                        // Register faalde, boodschap weergeven                  
                                        alert("fout");
                                        // return, zodat de rest van de fetch niet verder uitgevoerd wordt
                                        return;
                                    }
                                    alert(`user ${username.value} is succesvol aangemaakt`)
                                    //TODO: Hier moet nog navigatie naar homescherm komen             
                                })
                                .catch(function(error) {
                                    // verwerk de fout
                                    console.log("fout : " + error);
                                });
                                
                                //TODO: navigate naar homescherm
                        }
                    })
                    .catch(function(error) {
                        // verwerk de fout                        
                        console.log("fout : " + error);
                    });
            })

            //Functie om requestbody aan te maken voor de fetch.
            //Deze functie geeft als parameter de bewerking mee.
            function maakRequestBody(parBewerking) {
                opties.body = JSON.stringify({
                    format: "json",
                    table: "user",
                    bewerking: parBewerking,
                    username: username.value,
                    password: password.value,
                });
            }

        },
        /////////////////////////////////////////    
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


// url van de api
let url = "http://stevenbjones.azurewebsites.net/php/api.php";

//Maak eventListner aan voor onload pagina
window.addEventListener('load', function() {

    //Maak loginscreen aan 
    let loginScreen = app.loginScreen.create({
        content: `
    <div class="login-screen" id="my-login-screen">
      <div class="view">
        <div class="page">
          <div class="page-content login-screen-content">
            <div class="login-screen-title">Login</div>
            <div class="list">
              <ul>
                <li class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">Username</div>
                    <div class="item-input-wrap">
                      <input type="text" name="username" id="username" placeholder="Your username">
                    </div>
                  </div>
                </li>
                <li class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">Password</div>
                    <div class="item-input-wrap">
                      <input type="password" name="password" id="password" placeholder="Your password">
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="list">
              <ul>
                <li>
                  <a href="#" id="btnLogin" >Sign In</a>
                </li>
              </ul>
              <div class="block-footer" id="loginMsg" >Some text about login information.<br>Click "Sign In" to close Login Screen</div>             
            </div>
          </div>
        </div>
      </div>
    </div>
    `,
        on: {
            opened: function() {
                console.log('Login Screen opened')
            }
        }
    })

    //Open het gemaakte loginScreen
    loginScreen.open();


    //Haal waarden uit het formulier en steek in variabele
    let username = this.document.getElementById("username");
    let password = this.document.getElementById("password");
    let loginMsg = this.document.getElementById("loginMsg");

    //Event listner voor de login button
    this.document.getElementById("btnLogin").addEventListener("click", function() {

        if (username.value == "" || password.value == "") {
            console.log("Leeg username of leeg password");
            console.log(`naam : ${username.value} password: ${password.value}`);

            loginMsg.innerHTML = "username of password mag niet leeg zijn";
            return;
        }

        //Functie oproepen voor api login
        TestLogin();

        //Bij login neem project naam over om deze als tittel te zetten
        document.getElementById("titelHome").innerHTML = `Welkom ${username.value}`;
    })


        //Haal waarden uit het formulier en steek in variabele
        let projectname = this.document.getElementById("projectName");
   
        //Event listner voor de maak aan button
        this.document.getElementById("btnMakeProject").addEventListener("click", function() {
    
            if (projectname.value == "") {
                console.log("Leeg project naam");
                console.log(`naam : ${projectname.value}`);
    
                loginMsg.innerHTML = "username of password mag niet leeg zijn";
                return;
            }
        })

    //Functie om ingegeven login te testen, doet een get naar de databank
    function TestLogin() {
        console.log("testLoginFunctie");
        //REquest body

        opties.body = JSON.stringify({
            format: "json",
            table: "user",
            bewerking: "login",
            username: username.value,
            password: password.value,
        });

        //Doe een fetch
        fetch(url, opties)
            .then(function(response) {
                return response.json();
            })
            .then(function(responseData) {
                // test status van de response        
                if (responseData.status < 200 || responseData.status > 299) {
                    // login faalde, boodschap weergeven                  
                    MaakRegisterLink();
                    // return, zodat de rest van de fetch niet verder uitgevoerd wordt
                    return;
                }
                // de verwerking van de data
                var list = responseData.data;

                if (Object.keys(list).length > 0) {

                    //Hier wilt zeggen dat de user bestaat, close de login
                    loginScreen.close();
                } else {
                    MaakRegisterLink();
                }

            })
            .catch(function(error) {
                // verwerk de fout
                console.log("fout : " + error);
            });


        //Maak een register link als login fout is
        ///////////////////////////////////////////////////////////
        function MaakRegisterLink() {
            loginMsg.innerHTML = ` Login mislukt : deze naam/paswoord combinatie bestaat niet
            <a href="/form/"  id = "registerLink" class="item-content item-link">
            <div class="item-inner">
              <div class="item-title">Registreren</div>
            </div>`

            document.getElementById("registerLink").addEventListener("click", function() {
                loginScreen.close();
            })
        }

        console.log(`naam : ${username.value} password: ${password.value}`);
    }


})