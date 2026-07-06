<?php
require_once 'conexao.php';

if (!isset($_SESSION['usuario_id'])) {
    header("Location: login.php");
    exit;
}

$sql = "SELECT * FROM reservas ORDER BY data_registro DESC";
$stmt = $pdo->query($sql);
$reservas = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Painel Admin - Falls Car</title>
    <link rel="stylesheet" href="style.css"> 
    <style>
        .admin-table { width: 100%; border-collapse: collapse; margin-top: 2rem; background: var(--card-bg); }
        .admin-table th, .admin-table td { padding: 1rem; text-align: left; border-bottom: 1px solid var(--border-color); }
        .admin-table th { background-color: var(--blue-accent); color: white; }
        .btn-small { padding: 0.4rem 0.8rem; font-size: 0.85rem; border-radius: 4px; color: white; text-decoration: none; display: inline-block; }
        .btn-edit { background-color: #eab308; }
        .btn-delete { background-color: #ef4444; }
        .logout-link { float: right; color: var(--text-muted); font-weight: bold; }
    </style>
</head>
<body>
    <main class="content-area">
        <div style="margin-top: 2rem;">
            <a href="logout.php" class="logout-link">Sair (Logout)</a>
            <h2 class="section-title">Gerenciar Reservas</h2>
            <p>Bem-vindo(a), <?= htmlspecialchars($_SESSION['usuario_nome']) ?>.</p>
        </div>

        <table class="admin-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Carro</th>
                    <th>Cliente</th>
                    <th>CPF</th>
                    <th>Coleta</th>
                    <th>Devolução</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($reservas as $reserva): ?>
                <tr>
                    <td><?= $reserva['id'] ?></td>
                    <td><?= htmlspecialchars($reserva['carro_nome']) ?></td>
                    <td><?= htmlspecialchars($reserva['nome_cliente']) ?></td>
                    <td><?= htmlspecialchars($reserva['cpf']) ?></td>
                    <td><?= date('d/m/Y', strtotime($reserva['data_coleta'])) ?> às <?= $reserva['hora_coleta'] ?></td>
                    <td><?= date('d/m/Y', strtotime($reserva['data_devolucao'])) ?></td>
                    <td>
                        <a href="editar.php?id=<?= $reserva['id'] ?>" class="btn-small btn-edit">Editar</a>
                        <a href="deletar.php?id=<?= $reserva['id'] ?>" class="btn-small btn-delete" onclick="return confirm('Tem certeza que deseja excluir?');">Excluir</a>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </main>
</body>
</html>