<?php
require_once 'conexao.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $carro_id = $_POST['carro_id'];
    $carro_nome = $_POST['carro_nome'];
    $nome_cliente = $_POST['nome_cliente'];
    $cpf = $_POST['cpf'];
    $email = $_POST['email'];
    $cidade = $_POST['cidade'];
    $data_coleta = $_POST['data_coleta'];
    $hora_coleta = $_POST['hora_coleta'];
    $data_devolucao = $_POST['data_devolucao'];
    $forma_pagamento = $_POST['forma_pagamento'];

    try {
        $sql = "INSERT INTO reservas (carro_id, carro_nome, nome_cliente, cpf, email, cidade, data_coleta, hora_coleta, data_devolucao, forma_pagamento) 
                VALUES (:carro_id, :carro_nome, :nome_cliente, :cpf, :email, :cidade, :data_coleta, :hora_coleta, :data_devolucao, :forma_pagamento)";
        
        $stmt = $pdo->prepare($sql);

        $stmt->bindParam(':carro_id', $carro_id);
        $stmt->bindParam(':carro_nome', $carro_nome);
        $stmt->bindParam(':nome_cliente', $nome_cliente);
        $stmt->bindParam(':cpf', $cpf);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':cidade', $cidade);
        $stmt->bindParam(':data_coleta', $data_coleta);
        $stmt->bindParam(':hora_coleta', $hora_coleta);
        $stmt->bindParam(':data_devolucao', $data_devolucao);
        $stmt->bindParam(':forma_pagamento', $forma_pagamento);

        if ($stmt->execute()) {
            echo "<script>
                    alert('Reserva efetuada com sucesso! Os dados foram salvos no banco de dados.');
                    window.location.href = 'index.php'; 
                  </script>";
        } else {
            echo "<script>
                    alert('Erro ao tentar efetuar a reserva. Tente novamente.');
                    window.location.href = 'index.php';
                  </script>";
        }
    } catch(PDOException $e) {
        echo "Erro de execução: " . $e->getMessage();
    }
}
?>
