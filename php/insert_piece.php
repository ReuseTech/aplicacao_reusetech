<?php
    session_start();
    isset($_SESSION["user"]) or header("location:./login.php");

    include("Inserter.php");
    
    $inserter = new Inserter("../api/cache/tabelas/" . $_GET['table'] . ".json");
    
    $insertPieceQuery = $inserter->createInsertQuery();
    $inserter->insert($insertPieceQuery);
    
    if(isset($_POST['busesIds']) != null) {
        $insertBusesQueries = $inserter->createBusesInsertQueries($_POST['busesIds']);
        foreach($insertBusesQueries as $busQuery) {
            $inserter->insert($busQuery);
        }
    }

    header("location:../pages/certo.html");
?>