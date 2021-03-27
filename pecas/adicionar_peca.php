<?php
    //Iniciando Variavel de sessão
    session_start();
    //Mandar de volta para a tela de login caso não tenha passado por ela
    if(!isset($_SESSION["user"])){
        header("location:../login.php");
    }
?> 
<?php
    require_once("../conexao.php");
    if (isset($_POST['table'])){
        $table = $_POST['table'];
    }
    if (isset($_GET['table'])){
        $table = $_GET['table'];
    }
?>
<?php
    if(isset($_POST["marca"])){
        $query = mysqli_query($conecta, "SHOW COLUMNS FROM $table");

        while($row = mysqli_fetch_assoc($query)){
            $result[] = $row;
        }
        foreach($result as $coluna){
            if($coluna[Field] != "id"){
                $columns .= "$coluna[Field]";
                if ($coluna[Field] != end($result)[Field]){
                    $columns .= ", ";
                }
            }
        }
        
        foreach($result as $coluna){
            if($coluna[Field] != "id"){
                $consulta = $coluna["Field"];
                $atributes .= "'";
                $atributes .= "$_POST[$consulta]";
                $atributes .= "'";
                if ($coluna[Field] != end($result)[Field]){
                    $atributes .= ", ";
                }
            }
        }
        

        $inserir = "INSERT INTO $table($columns)VALUES ($atributes)";

        
        $insert = mysqli_query($conecta, $inserir);
        if(!$insert){
            die("Erro no Banco de Dados");
        }else{
            header("location:../certo.html");
        }
        
    }
?>
<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Placa Mãe - ReuseTech</title>
        <link rel="stylesheet" href="../css/main.css">
        <link rel="stylesheet" href="../css/header.css">
        <link rel="stylesheet" href="../css/form.css">
        <link rel="stylesheet" href="../css/pecas.css">
        <link rel="stylesheet" href="../css/responsive.css">
    </head>
    <body>
        <header>
            <img src="../images/reusetech.png" alt="ReuseTech">
            <h1>ReuseTech</h1>
        </header>
        <form action="adicionar_peca.php" method="POST">
            
            <?php
                $query = mysqli_query($conecta, "SHOW COLUMNS FROM $table");

                while($row = mysqli_fetch_assoc($query)){
                    $result[] = $row;
                }
                echo "<input type='hidden' value='$table' name='table' >";
                foreach($result as $coluna){
                    if($coluna[Field] != "id"){
                        if (strpos($coluna[Type], "int") or $coluna[Type] == "int" or $coluna[Type] == "float" or $coluna[Type] == "decimal" or $coluna[Type] == "real"){
                            $inputType = "number";
                        }
                        else if(strpos($coluna[Type], "char") or $coluna[Type] == "char" or $coluna[Type] == "binary" or $coluna[Type] == "text" or $coluna[Type] == "blob" or $coluna[Type] == "enum" or $coluna[Type] == "set"){
                            $inputType = "text";
                        }
                        else if(strpos($coluna[Type], "time") or $coluna[Type] == "date"){
                            $inputType = "date";
                        }
                        echo "<label>$coluna[Field] $coluna[Type]</label>";
                        echo "<input type='$inputType' placeholder='$coluna[Field]' name='$coluna[Field]'><br>";
                    }
                }
                echo '<input type="submit" value="Adicionar">';
                
            ?>
        </form>
        <div class="sair">
            <a href="../adicionar.php"><input type="button" value="Voltar"></a>
        </div>
    </body>
</html>
<?php
    mysqli_close($conecta);
?>