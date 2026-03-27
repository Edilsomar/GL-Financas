
var box = document.querySelector("div.box");
var fundo = document.querySelector('div.fundoEscuro')
var tbody = document.querySelector("tbody.corpoT");
var lista = [];

function NovaTransacao() {
    box.style.display = "flex";
    fundo.style.display = "flex";
}
function enviar() {
    var descricao = document.getElementById("d");
    var valor = document.getElementById("v");
    var selected = document.getElementById('type');
        
    if( descricao.value.length == 0 || valor.value.length == 0 ){
        window.alert('[ERRO] Preencha todos os campos!')
    }else{
        var numero = Number(valor.value)

        if (selected.value === "positivo") {
            numero = Math.abs(numero); // garante positivo
        } else {
            numero = -Math.abs(numero); // garante negativo
        }

        //Criando os elementos
        var linhaTabela = document.createElement("tr");
        var criarDescricao = document.createElement("td");
        var criarValor = document.createElement("td");
        var gerenciar = document.createElement('td')
        var btnX = document.createElement('button')
        
        //adicionando valores aos elementos
        criarDescricao.innerText = descricao.value;
        criarValor.innerText = `R$: ${numero.toFixed(2)}`;
        btnX.innerText = 'X';
        btnX.addEventListener('click', () => {
            linhaTabela.remove();
            valorTotal()
            entradasTotais()
            saidasTotais()
        });
    
        //Ternario para valor positivo ou negativo com cor
        numero > 0 ? criarValor.style.color = 'rgb(15, 100, 26)' : criarValor.style.color = 'rgb(180, 38, 38)';

        //Adicionando os dados na tabela
        linhaTabela.appendChild(criarDescricao);
        linhaTabela.appendChild(criarValor);
        linhaTabela.appendChild(gerenciar);
        gerenciar.appendChild(btnX);
        tbody.appendChild(linhaTabela);
        
        lista.push(numero)

        //Deixando formulários limpos após envio de dados
        descricao.value = "";
        valor.value = "";

        //Removendo o formulário da tela
        box.style.display = "none";
        fundo.style.display = "none";

        //Chamando outras funções
        valorTotal()
        entradasTotais()
        saidasTotais()
        
    }
}
function valorTotal(){
    var spansTot = document.querySelectorAll("span.tot");
    var soma = 0;

    for (let i = 0; i < lista.length; i++){
        soma += lista[i];
        }  
        
        spansTot.forEach(span => {
        span.innerText = `R$ ${soma.toFixed(2)}`;
        span.style.color = soma > 0  
            ? "rgb(255, 255, 255)" 
            : "rgb(180, 38, 38)";
        });
    
}
function entradasTotais(){
    var spanEntTot = document.querySelector('span.entTot')
    var soma = 0;

    for (let i = 0; i < lista.length; i++){
        if(lista[i] > 0 ){
        soma += lista[i] 
        } 
    }
    spanEntTot.innerText = `R$ ${soma.toFixed(2)}`
}
function saidasTotais(){
    var spanSaiTot = document.querySelector('span.saiTot')
    var soma = 0;

    for (let i = 0; i < lista.length; i++){
        if(lista[i] < 0 ){
        soma += lista[i] 
        } 
    }
    spanSaiTot.innerText = `R$ ${soma.toFixed(2)}`
}
function cancelar(){
    box.style.display = "none";
    fundo.style.display = "none";
}


