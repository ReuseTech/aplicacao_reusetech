<?php
    require_once("conexao.php");
?>
<?php
    session_start();

    if(!isset($_SESSION["user"])){
        header("location:login.php");
    }
    if(isset($_POST["id"])){
        $peca = $_POST["peca"];
        $id = $_POST["id"];
        $deletar = "DELETE FROM {$peca} WHERE id = {$id}";
        $del = mysqli_query($conecta, $deletar);
        if(!$del){
            die("Falha na Consulta ao Banco");
        } 
    }
    $processador = "SELECT * FROM processador";
    $placa_mae = "SELECT * FROM placa_mae";
    $login = "SELECT * FROM usuario WHERE user == 'biel'";
    $login1 = mysqli_query($conecta, $login);
    $processador2 = mysqli_query($conecta, $processador);
    $placa_mae2 = mysqli_query($conecta, $placa_mae);
    if(!$processador2 || !$placa_mae2){
        die("Falha na Consulta ao Banco2");
    } 
    
    $consultar = "show tables";

    $consulta = mysqli_query($conecta, $consultar);
    if(!$consulta){
        die("Erro no Banco de Dados");
    }

?>
<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Visualizar Estoque - ReuseTech</title>
        <link rel="stylesheet" href="css/main.css">
        <link rel="stylesheet" href="css/header.css">
        <link rel="stylesheet" href="css/visualizar.css">
        <link rel="stylesheet" href="css/responsive.css">
    </head>
    <body>

        <header>
            <img src="images/reusetech.png" alt="ReuseTech">
            <h1>ReuseTech</h1>
        </header>

        <div class="topo">
            <h1>Visualizar Estoque </h1>
        </div>

                <?php

                $exception = array("usuario");

                foreach($consulta as $table){
                    if (!in_array($table[Tables_in_dbreusetech], $exception)){
                        $consultar_pecas = "select * from $table[Tables_in_dbreusetech]";
                        $consulta_pecas = mysqli_query($conecta, $consultar_pecas);
    
                        while($row = mysqli_fetch_assoc($consulta_pecas)){
                            echo"<div class='peca'>
                            <h3>$table[Tables_in_dbreusetech]</h3>
                            <ul>";
    
                            foreach(array_keys($row) as $contador){
                                echo "<li>";
                                print($contador . ": " . $row[$contador]);
                                echo "</li>";
                            }
    
                            echo"</ul></div>";
                        }
                    }
                    }

                ?>
        <div class="sair">
            <a href="index.php"><input type="button" value="Voltar"></a>
        </div>
    </body>
</html>
<?php
    mysqli_close($conecta);
?>
