<?php
header("Content-Type: text/html; charset=utf-8");
header("Access-Control-Allow-Origin: *");
require_once "connection.php";

$msg = "Os pacientes já foram inseridos anteriormente";

//$pacientes = $_POST;

$pacientes = [
    'paciente1' => [
        'paciente' => 'KAINAN PAIVA DA SILVA',
        'prontuario' => '45315',
        'data' => '12/02/2023',
        'especialidade' => 'NEUROCIRURGIA'
        ]
    ];

foreach($pacientes as $paciente){
    inserirPaciente($paciente, $db, $msg);
    echo( $paciente['paciente']);
}

function inserirPaciente($paciente, $db, $msg){
    $date = date("Y-m-d", strtotime($paciente['data']));
    
    $nomePaciente = ucwords($paciente['paciente']);
    
    $especialidadePaciente = ucwords($paciente['especialidade']);
    
    $chamado = buscarPaciente($db, $nomePaciente, $date, $msg);
    
    
    try {
    
        if (!$chamado) {
            $query = "INSERT INTO chamados (Paciente, Prontuario, Data, Especialidade, TotalChamadas) VALUES (:valor1, :valor2, :valor3, :valor4, :valor5)";
            $stmt = $db->prepare($query);
            $stmt->execute([
                ':valor1' => $nomePaciente,
                ':valor2' => $paciente['prontuario'],
                ':valor3' => date("Y-m-d"),
                ':valor4' => $especialidadePaciente,
                ':valor5' => $paciente['chamadas']
            ]);
            $msg = 'paciente inseridos com sucesso!';
            print_r($chamado);
        } 
    } catch (PDOException $e) {
        $msg = 'Erro ao inserir os dados: ' . $e->getMessage();
    }
}

function buscarPaciente($db, $paciente, $data, $msg)
{
    try {
        
        $query = "SELECT * FROM `chamados` WHERE paciente = :valor1 and data = :valor2";
        $stmt = $db->prepare($query);
        $stmt->execute([
            ':valor1' => $paciente,
            ':valor2' => $data
        ]);

        $paciente = $stmt->fetch();

        return $paciente;
    } catch (PDOException $e) {
        $msg = 'Erro ao fazer busca: ' . $e->getMessage();
    }
}

// echo $msg;

?>
