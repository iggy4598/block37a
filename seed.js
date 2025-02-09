const { prisma } = require("./database");

async function seed() {
  await prisma.comment.deleteMany({});
  await prisma.review.deleteMany({});
  await prisma.item.deleteMany({});
  await prisma.user.deleteMany({});

  const iggy = await prisma.user.create({
    data: { username: "iggy", password: "jura" },
  });

  const burritos = await prisma.item.create({ data: { name: "burritos" } });

  const review = await prisma.review.create({
    data: {
      reviewText: "WOW!",
      rating: 2,
      userId: iggy.id,
      itemId: burritos.id,
    },
  });

  await prisma.comment.create({
    data: {
      content: "same!",
      userId: iggy.id,
      reviewId: review.id,
    },
  });

  console.log("Database seeded");
}

seed();

module.exports = seed;
