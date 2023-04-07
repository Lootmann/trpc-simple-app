import { prisma } from "../utils/prisma";

export const getAllUsers = async () => {
  return prisma.user.findMany();
};

export const createUser = async (name: string, password: string) => {
  return prisma.user.create({
    data: {
      name: name,
      password: password,
    },
  });
};
