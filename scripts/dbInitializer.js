const mySqlTemp = require('mysql2');


async function dbInitializer() {
    const tempConnection = mySqlTemp.createConnection({
        "user": process.env.MYSQL_USER,
        "password": process.env.MYSQL_PASSWORD,
        "host": process.env.MYSQL_HOST,
        "port": process.env.MYSQL_PORT
    });

    const schema = `
        CREATE SCHEMA IF NOT EXISTS ${process.env.MYSQL_DATABASE} DEFAULT CHARACTER SET utf8;
    `;

    const tableTiposPagamento = `
        CREATE TABLE IF NOT EXISTS ${process.env.MYSQL_DATABASE}.tipos_pagamento (
            id INT(11) NOT NULL AUTO_INCREMENT,
            tipo TEXT(50) NOT NULL,
            PRIMARY KEY (id))
            ENGINE = InnoDB
            DEFAULT CHARACTER SET = utf8;
    `;

    const tableCategorias = `
        CREATE TABLE IF NOT EXISTS ${process.env.MYSQL_DATABASE}.categorias (
            id INT(11) NOT NULL AUTO_INCREMENT,
            nome TEXT(50) NOT NULL,
            descricao TEXT(50) NOT NULL,
            PRIMARY KEY (id))
            ENGINE = InnoDB
            DEFAULT CHARACTER SET = utf8;
    `;

    const tableDespesas = `
        CREATE TABLE IF NOT EXISTS ${process.env.MYSQL_DATABASE}.despesas (
            id INT(11) NOT NULL AUTO_INCREMENT,
            valor REAL NOT NULL,
            data_compra DATETIME NOT NULL,
            descricao TEXT(50) NOT NULL,
            categorias_id INT(11) NOT NULL,
            tipos_pagamento_id INT(11) NOT NULL,
            PRIMARY KEY (id, categorias_id, tipos_pagamento_id),
            INDEX fk_despesas_categorias_idx (categorias_id ASC),
            INDEX fk_despesas_tipos_pagamento1_idx (tipos_pagamento_id ASC),
            CONSTRAINT fk_despesas_categorias
                FOREIGN KEY (categorias_id)
                REFERENCES ${process.env.MYSQL_DATABASE}.categorias (id)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION,
            CONSTRAINT fk_despesas_tipos_pagamento1
                FOREIGN KEY (tipos_pagamento_id)
                REFERENCES ${process.env.MYSQL_DATABASE}.tipos_pagamento (id)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION)
            ENGINE = InnoDB
            DEFAULT CHARACTER SET = utf8;
    `;

    const insertValuesTiposPagamentos = `
        INSERT INTO ${process.env.MYSQL_DATABASE}.tipos_pagamento (tipo) 
        VALUES ('Dinheiro'), ('Débito'), ('Crédito'), ('Pix')
    `;

    const insertValuesCategorias = `
    INSERT INTO ${process.env.MYSQL_DATABASE}.categorias (nome, descricao)
    VALUES
        ('Alimentação', 'Despesas relacionadas a alimentos e bebidas'),
        ('Habitação', 'Despesas relacionados à moradia.'),
        ('Transporte', 'Despesas relacionados a transporte.'),
        ('Saúde', 'Despesas relacionadas à saúde.'),
        ('Educação', 'Despesas relacionadas à educação.'),
        ('Lazer', 'Despesas relacionadas ao entretenimento'),
        ('Serviços Públicos', 'Contas de água, luz, etc'),
        ('Seguros', 'Despesas relacionadas a seguros.'),
        ('Vestuário', 'Despesas com roupas, calçados e acessórios.'),
        ('Outras Despesas', 'Despesas diversas.');
    `;

    try {
        await new Promise((resolve, reject) => {
            tempConnection.connect((error) => {
                if (error) {
                    return reject(new Error('Erro ao conectar ao banco de dados temporário: ' + error));
                }
            });
            resolve();
        });

        await new Promise((resolve, reject) => {
            tempConnection.query(schema, (error) => {
                if (error) {
                    return reject(new Error('Erro ao criar o schema: ' + error));
                } else {
                    console.log(`Schema ${process.env.MYSQL_DATABASE} criado com sucesso ou já existe.`);
                    resolve();
                }
            });
        });

        await new Promise((resolve, reject) => {
            tempConnection.query(tableTiposPagamento, (error) => {
                if (error) {
                    return reject(new Error('Erro ao executar as queries de criação da tabela Tipos Pagamento: ' + error));
                } else {
                    console.log('Tabela Tipos pagamento criada com sucesso ou já existe.');
                    resolve();
                }
            });
        });

        await new Promise((resolve, reject) => {
            tempConnection.query(tableCategorias, (error) => {
                if (error) {
                    return reject(new Error('Erro ao executar as queries de criação da tabela Categorias: ' + error));
                } else {
                    console.log('Tabela Categoria criada com sucesso ou já existe.');
                    resolve();
                }
            });
        });

        await new Promise((resolve, reject) => {
            tempConnection.query(tableDespesas, (error) => {
                if (error) {
                    return reject(new Error('Erro ao executar as queries de criação da tabela Despesas: ' + error));
                } else {
                    console.log('Tabela Despesas criada com sucesso ou já existe.');
                    resolve();
                }
            });
        });

        await new Promise((resolve, reject) => {
            tempConnection.query(
                `SELECT COUNT(*) AS count FROM ${process.env.MYSQL_DATABASE}.tipos_pagamento;`,
                (error, results) => {
                    if (error) {
                        return reject(new Error('Erro ao executar a consulta COUNT TIPOS PAGAMENTO: ' + error));
                    }
    
                    const contadorTabelaTiposPagamento = results[0].count;
    
                    if (contadorTabelaTiposPagamento === 0) {
                        console.log('Tabela TiposPagamento está vazia. Inserindo dados...');
                        tempConnection.query(insertValuesTiposPagamentos, (error, results) => {
                            if (error) {
                                return reject(new Error('Erro ao executar as queries de inserção de valores na tabela Tipos Pagamento: ' + error));
                            } else {
                                console.log('Inserção de valores na tabela Tipos pagamento efetuados com sucesso.');
                                resolve();
                            }
                        });
                    } else {
                        console.log("Tabela Tipos pagamento já possui lançamentos");
                        resolve();
                    }
                }
            );
        });

        await new Promise((resolve, reject) => {
            tempConnection.query(
                `SELECT COUNT(*) AS count FROM ${process.env.MYSQL_DATABASE}.categorias;`,
                (error, results) => {
                    if (error) {
                        reject(new Error('Erro ao executar a consulta COUNT CATEGORIAS: ' + error));
                    }
    
                    const contadorTabelaCategorias = results[0].count;
    
                    if (contadorTabelaCategorias === 0) {
                        console.log('Tabela Categorias está vazia. Inserindo dados...');
                        tempConnection.query(insertValuesCategorias, (error) => {
                            if (error) {
                                reject(new Error('Erro ao executar as queries de inserção de valores na tabela Categoria: ' + error));
                            } else {
                                console.log('Inserção de valores na tabela Categoria efetuados com sucesso.');
                                resolve();
                            }
                        });
                    } else {
                        console.log("Tabela Despesas já possui lançamentos");
                        resolve();
                    }
                }
            );
        });
    } catch (error) {
        console.error('Erro durante o processo:', error);
    } finally {
        tempConnection.end();
    }
}

module.exports = dbInitializer;