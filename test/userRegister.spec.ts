import request from "supertest";
import app from "../src/app";
import prisma from "../src/prisma";

beforeAll(async () => {
  await prisma.$connect();
}, 10000);

beforeEach(async () => {
  await prisma.user.deleteMany();
});

describe("User Registration", () => {
  const postValidator = () => {
    return request(app).post("/api/v1/user/signup").send({
      username: "ade",
      email: "adedejiosvaldo@gail.com",
      password: "password",
    });
  };

  it("returns 200 ok when the signup request is valid ", async () => {
    // request(app)
    //   .post("/api/v1/user/signup")
    //   .send({
    //     username: "user1",
    //     email: "emai",
    //     password: "password",
    //   })
    const response = await postValidator();
    expect(response.status).toBe(200);
  });

  it("returns sucess message  when the signup request is valid ", async () => {
    const response = await postValidator();
    expect(response.body.message).toBe("User created sucessfully");
  }, 10000);

  it("Saves the user to the database", async () => {
    await postValidator();
    const users = await prisma.user.findMany();
    expect(users.length).toBe(1);
  });

  it("Saves the username and password to the database", async () => {
    await postValidator();
    const userList = await prisma.user.findMany();
    const user = userList[0];
    expect(user.username).toBe("ade");
    expect(user.password).not.toBe("password");
  });

  it("Hashes the password before saving to database", async () => {
    await postValidator();
    const userList = await prisma.user.findMany();
    const user = userList[0];

    expect(user.password).not.toBe("password");
  });
});
