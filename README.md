# Version 1.1 (Update 17/10/2023)
## Install package dependencies
```
npm install
```

## Setting Up
### local env set up
Create file .env.local at root dir
```
SERVERHOST=http://localhost:3000
AI_URL=http://localhost:8000/claim
```

### NextAuth set up (Currently not work)
Run the command to get the code
```
$ openssl rand -base64 32
```

Create file .env.local at root dir (skip if created)
```
NEXTAUTH_SECRET=[The result created by the previous command]
```

### Prisma set up
<div style="color: #cc3300">Your need to create a Postgres database first for Prisma connection</div>

Create **.env** file in **root dir**
```
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA
```

Prisma first migration
```
npx prisma migrate dev --name init
```

Run prisma Studio to see the database UI
```
npx prisma studio
```

Run the seed file
```
npx prisma db seed
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.