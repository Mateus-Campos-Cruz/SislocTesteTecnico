const calcularValorTotalVenda = async (codigoProduto, quantidade) => {
    try {
        // Validação de parâmetros
        if (!codigoProduto || typeof codigoProduto !== "number" || quantidade <= 0) {
            throw new Error("Parâmetros inválidos! Código do produto e quantidade devem ser válidos.");
        }

        // Busca o valor base do produto na tabela Produto
        const produtoQuery = 
            `SELECT valor 
            FROM Produto 
            WHERE codigo = ${codigoProduto};`
                    ;
        const produto = await createQuery(produtoQuery);

        if (!produto || produto.length === 0) {
            throw new Error("Produto não encontrado!");
        }

        const valorBase = produto[0].valor;

        // Busca as faixas de desconto na tabela ProdutoDesconto
        const descontosQuery = 
            `SELECT quantidade, valor 
            FROM ProdutoDesconto 
            WHERE codigo = ${codigoProduto} 
            ORDER BY quantidade ASC;`
        ;
        const faixasDesconto = await createQuery(descontosQuery);

        if (!faixasDesconto || faixasDesconto.length === 0) {
            throw new Error("Nenhuma faixa de desconto encontrada para o produto!");
        }

        let totalVenda = 0;
        let restante = quantidade;
        let faixaAnterior = 0;

        // Calcula o valor total com base nas faixas de desconto
        for (const faixa of faixasDesconto) {
            const { quantidade: limiteFaixa, valor } = faixa;

            if (restante <= 0) break;

            const quantidadeFaixa = Math.min(restante, limiteFaixa - faixaAnterior);
            totalVenda += quantidadeFaixa * valor;

            restante -= quantidadeFaixa;
            faixaAnterior = limiteFaixa;
        }

        // Caso haja quantidade restante (acima da última faixa), utiliza o valor base
        if (restante > 0) {
            totalVenda += restante * valorBase;
        }

        return totalVenda;
    } catch (error) {
        throw new Error("Erro ao calcular o valor total da venda: " + error.message);
    }
};

// Exemplo de uso
(async () => {
    try {
        const codigoProduto = 123; // Código do produto a ser vendido
        const quantidade = 17; // Quantidade total a ser vendida

        const valorTotal = await calcularValorTotalVenda(codigoProduto, quantidade);
        console.log(`Valor total da venda: R$ ${valorTotal.toFixed(2)}`);
    } catch (error) {
        console.error(error.message);
    }
})();