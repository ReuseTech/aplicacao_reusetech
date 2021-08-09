<?php
session_start();
isset($_SESSION["user"]) or header("location:login.php");

require_once("Selector.php");
$selector = new Selector();

echo(json_encode($selector->get_table_not_null($selector->get_table($_GET['table']))));
die();
?> 
