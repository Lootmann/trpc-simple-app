import { prisma } from "../utils/prisma";

export const getAllUsers = async () => {
  return prisma.user.findMany();
};

export const getUserById = async (userId: number) => {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
};

export const getUserByName = async (username: string) => {
  return prisma.user.findFirst({
    where: {
      name: username,
    },
  });
};

export const getUserByPassword = async (username: string, password: string) => {
  return prisma.user.findFirst({
    where: {
      name: username,
      password: password,
    },
  });
};

export const createUser = async (name: string, password: string) => {
  return prisma.user.create({
    data: {
      name: name,
      password: password,
    },
  });
};
