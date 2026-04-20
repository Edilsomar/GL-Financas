arrayComValores.reduce((acomulador, valorAtualSendoOperado) => acomulador + valorAtualSendoOperado, 0);

// o argumento acomulador vai acomular os valores do array 
// o argumento valorAtualSendoOperado é o valor atual que está sendo operado
// e o 0 é o valor inicial, ou seja, lembra que a gente usa o let soma = 0
// lembre se q o soma ta sendo operado, só que o depois da primeira operação completa 
// o soma passa a ter outro valor, e se por exemplo, soma passou a ter o valor 50 
// no proximo looping qnd eu adicionar o outro valor no array 
// ele opera o soma = 50 + todos os outros valores q ta no array
// sendo que ele deveria apenas somar o novo valor adicionado
// então o acomulador ja soma todos os valores e não o ultimo q foi adicionado a que já tinha
// toda vez que ele for somar ele tem que esquecer o valor que tinha e somar tudo dnv
