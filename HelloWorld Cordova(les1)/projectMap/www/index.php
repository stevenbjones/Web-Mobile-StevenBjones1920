<!DOCTYPE html>
<!--
    Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements.  See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership.  The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); you may not use this file except in compliance
    with the License.  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
     KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.
-->
<html>
    <head>
        <!--
        Customize this policy to fit your own app's needs. For more guidance, see:
            https://github.com/apache/cordova-plugin-whitelist/blob/master/README.md#content-security-policy
        Some notes:
            * gap: is required only on iOS (when using UIWebView) and is needed for JS->native communication
            * https://ssl.gstatic.com is required only on Android and is needed for TalkBack to function properly
            * Disables use of inline scripts in order to mitigate risk of XSS vulnerabilities. To change this:
                * Enable inline JS: add 'unsafe-inline' to default-src
        -->
        <meta name="format-detection" content="telephone=no">
        <meta name="msapplication-tap-highlight" content="no">
        <meta name="viewport" content="initial-scale=1, width=device-width, viewport-fit=cover">
        <link rel="stylesheet" type="text/css" href="css/index.css">
        <title>Hello World</title>
    </head>
    <style>
    .rij{
        clear:both;
        float:left;
        margin-left:0.25em;
        margin-right:0.25em;
    }
    .kolom1, .kolom3{
        display:inline-block;
        width: 3em;
        background-color:lightgrey;
    }
    .kolom2{
        display:inline-block;
        width: 15em;
        background-color:darkgrey;
    }
    
    </style>
    
    <body>
        <div class="app">
            <h1>HEllo world2</h1>
            i'm cool
        </div>

    <?php
    // een verbinding leggen met de databank
    $servername = "127.0.0.1:51526";
    $username = "azure";// dangerous
    $password = "6#vWHD_$";// dangerous
    $dbname = "mi3";// standaard test databank

    $conn = mysqli_connect($servername, $username, $password, $dbname) or die(mysqli_connect_error());

    function fetchData($sql, $conn){
        // $sql is een string met een SQL query
        // $conn is het object met de verbinding naar de databank
        $return = array();
        if (!$conn) {
            die("Geen databank verbinding");
        } else {
            $result = $conn -> query($sql); // voer de query uit en stop het resultaat in $result
            while ($row = $result -> fetch_assoc()) {
                // loop door alle resultaatrijen en plaats die in de array $return
                // die als returnwaarde wordt teruggegeven.
                // Iedere nieuwe $row wordt op de laatste positie + 1 gestopt 
                $return[count($return)] = $row;
            }
        }
        return $return; // return de array
    }
       
    
    //"SELECT producten.id, producten.Omschrijving, producten.prijs, categorieën.naam FROM producten INNER JOIN categorieën on producten.id = categorieën.id "

    $resultaat = fetchData("SELECT * FROM producten ", $conn);
    
    
    
    for($i = 0 ; $i < count($resultaat) ; $i++){
        // loop door ieder item van de $resultaat array, haal de gewenste info er uit en toon 
        // deze in de vorm van html. In dit geval ingedeeld met spans.
        echo "<span class='rij'><span class='kolom1'>". $resultaat[$i]["id"] ."</span><span class='kolom2'>".$resultaat[$i]["Omschrijving"]."</span><span class='kolom3'>".$resultaat[$i]["prijs"]. "</span>";
    }
    

    ?>


        <script type="text/javascript" src="cordova.js"></script>
        <script type="text/javascript" src="js/index.js"></script>
    </body>
</html>
