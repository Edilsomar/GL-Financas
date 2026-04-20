
const spans = document.querySelectorAll('.valorTotal');
const lista = [1, 5, -7, 4, 9];

function valorTotal() {
    const soma = lista.reduce((acc, val) => acc + val, 0);

    spans.forEach(el => {
        el.innerText = `R$ ${soma.toFixed(2)}`;
        el.style.color = soma >= 0 ? 'white' : 'red';
    });
}