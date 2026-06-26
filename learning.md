# After changing schema do these things 
1. npx prisma migrate dev --name add_verification_token
2. npx prisma generate (Regenerate Prisma Client)