<?php
    $servidor = "localhost";
    $usuario = "root";
    $senha = "anthonypro";
    $banco = "dbreusetech";
    $conecta = mysqli_connect($servidor, $usuario, $senha, $banco);
    if(mysqli_connect_errno($conecta)){
        die("Conexão falhou");
    }
?>