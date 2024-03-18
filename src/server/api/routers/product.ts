import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  addProductToInventory: protectedProcedure
    .input(z.object({
      productId: z.number().optional(),
      displayName: z.string(),
      brand: z.string().optional(),
      model: z.string().optional(),
      code: z.string().optional(),
      quantity: z.number(),
      price: z.number().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      let product;
      if (input.productId) {
        product = await ctx.db.baseProduct.findUnique({
          where: { id: input.productId },
        });
      } 
      if (!product) {
        product = await ctx.db.baseProduct.create({
          data: {
            displayName: input.displayName,
            brand: input.brand,
            model: input.model,
            code: input.code,
            createdById: ctx.session.user.id,
          },
        });
      }
      await ctx.db.boughtProduct.create({
        data: {
          productId: product.id,
          quantity: input.quantity,
          price: input.price,
          createdById: ctx.session.user.id,
        },
      });
      await ctx.db.stockedProduct.upsert({
        create: {
          productId: product.id,
          stock: input.quantity,
          discountPercentage: 0,
          listPrice: 0
        },
        update: {
          stock: {
            increment: input.quantity,
          },
        },
        where: {
          productId: product.id,
        },
      });
    }),
  getPaginatedBaseProducts: protectedProcedure
    .input(z.object({ 
      skip: z.number().default(0), 
      take: z.number().default(10),
      nameFilter: z.string().optional(),
    }).optional())
    .query(async ({ ctx, input }) => {
      return await ctx.db.baseProduct.findMany({
        skip: input?.skip,
        take: input?.take,
        where: {
          displayName: {
            contains: input?.nameFilter,
            mode: "insensitive",
          },
        },
      });
    }),
  getBaseProductById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.baseProduct.findUnique({
        where: { id: input.id },
      });
    }),
  getPaginatedInventory: protectedProcedure
    .input(z.object({ 
      skip: z.number().default(0), 
      take: z.number().default(10),
      nameFilter: z.string().optional(),
    }).optional())
    .query(async ({ ctx, input }) => {
      return await ctx.db.stockedProduct.findMany({
        skip: input?.skip,
        take: input?.take,
        where: {
          product: {
            displayName: {
              contains: input?.nameFilter,
              mode: "insensitive",
            },
          },
        },
        include: { product: true },
      });
    }),
  updateStockedProduct: protectedProcedure
    .input(z.object({
      id: z.number(),
      discountPercentage: z.number().optional(),
      listPrice: z.number().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.stockedProduct.update({
        where: { 
          productId: input.id,
        },
        data: {
          discountPercentage: input.discountPercentage ?? undefined,
          listPrice: input.listPrice ?? undefined,
        },
      });
    }),
});