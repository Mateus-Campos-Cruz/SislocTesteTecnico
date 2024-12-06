const insertProduto = async (nomeEvento, valor) => {
    // Validações dos parâmetros
    if (!nomeEvento || typeof nomeEvento !== "string" || nomeEvento.length > 50) {
        throw new Error("Nome inválido! Deve ser uma string com até 50 caracteres.");
    }
    if (typeof valor !== "number" || valor <= 0) {
        throw new Error("Valor inválido! Deve ser um número positivo.");
    }

    // Gera um código único (simulando um incremento automático)
    const codigo = Date.now(); // Pode ser substituído por outra lógica para gerar o código

    try {
        // Verifica se o código já existe no banco de dados
        const checkQuery = `
            SELECT COUNT(*) AS total 
            FROM Produto 
            WHERE codigo = ${codigo};
        `;
        const resultado = await createQuery(checkQuery);

        if (resultado[0].total > 0) {
            throw new Error(`O código ${codigo} já existe no banco de dados.`);
        }

        // Monta a query SQL para inserir o registro
        const insertQuery = `
            INSERT INTO Produto (codigo, nome, valor)
            VALUES (${codigo}, '${nomeEvento}', ${valor});
        `;

        // Executa a query no banco de dados
        await createQuery(insertQuery);
        return codigo; // Retorna o código gerado
    } catch (error) {
        throw new Error("Erro ao inserir produto: " + error.message);
    }
};

// Exemplo de uso
(async () => {
    try {
        const codigo = await insertProduto("Final Campeonato de Poesia", 50.0);
        console.log(`Produto inserido com sucesso! Código: ${codigo}`);
    } catch (error) {
        console.error(error.message);
    }
})();
