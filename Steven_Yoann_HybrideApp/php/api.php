<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

//Variabelen ophalen
$body = file_get_contents('php://input');
$postvars = json_decode($body, true);
$id = $postvars["id"];
$table = $postvars["table"];
$bewerking = $postvars["bewerking"];

$username = $postvars["naam"];
$password = $postvars["paswoord"]

//Nakijken of de waarden bewerking en table correct zijn
if (isset($bewerking) && isset($table)) {
    if($table !== 'user' ){
        // table mag enkel 1 van deze 2 zijn
        die('{"error":"wrong table","status":"fail"}');
    }
} 

//Haal de connectie uit de andere php file
require "dbcon.php";

//Controleer de connectie
if (!$conn) {
    die('{"error":"Connection failed","mysqlError":"' . json_encode($conn -> error) .'","status":"fail"}');
}

if($bewerking =="get"){
    if(!($stmt = $conn -> prepare(`select * from ${$table} where naam like ${username} and paswoord like ${password}`))){
        die('{"error":"Prepared Statement failed","errNo":"' . json_encode($conn -> errno) .'",mysqlError":"' . json_encode($conn -> error) .'","status":"fail"}');
}

if(!$stmt -> execute()){
    die('{"error":"Prepared Statement execute failed","errNo":"' . json_encode($conn -> errno) .'",mysqlError":"' . json_encode($conn -> error) .'","status":"fail"}');
}

$result = $stmt->get_result();

 // maak van de inhoud van deze result een json object waarvan
        // ook in android de juiste gegeventypes herkend worden
        $return = getJsonObjFromResult($result);
        // maak geheugenresources vrij :
        mysqli_free_result($result);
        // sluit het prepared statement
        $stmt -> close();
        // return het resultaat
        die($return);




        function getJsonObjFromResult(&$result){
            // de & voor de parameter zorgt er voor dat we de de parameter
            // by reference doorgeven, waardoor deze niet gekopieerd word
            // naar een nieuwe variabele voor deze functie.
        
            $fixed = array();
            
            $typeArray = array(
                            MYSQLI_TYPE_TINY, MYSQLI_TYPE_SHORT, MYSQLI_TYPE_INT24,    
                            MYSQLI_TYPE_LONG, MYSQLI_TYPE_LONGLONG,
                            MYSQLI_TYPE_DECIMAL, 
                            MYSQLI_TYPE_FLOAT, MYSQLI_TYPE_DOUBLE );
            $fieldList = array();
            // haal de veldinformatie van de velden in deze resultset op
            while($info = $result->fetch_field()){
                $fieldList[] = $info;
            }
            // haal de data uit de result en pas deze aan als het veld een
            // getaltype zou moeten bevatten
            while ($row = $result -> fetch_assoc()) {
                $fixedRow = array();
                $teller = 0;
        
                foreach ($row as $key => $value) {
                    if (in_array($fieldList[$teller] -> type, $typeArray )) {
                        $fixedRow[$key] = 0 + $value;
                    } else {
                        $fixedRow[$key] = $value;
                    }
                    $teller++;
                }
                $fixed[] = $fixedRow;
            }
        
            // geef een json object terug
            return '{"data":'.json_encode($fixed).',"status":"ok"}';
        }
?>