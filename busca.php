<?php
session_start();
require_once "connection.php";
try {    
    $query = "SELECT * FROM chamados ORDER BY id DESC LIMIT 1";
    $stmt = $db->prepare($query);
    $stmt->execute();

    // Fetching the result
    $paciente = $stmt->fetch();

    echo json_encode($paciente);

} catch (PDOException $e) {
    echo 'Erro ao inserir os dados: ' . $e->getMessage();
}
?>