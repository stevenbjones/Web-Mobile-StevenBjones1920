<html>
<body>
    <h1>
        test
<?php

    // een verbinding leggen met de databank
$servername = "127.0.0.1:51526";
$username = "azure";// dangerous
$password = "6#vWHD_$";// dangerous
$dbname = "mi3";// standaard test databank

//
// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname) or die(mysqli_connect_error());
$omschrijving = $_GET["Omschrijving"];
$prijs = $_GET["prijs"];

$sql = "INSERT INTO producten (Omschrijving, prijs)
VALUES ('$omschrijving',$prijs)";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
    echo $_GET["Omschrijving"];
    echo $_GET["prijs"];
?>
    </h1>
</body>
</html>