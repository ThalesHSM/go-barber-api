import ICreateNotificationDto from "../dtos/ICreateNotificationDto";
import Notification from "../infra/typeorm/schemas/Notification";

export default interface INotificationRepository {
  create(data: ICreateNotificationDto): Promise<Notification>;
}
