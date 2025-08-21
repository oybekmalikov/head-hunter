import { OnModuleInit } from "@nestjs/common";
import {
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  ConnectedSocket,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({ cors: { origin: "http://localhost:3002" } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(socket: Socket) {
    console.log('Client connected:', socket.id);
  }

  handleDisconnect(socket: Socket) {
    console.log('Client disconnected:', socket.id);
  }

  @SubscribeMessage("newMessage")
  onNewMessage(@MessageBody() body: any) {
    this.server.emit("onMessage", {
      msg: "New message",
      content: body,
    });
  }
}
