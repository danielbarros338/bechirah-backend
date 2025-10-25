<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Bechirah - Backend

Bem-vindo ao repositório backend do projeto Bechirah. Este serviço é uma API REST construída com NestJS que implementa princípios de arquitetura limpa/hexagonal e DDD (Domain-Driven Design) para manter separação de responsabilidades, testabilidade e fácil evolução.

## Visão geral

O backend expõe endpoints para gestão de usuários, autenticação, currículos e vagas de emprego. Foi desenvolvido com foco em organização por camadas, reuso e isolamento de infraestrutura (ORM, HTTP) por meio de portas e adaptadores.

Tecnologias principais
- Node.js + TypeScript
- NestJS (framework)
- TypeORM (ORM)
- MySQL (conforme `src/config/database/typeorm.config.ts` — variável de ambiente configurável)
- Jest (testes)

## Arquitetura adotada

O projeto segue uma mistura de Clean Architecture / Hexagonal com influências de DDD:

- Módulos por domínio: cada grande domínio tem seu próprio módulo em `src/modules/*` (por exemplo `users`, `auth`, `curriculums`, `jobs`).
- Camadas dentro de cada módulo:
  - domain: entidades e value objects (ex.: `src/modules/users/domain/entities`)
  - application: casos de uso, DTOs e portas (interfaces) que definem comportamentos independentes de infra
  - infra: adaptadores concretos (controllers HTTP, repositórios TypeORM, mappers, orm-entities)

- Ports & Adapters: portas (interfaces) ficam em `application/ports` e implementações em `infra/repository` — isso permite trocar o banco sem afetar regras de negócio.
- Configurações compartilhadas estão em `src/config` (CORS, database, JWT). O JWT é registrado como módulo global (`src/config/jwt/jwt.module.ts`).

Benefícios desta abordagem
- Independência entre regras de negócio e detalhes de infraestrutura.
- Testabilidade dos casos de uso (podem ser testados substituindo adaptadores por mocks).
- Código organizado e fácil de navegar por domínio.

## Estrutura de pastas (resumido)

- src/
  - modules/
    - users/
      - domain/ (entidades, value objects)
      - application/ (use-cases, dtos, ports)
      - infra/ (controllers, repositories, orm-entities, mappers)
    - auth/
    - curriculums/
    - jobs/
  - config/ (database, cors, jwt)
  - shared/ (utilitários, value objects comuns, dtos)

Exemplo: `src/modules/users/application/ports/UserRepository.port.ts` define a interface de repositório; `src/modules/users/infra/repository/User.repository.ts` implementa essa interface usando TypeORM.

## Variáveis de ambiente (principais)

Configure um arquivo `.env` com, pelo menos, as seguintes variáveis:

- DB_HOST — host do banco
- DB_PORT — porta (ex: 3306)
- DB_USER — usuário do banco
- DB_PASSWORD — senha do banco
- DB_DATABASE — nome do banco
- JWT_SECRET — segredo para assinatura de tokens
- JWT_EXPIRES — tempo de expiração (ex: "1h")

Observação: algumas opções do TypeORM (synchronize, migrationsRun) estão definidas diretamente no arquivo de configuração e marcadas como TODO para torná-las configuráveis por ambiente.

## Como rodar (desenvolvimento)

1. Instale dependências:

```powershell
yarn install
```

2. Defina as variáveis de ambiente (crie `.env` na raiz).

3. Inicie em modo de desenvolvimento (watch):

```powershell
yarn start:dev
```

Scripts (conforme `package.json`): `start`, `start:dev`, `start:prod`, `build`, `test`, `test:e2e`, `lint`, `format`.

## Testes

- Testes unitários: `yarn test`
- Testes E2E: `yarn test:e2e`

Recomenda-se escrever testes para os casos de uso (application) substituindo dependências por doubles/mocks.

## Contribuindo / Convenções

- Siga a estrutura de módulos por domínio.
- Regras de negócio ficam em `domain` e `application`.
- Não colocar lógica de negócio diretamente em controllers ou entidades do ORM.
- Use DTOs para entrada/saída de casos de uso e controllers.

## Próximos passos recomendados

- Tornar `synchronize` e `migrationsRun` configuráveis via variáveis de ambiente.
- Adicionar scripts de migração e um processo de deploy (CI/CD).
- Cobertura de testes para casos de uso críticas (autenticação, criação de usuários, fluxo de vagas).

## Contato

Para dúvidas ou acesso ao time: consulte o repositório remoto ou o time responsável pelo projeto.

---

Arquivo gerado automaticamente como README do repositório backend do projeto Bechirah. Se quiser, faço uma versão mais curta (para o GitHub) ou uma versão em inglês.

## Licença

Este repositório está coberto por uma licença personalizada da Logos Next Consultoria e Tecnologia. Consulte o arquivo `LICENSE.md` na raiz do repositório para o texto completo. Em resumo: o uso não-comercial do código é permitido; qualquer Uso Comercial (venda, prestação de serviços pagos, integração em produto comercial, distribuição com finalidade comercial, ou outra exploração econômica) é proibido sem autorização prévia e por escrito da Logos Next (CNPJ: 63.182.351/0001-80).

Se você ou sua organização têm interesse em uma licença comercial, siga as instruções em `LICENSE.md` para solicitar autorização ou entre em contato com os mantenedores do repositório para orientação sobre o processo de licenciamento.
