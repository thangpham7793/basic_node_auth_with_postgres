const { api } = require("./testHelpers");
const user = require("../model/user");

describe("POST /signup route", () => {
  beforeEach(async () => {
    await user.truncate();
  });

  test("should return the saved user if all params are valid", async () => {
    const params = {
      email: "valid_email@domain.com",
      username: "valid_username",
      password: "valid_password",
    };
    const { body } = await api.post("/signup").send(params);
    expect(body).toHaveProperty("user_id");
    delete body.user_id;
    expect(body).toEqual(params);
  });

  afterAll(async () => {
    await user.shutdown();
  });
});
