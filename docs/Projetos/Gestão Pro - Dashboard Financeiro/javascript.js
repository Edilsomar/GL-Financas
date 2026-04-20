
var box = document.querySelector("div.box");
var fundo = document.querySelector('div.fundoEscuro')
var tbody = document.querySelector("tbody.corpoT");
var lista = []; 

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

        var linhaTabela = document.createElement("tr"); //criar a linha na tabela
        var criarDescricao = document.createElement("td"); //cria os dados na linha da tabela
        var criarValor = document.createElement("td");
        var editar = document.createElement('td'); 
        var btnX = document.createElement('button'); //criar botao x para apagar lista
        
        criarDescricao.innerText = descricao.value; // geralmente qnd eu pego um element.value esse value é uma string (se fosse number(element.value)) seria numero
        criarValor.innerText = `R$: ${numero.toFixed(2)}`; 

        numero > 0  //Ternario para valor positivo ou negativo com cor
        ? criarValor.style.color = 'rgb(15, 100, 26)' 
        : criarValor.style.color = 'rgb(180, 38, 38)'; 

        //Adicionando os dados na tabela
        linhaTabela.appendChild(criarDescricao);
        linhaTabela.appendChild(criarValor);
        linhaTabela.appendChild(editar);
        editar.appendChild(btnX);
        tbody.appendChild(linhaTabela);''
        
        btnX.innerText = 'X';    // botao com valor X dentro         
        btnX.addEventListener('click', () => {  // função ao evento onClick no botão
            linhaTabela.remove(); // isso é usado para remover algo
            lista.splice(index, 1); // o splice serve para adicionar, remover ou substituir elementos
            valorTotal();
            entradasTotais();
            saidasTotais();
        });

        lista.push(numero)
        const index = lista.length -1;

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

    for (let i of lista){
        soma += i;
        }  
        
        spansTot.forEach(span => {
        span.innerText = `R$ ${soma.toFixed(2)}`;
        span.style.color = soma >= 0  
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


