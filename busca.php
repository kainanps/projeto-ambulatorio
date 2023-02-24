<?php
require_once "connection.php";
try {    
    $query = "SELECT * FROM chamados WHERE data = :valor";
    $stmt = $db->prepare($query);
    $stmt->execute([
        ':valor' => date("Y-m-d")
    ]);

    // Fetching the result
    $paciente = $stmt->fetchAll();

    echo json_encode($paciente);

} catch (PDOException $e) {
    echo 'Erro ao inserir os dados: ' . $e->getMessage();
}
?>