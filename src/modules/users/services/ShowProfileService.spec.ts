import AppError from "@shared/errors/AppError";

import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import ShowProfileService from "@modules/users/services/ShowProfileService";

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe("SendForgotPasswordEmail", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it("Should be able to show the profile", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "abc@abc.com",
      password: "123123",
    });
    const profile = await showProfileService.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe("John Doe");
    expect(profile.email).toBe("abc@abc.com");
  });
  it("Should not be able to show the profile from non existing user", async () => {
    expect(
      showProfileService.execute({
        user_id: "Non existing user id",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
