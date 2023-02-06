<?php
require_once "connection.php";

$data = $_POST;

try {
    
    $query = "INSERT INTO chamados (Paciente, Data, Consultorio) VALUES (:valor1, :valor2, :valor3)";
    $stmt = $db->prepare($query);
    $stmt->execute([
        ':valor1' => $data['paciente'],
        ':valor2' => date("Y-m-d"),
        ':valor3' => $data['consultorio']
    ]);

    echo 'Dados inseridos com sucesso';

} catch (PDOException $e) {
    echo 'Erro ao inserir os dados: ' . $e->getMessage();
}
?>