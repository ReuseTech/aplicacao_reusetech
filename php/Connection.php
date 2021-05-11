<?php
class Connection{
    private $server = "localhost";
    private $user = "root";
    private $password = "anthonypro";
    private $data_base = "dbreusetech";

    function connect_to_db(){
        if(mysqli_connect($this->server, $this->user, $this->password, $this->data_base)){           
            return mysqli_connect($this->server, $this->user, $this->password, $this->data_base);
        }
        else{
            die("Falha ao conectar ao banco de dados");
        }
    }
}
?>