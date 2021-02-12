import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import ListProviderService from "./ListProviderService";

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProviderService;

describe("ListProviders", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProviderService(fakeUsersRepository);
  });

  it("Should be able to list the providers", async () => {
    const user1 = await fakeUsersRepository.create({
      name: "John Doe",
      email: "abc@abc.com",
      password: "123123",
    });

    const user2 = await fakeUsersRepository.create({
      name: "John John",
      email: "Example@abc.com",
      password: "123123",
    });

    const loggedUser = await fakeUsersRepository.create({
      name: "Thales",
      email: "Test@abc.com",
      password: "123123",
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
