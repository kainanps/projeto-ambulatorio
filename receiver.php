<?php
header("Content-Type: text/html; charset=utf-8");
header("Access-Control-Allow-Origin: *");
require_once "connection.php";

$dados = $_POST;
// $dados = [
//     'paciente' => 'KAINAN PAIVA DA SILVA',
//     'prontuario' => '45315',
//     'data' => '12/02/2023',
//     'especialidade' => 'NEUROCIRURGIA'
// ];
$date = date("Y-m-d", strtotime($dados['data']));

$nomePaciente = ucwords($dados['paciente']);

$especialidadePaciente = ucwords($dados['especialidade']);

$chamado = buscarPaciente($db, $nomePaciente, $date);


try {

    if (!$chamado) {
        $query = "INSERT INTO chamados (Paciente, Prontuario, Data, Especialidade, TotalChamadas) VALUES (:valor1, :valor2, :valor3, :valor4, :valor5)";
        $stmt = $db->prepare($query);
        $stmt->execute([
            ':valor1' => $nomePaciente,
            ':valor2' => $dados['prontuario'],
            ':valor3' => date("Y-m-d"),
            ':valor4' => $especialidadePaciente,
            ':valor5' => $dados['chamadas']
        ]);
        echo 'Dados inseridos com sucesso!';
    } else {
        echo 'Paciente já foi chamado hoje!';
    }

} catch (PDOException $e) {
    echo 'Erro ao inserir os dados: ' . $e->getMessage();
}

function buscarPaciente($db, $paciente, $data)
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
        echo 'Erro ao fazer busca: ' . $e->getMessage();
    }

}

?>