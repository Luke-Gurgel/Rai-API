## Antes de começar (pré-requisitos)
- Docker
- docker compose CLI
- arquivo `.env` (peça a Lucas)

Tudo, exceto commandos Git, deve ser feito dentro do Docker container.

## Rodando a aplicação
1. Use o script `startup.sh` dentro da pasta `scripts` para iniciar o Docker container e entrar nele. Na primeira vez, vc talvez precise alterar as permissões desse script.

```
chmod +x ./scripts/startup.sh && ./scripts/startup.sh
```

2. Uma vez que estiver dentro do container, use o comando `npm run db:migrate` para rodar as migrations no banco de dados.

3. Use o comando `npm run dev` para rodar a aplicação na porta 8080.

## Tecnologias principais

#### Web Framework
- [fastify](https://fastify.dev/docs/latest/)

#### Database
- [postgres](https://www.postgresql.org/)

#### SQL Query Builder
- [kysely](https://kysely.dev/docs/intro)

#### Testing
- [vitest](https://vitest.dev/guide/)

## Design Patterns

#### Routers
Dentro da pasta `routes` se encontram os routers que compõem a API e oferecem acesso aos recursos. Os propósitos de um router são: 
- definir as rotas dos recursos
- configurar as rotas (middleware, schema validation, etc)
- invocar o Controller do recurso em questão, ex.: `materialController`

#### Controllers
Controllers são responsáveis por lidar com as requests, ex.: validar o request body, definir a response e invocar os módulos que implementam os `use cases`.

#### Use Cases
Os use cases são responsáveis pelas regras de negócio, são o coração da aplicação. 

#### Repositories
Esses módulos formam a camada de persistência de dados. Nenhum outro módulo deve ter acesso ao banco de dados.

## Banco de Dados

### Migrations

Cada mudança nas entidades e estruturas de dados requer uma nova migration. Isso permite o versionamento do banco de dados e fornece um caminho exato de como construí-lo do zero até o estado atual. 

As migrations são guardadas em `database/migrations` e cada arquivo se refere a uma migration específica. Uma vez criado, o nome do arquivo não deve ser alterado.

#### Criando uma nova migration

Use o comando `db:create-migration <nome-da-migration>` para criar uma nova migration a fim de fazer alguma mudança (criar tabela, adicionar coluna, etc). É preciso passar um nome para a migration, que deve refletir o que ela faz. Observe os exemplos abaixo:

```sh
npm run db:create-migration create-client-table
npm run db:create-migration add-last-purchase-date-column
```

#### Rodando as migrations

Use os seguintes comandos:

```sh
# roda todas as migrations que ainda não foram executadas
npm run db:migrate 

# executa a próxima migration que ainda não foi executada
npm run db:migrate up

# desfaz a última migration
npm run db:migrate down
```

### Seeders

Para preencher o banco de dados com dados de teste, basta usar os seeders. 

```sh
# roda todos os seeders
npm run db:seed

# deleta todos os dados das tabelas
npm run db:seed down

# é possível rodar um seeder específico também
# basta passar um argumento que indica se é pra aplicar ou desfazer o seeder
npx tsx database/seeders/material.ts up # aplica o seeder
npx tsx database/seeders/material.ts down # desfazer o seeder
```

Obs.: Nenhuma lógica foi implementada para rodar os seeders, então se rodá-los 2 vezes, vai dar erro. Caso um novo seeder seja adicionado, há 2 opções: 
  1. Esvaziar as tabelas com `npm run db:seed down` e depois preenchê-las com `npm run db:seed`
  2. Executar somente o seeder específico

## Gerando uma Build
Para gerar uma build de produção, basta rodar o comando `npm run build` e um novo diretório `dist` surgirá com o código já transformado em Javascript que o Nodejs consegue entender. Ao usar o comando `node dist/server.js`, a aplicação começará a rodar.

## Rodando os Testes
Use o comando `npm test` para rodar todos os testes. Caso queira rodar apenas um arquivo de teste, basta passar o nome do arquivo para o comando, ex.: `npm test someService.test.ts`.
