const insertProdutoDesconto = async (codigoProduto, quantidade, valorDesconto) => {
    // Validações dos parâmetros
    if (!codigoProduto || typeof codigoProduto !== "number") {
        throw new Error("Código do produto inválido! Deve ser um número.");
    }
    if (!quantidade || typeof quantidade !== "number" || quantidade <= 0) {
        throw new Error("Quantidade inválida! Deve ser um número positivo.");
    }
    if (!valorDesconto || typeof valorDesconto !== "number" || valorDesconto <= 0) {
        throw new Error("Valor do desconto inválido! Deve ser um número positivo.");
    }

    // Monta a query SQL para inserir o registro
    const query = `
        INSERT INTO ProdutoDesconto (codigo, quantidade, valor)
        VALUES (${codigoProduto}, ${quantidade}, ${valorDesconto});
    `;

    try {
        // Executa a query no banco de dados
        await createQuery(query);
        console.log("Registro inserido com sucesso na tabela ProdutoDesconto.");
    } catch (error) {
        throw new Error("Erro ao inserir na tabela ProdutoDesconto: " + error.message);
    }
};

// Exemplo de uso
(async () => {
    try {
        await insertProdutoDesconto(123, 6, 45.0);
        console.log("Desconto adicionado com sucesso!");
    } catch (error) {
        console.error(error.message);
    }
})();
