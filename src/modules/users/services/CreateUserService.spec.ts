import AppError from "@shared/errors/AppError";

import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/fakeHashProvider";
import CreateUserService from "./CreateUserService";

describe("CreateUser", () => {
  it("Should be able to create a new user", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const user = await createUser.execute({
      name: "Thales",
      email: "abc@abc.com",
      password: "123123",
    });

    expect(user).toHaveProperty("id");
  });

  it("Should not be able to create a new user with the same email", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    await createUser.execute({
      name: "Thales",
      email: "abc@abc.com",
      password: "123123",
    });

    expect(
      createUser.execute({
        name: "Thales",
        email: "abc@abc.com",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});