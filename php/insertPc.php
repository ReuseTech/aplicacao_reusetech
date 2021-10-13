<?php
    session_start();
    isset($_SESSION["user"]) or header("location:./login.php");

    include("Inserter.php");

    $_POST['table'] = 'pc';
    $inserter = new Inserter("../api/cache/tabelas/" . $_POST['table'] . ".json", $_POST['table']);

    $tablesNameList = json_decode(file_get_contents('../api/cache/tables_list.json'));
    
    $insertPieceQuery = $inserter->createInsertQuery();
    $inserter->insert($insertPieceQuery);
    
    foreach($tablesNameList as $tableName) {
        foreach(array_keys($_POST) as $tableNamePOST) {
            if($tableName == $tableNamePOST) {
                if($_POST[$tableNamePOST] != null and $_POST[$tableNamePOST] != '') {
                    $inserter->insert($inserter->createUpdateId__PcByTableNameAndId($tableName, $_POST[$tableNamePOST]));
                }
            }
        }
    }
    
    header("location:../pages/certo.html");
?>