## Infinity Medical Academy

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tools

backend:
apollo server with nexus (graphql)
postgresql, prisma
next-auth

frontend:
react, next js
apollo client
mantine
tailwindcss

after modifying prisma schema:
1 run pal g to generate nexus types
2 open the /api/graphql end point to generate the graphql input types
3 run npm run codegen go generate the graphql operations types
