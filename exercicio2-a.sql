-- Criação da tabela Produto
CREATE TABLE Produto (
    codigo INTEGER(10) PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    valor FLOAT(10) NOT NULL
);

-- Criação da tabela ProdutoDesconto
CREATE TABLE ProdutoDesconto (
    codigo INTEGER(10),
    quantidade INTEGER(10) NOT NULL,
    valor FLOAT(10) NOT NULL,
    PRIMARY KEY (codigo, quantidade),
    FOREIGN KEY (codigo) REFERENCES Produto(codigo)
);
