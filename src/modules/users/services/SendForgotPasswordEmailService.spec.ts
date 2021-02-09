import AppError from "@shared/errors/AppError";

import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeMailProvider from "@shared/container/providers/MailProvider/fakes/FakeMailProvider";
import SendForgotPasswordEmailService from "./SendForgotPasswordEmailService";
import FakeUserTokensRepository from "../repositories/fakes/FakeUserTokenRepository";

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe("SendForgotPasswordEmail", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository
    );
  });

  it("Should be able to recover the password using the email", async () => {
    const sendMail = jest.spyOn(fakeMailProvider, "sendMail");
    await fakeUsersRepository.create({
      name: "John Doe",
      email: "abc@abc.com",
      password: "123123",
    });

    await sendForgotPasswordEmail.execute({
      email: "abc@abc.com",
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it("Should not be able to recover a non-existing-user's password", async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: "abc@abc.com",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should generate a forgot password token", async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, "generate");
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "abc@abc.com",
      password: "123123",
    });

    await sendForgotPasswordEmail.execute({
      email: "abc@abc.com",
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
