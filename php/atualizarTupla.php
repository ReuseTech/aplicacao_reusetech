<?php
    session_start();
    isset($_SESSION["user"]) or header("location:./login.php");

    include("Inserter.php");
    
    $inserter = new Inserter("../api/cache/tabelas/" . $_GET['table'] . ".json");

    $updateTupleQuery = $inserter->createUpdateQueryById($_GET['id']);
    $inserter->insert($updateTupleQuery);

    header("location:../pages/certo.html");
?>