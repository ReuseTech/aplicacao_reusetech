<?php
    session_start();
    isset($_SESSION["user"]) or header("location:./login.php");

    include("Inserter.php");

    $inserter = new Inserter("../api/cache/tabelas/" . $_POST['table'] . ".json", $_POST['table']);

    if(strpos($_POST['table'], 'fk_') === false) {
        $updateTupleQuery = $inserter->createUpdateQueryById($_POST['id']);
        $inserter->insert($updateTupleQuery);
     } else {
        $updateTupleQuery = $inserter->createUpdateQueryFk();
        $inserter->insert($updateTupleQuery);
     }



    header("location:../pages/certo.html");
?>