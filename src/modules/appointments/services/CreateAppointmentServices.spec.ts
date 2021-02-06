import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentsRepository";
import CreateAppointmentService from "./CreateAppointmentServices";
import AppError from "@shared/errors/AppError";

describe("CreateAppointment", () => {
  it("Should be able to create a new appointment", async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: "123123",
    });

    expect(appointment).toHaveProperty("id");
    expect(appointment.provider_id).toBe("123123");
  });

  it("Should not be able to create two appointments on the same time", async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository
    );

    const appointmentDate = new Date(2021, 6, 2, 17);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: "123123",
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: "123123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});