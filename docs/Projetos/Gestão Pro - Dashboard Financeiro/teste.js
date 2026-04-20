
var box = document.querySelector("div.box");
var fundo = document.querySelector('div.fundoEscuro')
var tbody = document.querySelector("tbody.corpoT");
var lista = []; 
var id = 0

function NovaTransacao() {
    box.style.display = "flex"; // mostra o formulário
    fundo.style.display = "flex"; //mostra o fundo escuro no formulário
}

function enviar() {
    var descricao = document.getElementById("d");
    var valor = document.getElementById("v");
    var numero = Number(valor.value)
    var selected = document.getElementById('type');
        
    if( descricao.value.length == 0 || valor.value.length == 0 ){
        window.alert('[ERRO] Preencha todos os campos!')
    }else{
        
        if (selected.value === "positivo") { // ver qual é a opçao q tá selecionada no select
            numero = Math.abs(numero); // transforma o numero em positivo
        } else {
            numero = -Math.abs(numero); // transforma em negativo
        }
        const index = lista.length; //é o próximo índice disponível”
        const transacao = {
            id: id++,
            descricao: descricao.value,
            valor: numero,
            selected : selected.value,
        }
        lista.push(transacao);

        descricao.value = "";
        valor.value = "";

        box.style.display = "none"; //remover popup
        fundo.style.display = "none";

        renderizarTela()
    }   
}

function renderizarTela(){
    tbody.innerHTML = ""
        lista.forEach((trans, i) => {
            tbody.innerHTML += `<tr>
                <td>${trans.descricao}</td>
                <td style="color: ${trans.valor < 0 ? 'rgb(180, 38, 38)' : 'green'}">
                    R$ ${trans.valor.toFixed(2)}
                </td>
                <td><button onclick="apagarLista(${i})">X</button></td>
            </tr>`
        })                    
                            
        valorTotal() //Chamando outras funções
        entradasTotais()
        saidasTotais()
    }
function cancelar(){ //função botao cancelar
    box.style.display = "none";
    fundo.style.display = "none";
}

function valorTotal(){
    var spansTot = document.querySelectorAll("span.tot");
    var soma = lista.reduce((acc, atual) => acc + atual.valor, 0)

        spansTot.forEach(span => {
        span.innerText = `R$ ${soma.toFixed(2)}`;
        span.style.color = soma >= 0  
            ? "rgb(255, 255, 255)" 
            : "rgb(180, 38, 38)";
        });
}

function entradasTotais(){
    var spanEntTot = document.querySelector('span.entTot')
    var soma = lista
    .filter(n => n.valor > 0)
    .reduce((acc, atual) => acc + atual.valor, 0)

    spanEntTot.innerText = `R$ ${soma.toFixed(2)}`
}

function saidasTotais(){
    var spanSaiTot = document.querySelector('span.saiTot')
    var soma = lista
    .filter(n => n.valor < 0)
    .reduce((acc, atual) => acc + atual.valor, 0 )
   
    spanSaiTot.innerText = `R$ ${soma.toFixed(2)}`
}

function apagarLista(pos){
    lista.splice(pos, 1)
    renderizarTela()
}