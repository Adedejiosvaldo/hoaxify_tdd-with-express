import request from "supertest";
import app from "../src/app";

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
  });
  it("returns sucess message  when the signup request is valid ", (done) => {
    request(app)
      .post("/api/v1/user/signup")
      .send({
        username: "user1",
        email: "emai",
        password: "password",
      })
      .then((response) => {
        expect(response.body.message).toBe("User created sucessfully");
        done();
      });
  });
});
