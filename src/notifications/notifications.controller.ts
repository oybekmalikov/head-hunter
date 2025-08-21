import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../common/guards/auth.guard";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";
import { NotificationsService } from "./notifications.service";

@ApiTags("Notifications")
@Controller("notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  @ApiOperation({ summary: "Create a notification" })
  @ApiResponse({
    status: 201,
    description: "The notification has been successfully created.",
  })
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all notifications" })
  @ApiResponse({
    status: 200,
    description: "The notifications have been successfully fetched.",
  })
  @UseGuards(AuthGuard)
  findAll(@Req() req: Request) {
    const user = (req as any).user;
    if (user.role !== "admin" && user.role !== "superadmin") {
      throw new ForbiddenException("Access denied");
    }
    return this.notificationsService.findAllByUserId(user.id);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a notification by id" })
  @ApiResponse({
    status: 200,
    description: "The notification has been successfully fetched.",
  })
  @UseGuards(AuthGuard)
  findOne(@Param("id") id: string, @Req() req: Request) {
    const user = (req as any).user;
    if (user.role !== "admin" && user.role !== "superadmin") {
      throw new ForbiddenException("Access denied");
    }
    return this.notificationsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a notification" })
  @ApiResponse({
    status: 200,
    description: "The notification has been successfully updated.",
  })
  @UseGuards(AuthGuard)
  update(
    @Param("id") id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
    @Req() req: Request,
  ) {
    const user = (req as any).user;
    if (user.role !== "admin" && user.role !== "superadmin") {
      throw new ForbiddenException("Access denied");
    }
    return this.notificationsService.update(+id, updateNotificationDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a notification" })
  @ApiResponse({
    status: 200,
    description: "The notification has been successfully deleted.",
  })
  @UseGuards(AuthGuard)
  remove(@Param("id") id: string, @Req() req: Request) {
    const user = (req as any).user;
    if (user.role !== "admin" && user.role !== "superadmin") {
      throw new ForbiddenException("Access denied");
    }
    return this.notificationsService.remove(+id);
  }

  @Get("user/:userId")
  @ApiOperation({ summary: "Get all notifications by user id" })
  @ApiResponse({
    status: 200,
    description: "The notifications have been successfully fetched.",
  })
  @UseGuards(AuthGuard)
  findAllByUserId(@Param("userId") userId: string, @Req() req: Request) {
    const user = (req as any).user;
    if (
      user.role !== "admin" &&
      user.id !== +userId &&
      user.role !== "superadmin"
    ) {
      throw new ForbiddenException("Access denied");
    }
    return this.notificationsService.findAllByUserId(+userId);
  }
}
