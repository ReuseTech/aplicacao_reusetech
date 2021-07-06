<?php
    session_start();
    isset($_SESSION["user"]) or header("location:../php/login.php");
?>

<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="css/main.css">
        <link rel="stylesheet" href="css/header.css">
        <link rel="stylesheet" href="css/responsive.css">
        <link rel="stylesheet" href="css/default_page_style.css">
        <link rel="stylesheet" href="css/footer.css">
        <link rel="stylesheet" href="css/style.css">

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=BioRhyme&display=swap" rel="stylesheet">
    </head>
    <body>
        <header>
            <img src="../images/reusetech.png" alt="ReuseTech">
            <h1>ReuseTech</h1>
        </header>
        <form action="../php/insert_piece.php" method="POST">
                <!-- conteúdo criado via javascript -->
        </form>
        <div class="sair">
            <a href="adicionar.html"><input type="button" value="Voltar"></a>
        </div>
        <script src="../javascript/addPc.js"></script>
    </body>
</html>
