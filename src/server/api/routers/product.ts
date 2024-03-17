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

  create: protectedProcedure
    .input(z.object({
      name: z.string().min(1),
      code: z.string().optional(),
      stock: z.number().default(1)
    }))
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return ctx.db.product.create({
        data: {
          name: input.name,
          code: input.code ? input.code : Math.random().toString(36).substring(7),
          stock: input.stock,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.product.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
