// Seleção de elementos do DOM
var box = document.querySelector("div.box");
var fundo = document.querySelector('div.fundoEscuro');
var tbody = document.querySelector("tbody.corpoT");
var boxEdt = document.getElementById('boxEditar');

// Variáveis de controle
var lista = []; 
var id = 0;
let posSendoEditada = null; // Guarda qual item estamos editando

// --- FUNÇÕES DE ABERTURA/FECHAMENTO ---

function NovaTransacao() {
    box.style.display = "flex";
    fundo.style.display = "flex";
}

function cancelar() {
    box.style.display = "none";
    fundo.style.display = "none";
}

function abrirPopupEdicao(pos) {
    posSendoEditada = pos;
    const transacao = lista[pos];

    // Preenche o formulário de edição com os dados atuais
    document.getElementById('novaDescricao').value = transacao.descricao;
    document.getElementById('novoValor').value = Math.abs(transacao.valor);

    boxEdt.style.display = 'flex';
    fundo.style.display = 'block';
}

function cancelarEdicao() {
    boxEdt.style.display = 'none';
    fundo.style.display = 'none';
}

// --- FUNÇÕES DO CRUD ---

function enviar() {
    var descricao = document.getElementById("d");
    var valor = document.getElementById("v");
    var numero = Number(valor.value);
    var selected = document.getElementById('type');
        
    if (descricao.value.trim() === "" || valor.value === "") {
        window.alert('[ERRO] Preencha todos os campos!');
        return;
    }

    // Lógica de sinal (Positivo ou Negativo)
    if (selected.value === "positivo") {
        numero = Math.abs(numero);
    } else {
        numero = -Math.abs(numero);
    }

    const transacao = {
        id: id++,
        descricao: descricao.value,
        valor: numero,
        selected: selected.value,
    };

    lista.push(transacao);
    
    // Limpeza e fechamento
    descricao.value = "";
    valor.value = "";
    cancelar();
    
    renderizarTela();
}

function salvarEdicao() {
    let novaDesc = document.getElementById('novaDescricao').value;
    let novoVal = document.getElementById('novoValor').value;

    if (novaDesc.trim() !== "" && novoVal !== "") {
        let valorNum = Number(novoVal);
        
        // Mantém o sinal (positivo/negativo) baseado no que era antes
        if (lista[posSendoEditada].valor < 0) {
            valorNum = -Math.abs(valorNum);
        }

        lista[posSendoEditada].descricao = novaDesc;
        lista[posSendoEditada].valor = valorNum;

        cancelarEdicao();
        renderizarTela();
    }
}

function apagarLista(pos) {
    lista.splice(pos, 1);
    renderizarTela();
}

// --- FUNÇÕES DE RENDERIZAÇÃO E CÁLCULOS ---

function renderizarTela() {
    tbody.innerHTML = "";
    
    lista.forEach((trans, i) => {
        tbody.innerHTML += `
            <tr>
                <td>${trans.descricao}</td>
                <td style="color: ${trans.valor < 0 ? 'rgb(180, 38, 38)' : 'green'}">
                    R$ ${trans.valor.toFixed(2)}
                </td>
                <td>
                    <img class="icones" onclick="apagarLista(${i})" src="icones/lixeira.png" alt="Excluir" style="width:20px; cursor:pointer;"> 
                    <img class="icones" onclick="abrirPopupEdicao(${i})" src="icones/lapisEditar.png" alt="Editar" style="width:20px; cursor:pointer; margin-left:10px;">
                </td>
            </tr>`;
    });

    // Atualiza os resumos financeiros
    valorTotal();
    entradasTotais();
    saidasTotais();
    
    // Salva no Navegador
    localStorage.setItem('transacoes', JSON.stringify(lista));
}

function valorTotal() {
    var spansTot = document.querySelectorAll("span.tot");
    var soma = lista.reduce((acc, atual) => acc + atual.valor, 0);

    spansTot.forEach(span => {
        span.innerText = `R$ ${soma.toFixed(2)}`;
        span.style.color = soma >= 0 ? "white" : "rgb(180, 38, 38)";
    });
}

function entradasTotais() {
    var spanEntTot = document.querySelector('span.entTot');
    var soma = lista
        .filter(n => n.valor > 0)
        .reduce((acc, atual) => acc + atual.valor, 0);

    if (spanEntTot) spanEntTot.innerText = `R$ ${soma.toFixed(2)}`;
}

function saidasTotais() {
    var spanSaiTot = document.querySelector('span.saiTot');
    var soma = lista
        .filter(n => n.valor < 0)
        .reduce((acc, atual) => acc + atual.valor, 0);

    if (spanSaiTot) spanSaiTot.innerText = `R$ ${soma.toFixed(2)}`;
}

// --- INICIALIZAÇÃO ---

function carregarDoLocalStorage() {
    const dadosSalvos = localStorage.getItem('transacoes');
    if (dadosSalvos) {
        lista = JSON.parse(dadosSalvos);
        // Atualiza o próximo ID para não repetir
        if (lista.length > 0) {
            id = Math.max(...lista.map(t => t.id)) + 1;
        }
        renderizarTela();
    }
}

// Inicia o sistema carregando os dados
carregarDoLocalStorage();