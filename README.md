# Kuku

## Запуск

```bash
docker compose up -d
nvm use
npm ci
cd packages/api && npx prisma migrate dev
npm run -w @kuku/api seed
npm run -w @kuku/api generate:gql
npm run -w @kuku/web generate:gql

# в отдельных окнах терминала
npm run -w @kuku/api dev
npm run -w @kuku/web dev
```

## Страницы

-   [GraphQL Playground](http://localhost:3000)
-   [Web](http://localhost:5173)
