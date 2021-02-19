import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentsRepository";
import ListProviderAppointmentService from "./ListProviderAppointmentService";

let listProviderAppointments: ListProviderAppointmentService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe("ListProviderAppointments", () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointments = new ListProviderAppointmentService(
      fakeAppointmentsRepository
    );
  });

  it("Should be able to list the appointments on a specific day", async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      user_id: "user_id",
      provider_id: "provider_id",
      date: new Date(2021, 4, 20, 14, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      user_id: "user_id",
      provider_id: "provider_id",
      date: new Date(2021, 4, 20, 15, 0, 0),
    });

    const availability = await listProviderAppointments.execute({
      provider_id: "provider_id",
      year: 2021,
      month: 5,
      day: 20,
    });

    expect(availability).toEqual([appointment1, appointment2]);
  });
});
