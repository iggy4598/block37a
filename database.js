const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();

const createUser = async (username, password) => {
  return await prisma.user.create({
    data: {
      username,
      password
    }
  });
};
const loginUser = async (username, password) => {
  return await prisma.user.findFirst({
    where: {
      username,
      password
    }
  });
};
const getUser = async (id) => {
  return await prisma.user.findUnique({
    where: { id }
  });
};


module.exports = {
  prisma,
  createUser,
  loginUser,
  getUser,
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || '1234',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres:45982217@localhost:5432/37a'
};