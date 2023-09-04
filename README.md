## Antes de começar (pré-requisitos)
- Docker
- docker compose CLI

## Rodando a aplicação
1. Use o script `startup.sh` para iniciar o Docker container e entrar nele. Na primeira vez, vc talvez precise alterar as permissões desse script.

```
chmod +x ./startup.sh && ./startup.sh
```

2. Uma vez que estiver dentro do container, use o comando `npm run db:migrate` para rodar as migrations no banco de dados.

3. Use o comando `npm run dev` para rodar a aplicação na porta 8080.

## DB Migrations
Cada mudança nas entidades e estruturas de dados requer uma nova migration. Isso permite o versionamento do banco de dados e fornece um caminho exato de como construí-lo do zero até o estado atual. 

As migrations são guardadas em `database/migrations` e cada arquivo se refere a uma migration específica. Uma vez criado, o nome do arquivo não deve ser alterado.

### Criando uma nova migration

Use o comando `db:create-migration <nome-da-migration>` para criar uma nova migration a fim de fazer alguma mudança (criar tabela, adicionar coluna, etc). É preciso passar um nome para a migration, que deve refletir o que ela faz. Observe os exemplos abaixo:

```sh
npm run db:create-migration create-client-table
npm run db:create-migration add-last-purchase-date-column
```

### Rodando as migrations

Use os seguintes comandos:

```sh
# roda todas as migrations que ainda não foram executadas
npm run db:migrate 

# executa a próxima migration que ainda não foi executada
npm run db:migrate up

# desfaz a última migration
npm run db:migrate down
```

## Gerando uma Build
Para gerar uma build de produção, basta rodar o comando `npm run build` e um novo diretório `dist` surgirá com o código já transformado em Javascript que o Nodejs consegue entender. Ao usar o comando `node dist/server.js`, a aplicação começará a rodar.

## Rodando os Testes
Use o comando `npm test` para rodar todos os testes. Caso queira rodar apenas um arquivo de teste, basta passar o nome do arquivo para o comando, ex.: `npm test someService.test.ts`.

## Rodando o Prisma Studio
O Prisma Studio fornece uma interface através da qual podemos interagir com o banco de dados. Use o comando `npm run db:studio` para rodar o Prisma Studio na porta 5555.