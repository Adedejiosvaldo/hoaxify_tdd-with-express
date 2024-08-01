import request from "supertest";
import app from "../src/app";
import prisma from "../src/prisma";

beforeAll(async () => {
  await prisma.$connect();
});

beforeEach(async () => {
  await prisma.user.deleteMany();
});

describe("User Registration", () => {
  it("returns 200 ok when the signup request is valid ", (done) => {
    request(app)
      .post("/api/v1/user/signup")
      .send({
        username: "user1",
        email: "emai",
        password: "password",
      })
      .then((response) => {
        expect(response.status).toBe(200);
        done();
      });
  }, 10000);

  it("returns sucess message  when the signup request is valid ", (done) => {
    request(app)
      .post("/api/v1/user/signup")
      .send({
        username: "user1",
        email: "email",
        password: "password",
      })
      .then((response) => {
        expect(response.body.message).toBe("User created sucessfully");
        done();
      });
  }, 10000);

  it("Saves the user to the database", (done) => {
    request(app)
      .post("/api/v1/user/signup")
      .send({
        username: "ade",
        email: "adedejiosvaldo@gail.com",
        password: "password",
      })
      .then((response) => {
        prisma.user.findMany().then((userList) => {
          expect(userList.length).toBe(1);
          done();
        });
      });
  });

  it("Saves the username and password to the database", (done) => {
    request(app)
      .post("/api/v1/user/signup")
      .send({
        username: "ade",
        email: "adedejiosvaldo@gail.com",
        password: "password",
      })
      .then((response) => {
        prisma.user.findMany().then((userList) => {
          const user = userList[0];
          expect(user.username).toBe("ade");
          expect(user.password).toBe("password");
          done();
        });
      });
  });
});
