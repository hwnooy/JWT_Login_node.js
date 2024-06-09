import prisma from "../db_client/prisma_client.js";

async function findUserByUsername(username) {
  return prisma.admin.findFirst({
    where : {username:username}
  })
}

async function findUserById(id) {
  return prisma.admin.findFirst({
    where : {id:id}
  })
}

async function addUser(username, hashedPassword) {
  const newUser = await prisma.admin.create({
    data: {
      username: username,
      password: hashedPassword,
    },
  });
  return newUser;
}

export { findUserByUsername, findUserById, addUser };
