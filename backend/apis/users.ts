import { prisma } from "../utils/prisma";

export const getAllUsers = async () => {
  return prisma.user.findMany();
};
