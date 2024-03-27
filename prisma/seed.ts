import * as fs from 'fs';
import csvParser from 'csv-parser';
import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcrypt';

interface Product {
    code?: string;
    name: string;
    price: number;
    wholesalePrice: number;
}

interface Category {
    name: string;
    products: Product[];
}

const prisma = new PrismaClient();

async function main() {
    try {
        // Create the initial user
        const user: User = await prisma.user.upsert({
            where: { email: 'admin@admin.com' },
            update: {},
            create: {
                email: 'admin@admin.com',
                name: 'Alice',
                password: await bcrypt.hash('admin', 10),
            },
        });

        // Read the CSV file and parse categories and products
        const categories: Category[] = [];
        let currentCategory: Category | null = null;

        fs.createReadStream('prisma/raw_data.csv')
            .pipe(csvParser())
            .on('data', (row: { CODIGO: string, 'ARTICULO / CATEGORIA': string, PRECIO: string, 'PRECIO MAYORISTA': string }) => {
                const { CODIGO, 'ARTICULO / CATEGORIA': articleCategory, PRECIO, 'PRECIO MAYORISTA': wholesalePrice } = row;
                
                if (CODIGO === 'CAT') {
                    // If the row represents a category, create a new category object
                    const category: Category = {
                        name: articleCategory,
                        products: []
                    };
                    categories.push(category);
                    currentCategory = category;
                } else {
                      
                    // If the row represents a product, add it to the current category's products array
                    if (currentCategory) {
                        const product: Product = {
                            code: CODIGO == 'FALSE' ? undefined : CODIGO,
                            name: articleCategory,
                            price: parseFloat(PRECIO) || 0,
                            wholesalePrice: parseFloat(wholesalePrice ?? 0)
                        };
                        currentCategory.products.push(product);
                    } else {
                        console.error('No category defined for product:', articleCategory);
                    }
                }
            })
            .on('end', async () => {
              // Seed categories and products in the database
              for (const category of categories) {
                  const dbCategory = await prisma.category.create({
                      data: {
                          name: category.name,
                          products: {
                              create: category.products.map(product => ({
                                  createdById: user.id,
                                  code: product.code == 'FALSE' || product.code == '' ? undefined : product.code,
                                  displayName: product.name,
                                  brand: '',
                                  model: '',
                                  stockedProducts: { 
                                      create: { 
                                          stock: 0, 
                                          listPrice: product.price,
                                          discountPercentage: 0,
                                      }
                                  }
                              }))
                          }
                      },
                      include: { products: true }
                  });
                  console.log('Category seeded:', dbCategory);
              }
          
              console.log('Seed data added successfully');
          });

    } catch (error) {
        console.error('Error adding seed data:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main()
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
