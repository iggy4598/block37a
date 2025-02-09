const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();

module.exports = {
  prisma,
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || '1234',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres:45982217@localhost:5432/37a'
};