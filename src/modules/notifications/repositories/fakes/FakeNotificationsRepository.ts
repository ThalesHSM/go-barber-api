import { ObjectId } from "mongodb";

import INotificationRepository from "@modules/notifications/repositories/INotificationsRepository";
import ICreateNotificationDTO from "@modules/notifications/dtos/ICreateNotificationDto";

import Notification from "@modules/notifications/infra/typeorm/schemas/Notification";

class NotificationRepository implements INotificationRepository {
  private notifications: Notification[] = [];

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    this.notifications.push(notification);

    Object.assign(notification, { id: new ObjectId(), content, recipient_id });

    return notification;
  }
}

export default NotificationRepository;
