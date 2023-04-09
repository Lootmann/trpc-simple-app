# tRPC auth

簡単な Auth, protectedProcedure<br>
Prisma のテストなど云々

## Backend

- express
- prisma
- trpc
- zod

## Frontend

- React
- React-Router

## Routing

とにかく簡潔に

- /auth
  - `POST /login` (with faketoken)
  - `POST /signup` (with faketoken)
  - `GET  /me` (profile?)
- /posts
  - `GET   /`
  - `POST  /`
  - `GET   /:postId`
  - `PATCH /:postId`
  - `DEL   /:postId`

## Model

- User
  - id
  - email
  - name(nickname)
  - password(plain-text)
  - posts @relation
- Post
  - id
  - title
  - content
  - userId @relation

## TODO

- [x] header with authentications
  - https://trpc.io/docs/server/authorization
  - 1. Frontend:Header Login -> set token
  - 2. Backend:Context, Router -> get `{ authorization: <token> }`
  - 3. Backend:Context -> validate token -> useAuth :^)
- [ ] header authorization using JWT
  - [ ] 1. JWT needs `header`, `payload`, `secret key`
  - [ ] 2. store in memory
  - [ ] 3. needs both accessToken and refreshToken, refreshToken should be in Cookies
  - [ ] 4. create new api named `/auth/refresh`, and overwrite accesstoken expired
