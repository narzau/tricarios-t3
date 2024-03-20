import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient()

async function main() {
  try {
    // Create the initial product
    const user = await prisma.user.upsert({
      where: { email: 'admin@admin.com' },
      update: {},
      create: {
        email: 'admin@admin.com',
        name: 'Alice',
        password: await bcrypt.hash('admin', 10),
        basedProducts: {
          create: {
            displayName: 'Alice Product',
            brand: 'Alice Brand',
            code: 'ALICE',
            model: 'Alice Model',
            boughtProducts: {
              create: {
                price: 100,
                quantity: 20,
                createdBy: {
                  connect: {
                    email: 'admin@admin.com',
                  },
                },
              },
            },
            stockedProducts: {
              create: {
                stock: 20,
                discountPercentage: 0,
                listPrice: 100,
              },
            },
          },
        },
      },
    })

    for (let i = 1; i <= 20; i++) {
      const displayName = `Product ${i}`;
      const brand = `Brand ${i}`;
      const code = `CODE${i}`;
      const model = `Model ${i}`;

      const baseProduct = await prisma.baseProduct.create({
        data: {
          displayName: displayName,
          brand: brand,
          code: code,
          model: model,
          createdBy: {
            connect: {
              email: 'admin@admin.com',
            },
          },
        },
      });

      // Create corresponding bought product for the base product
      const randomPrice = Math.floor(Math.random() * 1000) + 1; // Random price between 1 and 1000
      const randomQuantity = Math.floor(Math.random() * 50) + 1; // Random quantity between 1 and 50
      await prisma.boughtProduct.create({
        data: {
          price: randomPrice,
          quantity: randomQuantity,
          productId: baseProduct.id,
          createdById: user.id
        },
      });

      // Create corresponding stocked product for the base product
      await prisma.stockedProduct.create({
        data: {
          stock: randomQuantity,
          discountPercentage: 0,
          listPrice: randomPrice,
          productId: baseProduct.id,
        },
      });
    }

    console.log('Seed data added successfully')
  } catch (error) {
    console.error('Error adding seed data:', error)
  } finally {
    await prisma.$disconnect()
  }
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })