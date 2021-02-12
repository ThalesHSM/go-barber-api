import AppError from "@shared/errors/AppError";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/fakeHashProvider";
import AuthenticateUserService from "./AuthenticateUserService";
import CreateUserService from "./CreateUserService";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe("AuthenticateUser", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it("Should be able to authenticate a user", async () => {
    const user = await createUser.execute({
      name: "John Doe",
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
    await expect(
      authenticateUser.execute({
        email: "abc@abc.com",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to authenticate with wrong password", async () => {
    await createUser.execute({
      name: "John Doe",
      email: "abc@abc.com",
      password: "123123",
    });

    await expect(
      authenticateUser.execute({
        email: "abc@abc.com",
        password: "This isn't the password you're looking for...",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
