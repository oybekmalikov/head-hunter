import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepo: Repository<Notification>,
  ) {}
  async create(createNotificationDto: CreateNotificationDto) {
    const notification = this.notificationRepo.create(createNotificationDto);
    return {
      message: "Notification created successfully",
      data:await this.notificationRepo.save(notification),
      success: true,
    }
  }

  async findAll() {
    const notifications = await this.notificationRepo.find();
    if (notifications.length === 0) {
      return {
        message: "No notifications found",
        success: true,
      }
    }
    return {
      message: "Notifications fetched successfully",
      data: notifications,
      success: true,
    }
  }

  async   findOne(id: number) {
    const notification = await this.notificationRepo.findOne({ where: { id } });
    if (!notification) {
      return {
        message: "Notification not found",
        success: true,
      }
    }
    return {
      message: "Notification fetched successfully",
      data: notification,
      success: true,
    }
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto) {
    const notification = await this.notificationRepo.findOne({ where: { id } });
    if (!notification) {
      return {
        message: "Notification not found",
        success: true,
      }
    }
    const updatedNotification = await this.notificationRepo.update(id, updateNotificationDto);
    return {
      message: "Notification updated successfully",
      data: updatedNotification,
      success: true,
    }
  }

  async remove(id: number) {
    const notification = await this.notificationRepo.findOne({ where: { id } });
    if (!notification) {
      return {
        message: "Notification not found",
        success: true,
      }
    }
    await this.notificationRepo.delete(id);
    return {
      message: "Notification deleted successfully",
      success: true,
    }
  }

  async findAllByUserId(userId: number) {
    const notifications = await this.notificationRepo.find({ where: { userId } });
    if (notifications.length === 0) {
      return {
        message: "No notifications found",
        success: true,
      }
    }
    return {
      message: "Notifications fetched successfully",
      data: notifications,
      success: true,
    }
  }
}
