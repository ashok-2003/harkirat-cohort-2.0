docker-compose up -d
echo 'wating for database to be ready'
./scripts/wait-for-it.sh "postgresql://postgres:password@localhost:5433/postgres" --
echo 'Database is ready'
npx prisma migrate dev --name init
npm run test
docker-compose down