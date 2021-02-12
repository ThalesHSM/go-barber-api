import AppError from "@shared/errors/AppError";

import FakeHashProvider from "../providers/HashProvider/fakes/fakeHashProvider";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import UpdateProfileService from "@modules/users/services/UpdateProfileService";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe("SendForgotPasswordEmail", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it("Should be able to update the profile", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "abc@abc.com",
      password: "123123",
    });
    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: "Thales",
      email: "JohnDoe@example.com",
    });

    expect(updatedUser.name).toBe("Thales");
    expect(updatedUser.email).toBe("JohnDoe@example.com");
  });

  it("Should not be able to show the profile from non existing user", async () => {
    expect(
      updateProfileService.execute({
        user_id: "Non existing user id",
        name: "Test",
        email: "Test@email.com",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to change to another user email", async () => {
    await fakeUsersRepository.create({
      name: "John Doe",
      email: "abc@abc.com",
      password: "123123",
    });
    const user = await fakeUsersRepository.create({
      name: "Test",
      email: "test@example.com",
      password: "123123",
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: "John Doe",
        email: "abc@abc.com",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should be to update password", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "abc@abc.com",
      password: "123123",
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: "Thales",
      email: "test@example.com",
      old_password: "123123",
      password: "123456",
    });

    expect(updatedUser.password).toBe("123456");
  });

  it("Should not be able to update the password without old password", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "abc@abc.com",
      password: "123123",
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: "Thales",
        email: "test@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  it("Should not be able to update the password with wrong old password", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "abc@abc.com",
      password: "123123",
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: "Thales",
        email: "test@example.com",
        old_password: "Wrong Password",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
