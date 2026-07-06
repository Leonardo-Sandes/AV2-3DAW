const frota = [
    { id: 1, nome: "Chevrolet Onix", categoria: "Hatch", cidade: "Rio de Janeiro", preco: 110.00, imagem: "carros/onix.jpeg" },
    { id: 2, nome: "Hyundai HB20", categoria: "Hatch", cidade: "Belo Horizonte", preco: 105.00, imagem: "carros/hb20.jpeg" },
    { id: 3, nome: "Volkswagen Polo", categoria: "Hatch", cidade: "São Paulo", preco: 115.00, imagem: "carros/polo.jpeg" },
    { id: 4, nome: "Fiat Argo", categoria: "Hatch", cidade: "Niterói", preco: 95.00, imagem: "carros/argo.jpeg" },

    { id: 5, nome: "Toyota Corolla", categoria: "Sedan", cidade: "Rio de Janeiro", preco: 250.00, imagem: "carros/corolla.jpeg" },
    { id: 6, nome: "Honda Civic", categoria: "Sedan", cidade: "Brasília", preco: 270.00, imagem: "carros/civic.jpeg" },
    { id: 7, nome: "Nissan Sentra", categoria: "Sedan", cidade: "Belo Horizonte", preco: 240.00, imagem: "carros/sentra.jpeg" },
    { id: 8, nome: "Chevrolet Cruze", categoria: "Sedan", cidade: "Rio de Janeiro", preco: 235.00, imagem: "carros/cruze.jpeg" },

    { id: 9, nome: "Jeep Compass", categoria: "SUV", cidade: "Niterói", preco: 290.00, imagem: "carros/jeep.jpeg" },
    { id: 10, nome: "Volkswagen T-Cross", categoria: "SUV", cidade: "Rio de Janeiro", preco: 280.00, imagem: "carros/tcross.jpeg" },
    { id: 11, nome: "Hyundai Creta", categoria: "SUV", cidade: "Brasília", preco: 260.00, imagem: "carros/creta.jpeg" },
    { id: 12, nome: "Honda HR-V", categoria: "SUV", cidade: "Belo Horizonte", preco: 310.00, imagem: "carros/hrv.jpeg" }
];

let carroSelecionado = null;

function renderizarCarros(carros) {
    const grid = document.getElementById('carGrid');
    grid.innerHTML = '';

    if (carros.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #64748b; font-size: 1.2rem; margin-top: 2rem;">Nenhum veículo encontrado com estes filtros.</p>';
        return;
    }

    carros.forEach(carro => {
        const card = document.createElement('div');
        card.className = 'car-card';
        card.innerHTML = `
            <img src="${carro.imagem}" alt="${carro.nome}" class="car-image" onerror="this.onerror=null; this.src=''; this.alt='[ Imagem do ${carro.nome} ]'; this.style.backgroundColor='#e2e8f0';">
            <div class="car-info">
                <div class="car-header">
                    <span class="car-title">${carro.nome}</span>
                    <span class="car-category">${carro.categoria}</span>
                </div>
                <div class="car-city"> ${carro.cidade}</div>
                <div class="car-price">R$ ${carro.preco.toFixed(2)} <span>/dia</span></div>
                <button class="btn-blue w-100" onclick="abrirModal(${carro.id})">Alugar</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function aplicarFiltros() {
    const cidadeEscolhida = document.getElementById('cidadeSelect').value;
    const categoriaEscolhida = document.getElementById('categoriaSelect').value;

    const carrosFiltrados = frota.filter(carro => {
        const matchCidade = cidadeEscolhida === 'todas' || carro.cidade === cidadeEscolhida;
        const matchCategoria = categoriaEscolhida === 'todas' || carro.categoria === categoriaEscolhida;
        return matchCidade && matchCategoria;
    });

    renderizarCarros(carrosFiltrados);
}

function filtrarPelaNav() {
    const navValue = document.getElementById('navCategoriaSelect').value;
    document.getElementById('categoriaSelect').value = navValue;
    aplicarFiltros();
}

function abrirModal(idCarro) {
    if (typeof usuarioLogado !== 'undefined' && !usuarioLogado) {
        alert("Você precisa fazer login ou se cadastrar para alugar um veículo.");
        window.location.href = 'login.php';
        return;
    }

    carroSelecionado = frota.find(c => c.id === idCarro);
    const dataInput = document.getElementById('dataRetirada').value;
    
    const summary = document.getElementById('checkoutSummary');
    summary.innerHTML = `
        <strong>Veículo:</strong> ${carroSelecionado.nome} (${carroSelecionado.categoria})<br>
        <strong>Valor da Diária:</strong> R$ ${carroSelecionado.preco.toFixed(2)}
    `;

    document.getElementById('carroIdInput').value = carroSelecionado.id;
    document.getElementById('carroNomeInput').value = carroSelecionado.nome;
    document.getElementById('cidadeInput').value = carroSelecionado.cidade;
    
    if(dataInput) {
        document.getElementById('modalDataColeta').value = dataInput;
    }

    document.getElementById('paymentModal').style.display = 'flex';
}

function fecharModal() {
    document.getElementById('paymentModal').style.display = 'none';
    document.getElementById('paymentForm').reset();
    carroSelecionado = null;
}

renderizarCarros(frota);
