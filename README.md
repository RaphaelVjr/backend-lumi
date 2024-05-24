![](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![https://www.linkedin.com/in/raphaelvitorio/](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)

![Stars](https://img.shields.io/github/stars/{username}/{repo-name}.svg)

# Extração e Exibição de dados de Fatura de Luz :zap:

Projeto designado a extrair dados dos extratos das faturas de luz, organizá-los e aplicar regras para exibição dos mesmos em gráficos onde podemos distinguir a comparação dos valores.

## Critérios de aceite

Exiba as principais variáveis da fatura de energia elétrica ao longo do tempo.
Variáveis a serem exibidas:

      - ✅ Consumo de Energia Elétrica (kWh) – somatório das variáveis ‘Energia Elétrica kWh’ + ‘Energia SCEEE s/ICMS kWh’
 
      - ✅ Energia Compensada (kWh) – variável **Energia Compensada GD I kWh**.

      - ✅ Valor Total sem GD (R$) – somatório dos valores faturados de ‘Energia Elétrica R$’,
 
      - ✅ Energia SCEEE s/ICMS R$’, ‘Contribuição Iluminação Pública Municipal R$’ Economia GD (R$) – corresponde à ‘Energia Compensada GD I R$’

      - ✅ Os valores devem ser expressos em gráficos, com a possibilidade de filtrar pelo ‘No DO CLIENTE’.





## Tecnologias Utilizadas 💻
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) 
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-14354C?style=for-the-badge&logo=python&logoColor=white)
![Mocha.js](https://img.shields.io/badge/mocha.js-323330?style=for-the-badge&logo=mocha&logoColor=Brown)
![Chai.js](https://img.shields.io/badge/chai.js-323330?style=for-the-badge&logo=chai&logoColor=red)
![Sinon](https://img.shields.io/badge/sinon.js-323330?style=for-the-badge&logo=sinon)


## Instalação :hammer_and_wrench:
Siga todos os passos para rodar o projeto localmente.

#### Passo 1 - Pré Requisitos:

- **Postgres 16**
- **Node**
- **NPM ou YARN**
- **Python3 & pip3**

```bash
  git clone https://github.com/RaphaelVjr/backend-lumi.git
```

Entre no diretório do projeto

Instale as dependências! Dentro da pasta do projeto execute: 
```sh
npm install
```

#### Passo 2 - Configuração do banco de dados :lock:


- No diretório do projeto crie um arquivo .env
- Tenha o seu usuário e senha do Postgres.
- Dentro do arquivo você irá colar e preencher os seguintes dados: 
```sh
DATABASE_URL=""
DATABASE_USER=""
DATABASE_HOST=""
DATABASE_PASSWORD=""
DATABASE_PORT="5432"
```
- Execute o pgAdmin e crie um servidor:
(Imagem)
- Na aba de connection, insira o endereço do banco como **localhost** coloque seu usuário e senha cadastrado no postgres e aperte em **Save** para efetuar a conexão.

#### Passo 3 - Migrar Schema do PRISMA

- Voltando ao diretório, execute o comando para gerar os schemas:

```sh
prisma generate
```
- Dê refresh no banco e cheque no public > Schemas > Tables, se possui uma tabela chamada faturas.

#### Passo 4 - Instalar requisitos para o Python Scrapper e rodar o Script.

- Dentro do diretório do projeto digite: 

```sh
pip install -r requirements.txt
```

- Cheque se não ocorreu qualquer erro ao instalar alguma das dependências. Certifique de ter o pip3 e o Python3.
- Coloque as faturas PDF dentro da pasta faturas do projeto.
- Após isso execute o comando para rodar o scrapper de pdf:
```sh
python script.py
```
- Ele irá realizar a leitura dos PDF's na pasta Faturas, organizar os dados e inserir no banco. (Pode retornar logs de erro, porém são logs falso negativo. Ele realiza a leitura algumas vezes para coletar todos dados necessários, os dados chegarão íntegros ao banco)
Obs: Faturas que não possuem os dados necessários retornam valor 0 para evitar erros de leitura.

#### Último passo - Rodar o projeto

```sh
npm start
```
Irá iniciar rodando na porta 3000, cheque se a mesma não está em uso.



## Features futuras :rocket:

- Autenticação JWT


## Documentação da API (Swagger Doc) :books:

- http://localhost:3000/api-doc (Local)
- https://backend-lumi.vercel.app/api-doc (Prod)



## Rodando Testes :traffic_light:

Para rodar os testes utilizando o o mocha basta digitar no terminal:

```bash
  npm run test
```
Testes foram feitos utilizando Mocha, Chai e Sinon.


## Adicionais do projeto

- :rotating_light: Watchdog python script para observar a entrada de arquivos importados e triggar o scrapper para ler o arquivo PDF novo e adicioná-lo ao banco.
- Rota para importar os arquivos PDF e salvá-los.

## Deploy

Deploy feito na Vercel com o banco PostgreSQL na Vercel também.


![Love](http://ForTheBadge.com/images/badges/built-with-love.svg)
