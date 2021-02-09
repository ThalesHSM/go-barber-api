import AppError from "@shared/errors/AppError";

import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeStorageProvider from "@shared/container/providers/StorageProvider/fakes/FakeStorageProvider";
import UpdateUserAvatarService from "@modules/users/services/UpdateUserAvatarService";

describe("UpdateUserAvatar", () => {
  it("Should be able to update avatar", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    );

    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "abc@abc.com",
      password: "123123",
    });

    await updateUserAvatarService.execute({
      avatarFilename: "avatar.jpg",
      user_id: user.id,
    });

    expect(user.avatar).toBe("avatar.jpg");
  });

  it("Should not be able to update avatar from non existing user", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    );

    await expect(
      updateUserAvatarService.execute({
        avatarFilename: "avatar.jpg",
        user_id: "non existing user",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should delete old avatar when updating new one", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, "deleteFile");

    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    );

    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "abc@abc.com",
      password: "123123",
    });

    await updateUserAvatarService.execute({
      avatarFilename: "avatar.jpg",
      user_id: user.id,
    });

    await updateUserAvatarService.execute({
      avatarFilename: "avatar2.jpg",
      user_id: user.id,
    });

    expect(deleteFile).toHaveBeenCalledWith("avatar.jpg");

    expect(user.avatar).toBe("avatar2.jpg");
  });
});
