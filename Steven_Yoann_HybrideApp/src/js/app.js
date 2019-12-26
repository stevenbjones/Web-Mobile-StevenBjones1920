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


var ingelogdeUser = null;

// url van de api
var url = "http://stevenbjones.azurewebsites.net/php/api.php";
var loginScreen;

var app = new Framework7({
    root: '#app', // App root element
    id: 'io.framework7.Steven_Yoann_HybrideApp', // App bundle ID
    name: 'Steven_Yoann_HybrideApp', // App name
    theme: 'auto', // Automatic theme detection
    // App root data
    data: function() {
        return {
            ingelogd: false,

            //Deze waarden gebruiken we niet meer.
            //Later mss nog te implementeren
            projects: {
                id: [],
                naam: [],
                tijd: [],
                usr_id: [],
            },
            ingelogdeUser: {}

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

        // Deze functie werkt niet 
        pageBeforeIn: function(page) {
            if (page.route.name == "home") {

            }
            console.log(page.route.name);
            if (!page.route.name || page.route.name !== "home") {
                console.log(page.route.name);
                //Controle of user ingelogd is --> zo niet  redirect naar home
                if (ingelogdeUser == null) {
                    /*app.router.navigate(app.views.main.router.url, {
                        reloadCurrent: true
                    });
                    
                    location.reload(); */

                }

            }


        },
        pageAfterIn: function(FormPage) {

            console.log(`Dit is de globale variable : ${app.data.ingelogd}`)
            console.log(ingelogdeUser);
            let username = document.getElementById("registerNaam");
            let password = document.getElementById("registerPassword");


            //Maak event listner aan van de register button 
            document.getElementById("btnRegister").addEventListener("click", function() {

                maakRequestBody("validatieLogin");

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
                        console.log(list);

                        if (Object.keys(list).length > 0) {
                            //Hier wilt zeggen dat de user bestaat, close de login
                            console.log("user bestaat");
                            console.log(responseData);
                            app.dialog.alert(`Gelieve een andere username in te geven , deze bestaat al`, "Error: register");
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
                                        app.dialog.alert(`fout`, "Error: register");
                                        // return, zodat de rest van de fetch niet verder uitgevoerd wordt
                                        return;
                                    }
                                    app.dialog.alert(`user ${username.value} is succesvol aangemaakt`, "Register succes");    
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
var opties = {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "omit", // include, *same-origin, omit
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
};


console.log(url);
//Maak eventListner aan voor onload pagina
window.addEventListener('load', function() {

    //TODO:
    //Is user al ingelogd --> local storage
    //Usernaam / bool

    //Maak loginscreen aan 
    loginScreen = app.loginScreen.create({
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


    let projectname = this.document.getElementById("projectName");

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

    })


    //Functie om ingegeven login te testen, doet een get naar de databank
    function TestLogin() {
        console.log("testLoginFunctie");
        //REquest body

        opties.body = JSON.stringify({
            format: "json",
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
                console.log(list);
                ingelogdeUser = responseData.data[0];



                if (Object.keys(list).length > 0) {

                    haalProjectVanIngelogdeUser();
                    //Hier wilt zeggen dat de user bestaat, close de login

                    //Geef welkom bericht aan de user
                    document.getElementById("titelHome").innerHTML = `Welkom ${ingelogdeUser["naam"]}`;
                    //Sluit login scherm
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

    //Haal projecten op met het ingelogde userID
    function haalProjectVanIngelogdeUser() {

        //request options voor fetch
        opties.body = JSON.stringify({
            format: "json",
            bewerking: "getUserProjects",
            userID: ingelogdeUser["id"],
        });
        //Doe een fetch
        fetch(url, opties)
            .then(function(response) {
                return response.json();
            })
            .then(function(responseData) {
                // test status van de response        
                if (responseData.status < 200 || responseData.status > 299) {
                    return;
                }

                // de verwerking van de data
                var list = responseData.data;
                console.log("lijst:");
                console.log(list);

                let tlines = "<table>";
                tlines += `<tr> <th>ID</th><th>Project Naam</th><th>Tijd</th><th>User ID</th></tr>`
                //Maak html objecten aan voor de data van de projecten
                for (let i = 0; i < list.length; i++) {
                    tlines += `<tr> <td>${list[i].id}</td> <td>${ list[i].naam}</td> <td>${ list[i].tijd}</td><td>${ list[i].usr_id}</td> <td><button id=btnDelete${i}> Verwijder</button></td> <td><button id=btnStartStop${i}> <i class="f7-icons size-25" id=icon${i} >play</i> </button></td> </tr>  `;
                }
                //Steek in een div van page catalog de projecten.
                document.getElementById("pList").innerHTML = tlines;

                //Maak een eventListner click voor elke button. Deze button delete het project
                for (let i = 0; i < list.length; i++) {
                    document.getElementById(`btnDelete${i}`).addEventListener('click', function() {
                        DeleteProject(list[i].id)
                    });

                    document.getElementById(`btnStartStop${i}`).addEventListener('click', function() {
                        StartStopProject(list[i].id, list[i].tijd,i)
                    })

                }
                /*
                    //Deze code is nu niet meer nodig omdat we niet met de app data werken. Mss komt dit nog terug
                   for (i = 0; i < list.length; i++) {
                    app.data.projects["id"][i] = list[i]["id"];
                    app.data.projects["naam"][i]= list[i]["naam"];
                    app.data.projects["tijd"][i]= list[i]["tijd"];
                    app.data.projects["usr_id"][i]= list[i]["usr_id"];
                   }
                 */
            })
            .catch(function(error) {
                // verwerk de fout
                console.log("fout : " + error);
            });


        console.log("het data object :");
        console.log(app.data.projects);
    }

    //Functie die aan de button wordt gegeven. Deze ontvangt de project index.
    function DeleteProject(index) {

        opties.body = JSON.stringify({
            format: "json",
            bewerking: "DeleteProject",
            projectID: index,
        });

        //Doe een fetch
        fetch(url, opties)
            .then(function(response) {
                return response;
            })
            .then(function(responseData) {
                // test status van de response  

                if (responseData.status < 200 || responseData.status > 299) {
                    // Register faalde, boodschap weergeven 
                    app.dialog.alert(`fout`, "Error: register");
                    // return, zodat de rest van de fetch niet verder uitgevoerd wordt
                    return;
                }
                app.dialog.alert(`project ${projectname.value} is succesvol gedelete`, "Delete succes");                
                haalProjectVanIngelogdeUser();
                //TODO: Hier moet nog navigatie naar homescherm komen             
            })
            .catch(function(error) {
                // verwerk de fout
                console.log("fout : " + error);
            });
    }

    //Start stop functie
    //Variabelen die gebruikt worden voor de start stop functie
    //We gaan deze variabelen gebruiken als een Dictionary 
    let start = new Object();
    let beginTijd = new Object();


    function StartStopProject(index, projectTijd, iconId) {
        let eindTijd;

        //Als de index(projectID) al bestaat in de dictionary wilt dit zeggen dat het de stop functie is.
        //Test of de waarde al bestaat. Als het de stop functie is wordt deze waarde op het einde terug naar undefined gezet.
        if (start[index]) {
            start[index] = false;
            app.dialog.alert(`De time management van het project ${index} wordt geëindigd`, "Einde");
        } else {
            start[index] = true;
            app.dialog.alert(`De time management van het project ${index} wordt gestart`, "Start");          
            document.getElementById(`icon${iconId}`).innerHTML = "pause";
        }


        opties.body = JSON.stringify({
            format: "json",
            bewerking: "getTime",
            projectID: index
        });

        //Doe een fetch
        fetch(url, opties)
            .then(function(response) {
                return response.json();
            })
            .then(function(responseData) {
                // test status van de response  

                if (responseData.status < 200 || responseData.status > 299) {                   
                    return;
                }

                //Bepaal hier of je begin of eind tijd wilt vullen.
                //Als bool true is overwrite de begintijd
                if (start[index]) {
                    beginTijd[index] = new Date(responseData.data[0].CURRENT_TIMESTAMP);
                }
                if (!start[index]) {
                    eindTijd = new Date(responseData.data[0].CURRENT_TIMESTAMP);
                    start[index] = undefined;
                }
                console.log(responseData.data[0].CURRENT_TIMESTAMP);

                //Als beide waarden ingevuld zijn maak je een verschil van de 2.

                if (beginTijd[index] && eindTijd) {
                    let tijdGewerktAanProject = (((eindTijd - beginTijd[index]) / 1000));
                    tijdGewerktAanProject.toFixed(2);

                    //Als deze variabele null is schrijf je 0. Dit is om += te kunnen uitvoeren
                    if (projectTijd == null) {
                        projectTijd = 0;
                    }

                    //Doe de huidige projecttijd += de nieuwe gemeten tijd
                    console.log(tijdGewerktAanProject.toFixed(2));
                    projectTijd += parseInt(tijdGewerktAanProject.toFixed(2));

                    //Methode die waarden in databank steekt.
                    AddGewerkteTijdAanProject(projectTijd, index);
                }
            })
            .catch(function(error) {
                // verwerk de fout
                console.log("fout : " + error);
            });

    }

    //Methode om de gewerkte tijd in databank te steken. Deze heeft 2 parameters.
    //TijdGewerktAanProject is de som van de oude tijd en de nieuwe.
    //Index is het projectID
    function AddGewerkteTijdAanProject(tijdGewerktAanProject, index) {

        opties.body = JSON.stringify({
            format: "json",
            bewerking: "registerTijd",
            projectID: index,
            projectTijd: tijdGewerktAanProject
        });

        //Doe een fetch
        fetch(url, opties)
            .then(function(response) {
                return response;
            })
            .then(function(responseData) {
                // test status van de response  

                if (responseData.status < 200 || responseData.status > 299) {
                    // Update faalde, boodschap weergeven                  
                    app.dialog.alert(`De tijd is niet geupdate`, "Error: update tijd");
            
                    // return, zodat de rest van de fetch niet verder uitgevoerd wordt
                    return;
                }
                
                app.dialog.alert(`project ${index} is succesvol aangepast`, "Update succes");
                haalProjectVanIngelogdeUser();
            })
            .catch(function(error) {
                // verwerk de fout
                console.log("fout : " + error);
            });
    }


    //Event listner voor de maak project button
    this.document.getElementById("btnMakeProject").addEventListener("click", function() {

        if (projectname.value == "") {
            
            app.dialog.alert(`Gelieve een project in te vullen`, "Error: leeg project");  
            console.log(`naam : ${projectname.value}`);
            console.log(ingelogdeUser["id"]);
            return;
        }

        console.log(projectname.value);

        opties.body = JSON.stringify({
            format: "json",
            bewerking: "registerProject",
            projectname: projectname.value,
            userID: (ingelogdeUser["id"]),
        });

        //Doe een fetch
        fetch(url, opties)
            .then(function(response) {
                return response;
            })
            .then(function(responseData) {
                // test status van de response  

                if (responseData.status < 200 || responseData.status > 299) {
                    // Register faalde, boodschap weergeven                  
                    app.dialog.alert(`project ${projectname.value} is niet aangemaakt`, "Error: register project");
                    // return, zodat de rest van de fetch niet verder uitgevoerd wordt
                    return;
                }
                app.dialog.alert(`project ${projectname.value} is succesvol aangemaakt`, "Register succes");
                haalProjectVanIngelogdeUser();
                //TODO: Hier moet nog navigatie naar homescherm komen             
            })
            .catch(function(error) {
                // verwerk de fout
                console.log("fout : " + error);
            });

        //TODO: navigate naar homescherm

    })

})