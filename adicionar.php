<!-- Passar para o PHP-->
<?php
    //Iniciando Variavel de sessão
    session_start();
    //Mandar de volta para a tela de login caso não tenha passado por ela
    if(!isset($_SESSION["user"])){
        header("location:login.php");
    }
    
    require_once("conexao.php");
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
        <title>Adicionar Peça - ReuseTech</title>
        <link rel="stylesheet" href="css/main.css">
        <link rel="stylesheet" href="css/header.css">
        <link rel="stylesheet" href="css/adicionar.css">
        <link rel="stylesheet" href="css/responsive.css">
    </head>
    <body>
        <header>
            <img src="images/reusetech.png" alt="ReuseTech">
            <h1>ReuseTech</h1>
        </header>
        <main>
            <div class="coluna">
                <?php
                    foreach($consulta as $table){
                        echo"<div class='peca'>
                                <a href='pecas/adicionar_peca.php?table=$table[Tables_in_dbreusetech]'>
                                <h1>$table[Tables_in_dbreusetech]</h1>
                            </a>
                        </div>";
                    }
                ?>
            </div>
            <div class="sair">
                <a href="index.php"><input type="button" value="Voltar"></a>
            </div>
        </main>
    </body>
</html>