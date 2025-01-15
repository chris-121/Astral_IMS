import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createProduct = async (name: string|null, quantity: number) => {
  return await prisma.product.create({
    data: {
      name,
      quantity,
    },
  });
};

export const getProduct = async (id: number) => {
  return await prisma.product.findUnique({
    where: { id: id },
  });
};


export const getAllProducts = async () => {
  return await prisma.product.findMany();
};

export const updateProduct = async (id: number, name: string, quantity: number) => {
  return await prisma.product.update({
    where: { id },
    data: { name, quantity },
  });
};

export const deleteProduct = async (id: number) => {
  return await prisma.product.delete({
    where: { id },
  });
};