const cadastrarEventoIngressos = async (nomeEvento, valorBase, descontos) => {
    try {
        // Insere o registro na tabela Produto
        const codigoProduto = await insertProduto(nomeEvento, valorBase);

        // Insere os registros na tabela ProdutoDesconto
        for (const desconto of descontos) {
            const { quantidade, valor } = desconto;

            // Validação para garantir que os parâmetros do desconto estão corretos
            if (typeof quantidade !== "number" || quantidade <= 0 || typeof valor !== "number" || valor <= 0) {
                throw new Error("Desconto inválido! Quantidade e valor devem ser números positivos.");
            }

            // Chama a função para inserir cada faixa de desconto
            await insertProdutoDesconto(codigoProduto, quantidade, valorDesconto);
        }

        console.log(`Evento "${nomeEvento}" cadastrado com sucesso com o código: ${codigoProduto}`);
        return codigoProduto;
    } catch (error) {
        throw new Error("Erro ao cadastrar evento e ingressos: " + error.message);
    }
};

// Exemplo de uso
(async () => {
    try {
        const nomeEvento = "Final do Campeonato de Poesia";
        const valorBase = 50.0; // Valor base do ingresso
        const descontos = [
            { quantidade: 6, valor: 45.0 }, // Desconto para 6 a 15 ingressos
            { quantidade: 16, valor: 40.0 } // Desconto para mais de 15 ingressos
        ];

        // Chama a função principal para cadastrar o evento e os ingressos com descontos
        const codigo = await cadastrarEventoIngressos(nomeEvento, valorBase, descontos);
        console.log(`Evento cadastrado com o código: ${codigo}`);
    } catch (error) {
        console.error(error.message);
    }
})();
