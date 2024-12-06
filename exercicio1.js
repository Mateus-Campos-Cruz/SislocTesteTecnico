function calcularValorIngressos(quantidade) {
    if (quantidade <= 5) {
        return quantidade * 50;
    } else if (quantidade <= 15) {
        return 5 * 50 + (quantidade - 5) * 45;
    } else {
        return 5 * 50 + 10 * 45 + (quantidade - 15) * 40;
    }
}

// Exemplo de uso
const quantidadeIngressos = 17;
const valorTotal = calcularValorIngressos(quantidadeIngressos);
console.log(`Valor total para ${quantidadeIngressos} ingressos: R$ ${valorTotal.toFixed(2)}`);


/*
Explicação da abordagem:

Estruturas condicionais (if/else if/else):
O uso dessas condições permite tratar cada faixa de preços da tabela de maneira separada. Isso deixa o código legível e organizado.

Cálculo incremental: Cada faixa de preço é calculada acumulando o valor.

Reutilização e escalabilidade: A função pode ser usada para qualquer número de ingressos. 
Caso as regras de preços mudem, as faixas podem ser ajustadas facilmente.

Simplicidade: A lógica é direta e evita loops desnecessários, 
o que melhora a eficiência e mantém o código fácil de entender.
*/