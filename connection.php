<?php
// estabelecendo a conexão com o banco de dados
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "paciente";

$db = new PDO('mysql:host=localhost;dbname=paciente', 'root', '');
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);