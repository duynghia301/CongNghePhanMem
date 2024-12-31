const { PrismaClient } = require('@prisma/client');
const database = new PrismaClient();

async function main() {
    try {
        await database.category.createMany({
            data: [
                { name: 'Nội thất cho thuê' },
                { name: 'Nội thất trống'},
                { name: 'Nội thất thường'},
                { name: 'Nội thất cao cấp'}


         
            ],
        });
    } catch (error) {
        console.log('ERROR seeding the database categories', error);
    } finally {
        await database.$disconnect();
    }
}

main();
