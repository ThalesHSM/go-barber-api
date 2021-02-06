import AppError from "@shared/errors/AppError";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/fakeHashProvider";
import AuthenticateUserService from "./AuthenticateUserService";
import CreateUserService from "./CreateUserService";

describe("AuthenticateUser", () => {
  it("Should be able to authenticate a user", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const user = await createUser.execute({
      name: "Thales",
      email: "abc@abc.com",
      password: "123123",
    });

    const response = await authenticateUser.execute({
      email: "abc@abc.com",
      password: "123123",
    });

    expect(response).toHaveProperty("token");
    expect(response.user).toEqual(user);
  });

  it("Should not be able to authenticate with non existing user", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    expect(
      authenticateUser.execute({
        email: "abc@abc.com",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to authenticate with wrong password", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    await createUser.execute({
      name: "Thales",
      email: "abc@abc.com",
      password: "123123",
    });

    expect(
      authenticateUser.execute({
        email: "abc@abc.com",
        password: "This isn't the password you're looking for...",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
