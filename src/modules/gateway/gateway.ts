import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets'
import { OnModuleInit } from '@nestjs/common'
import { Server, Socket } from 'socket.io'

@WebSocketGateway()
export class MyGateWay
    implements OnModuleInit, OnGatewayConnection, OnGatewayDisconnect
{
    @WebSocketServer()
    private server: Server
    wsClients = []

    onModuleInit() {}

    handleConnection(client: any) {
        console.log('connect successfully')
        console.log(`client id: ${client.id}`)
        this.wsClients.push(client)
    }

    handleDisconnect(client: any) {
        for (let i = 0; i < this.wsClients.length; i++) {
            if (this.wsClients[i].id === client.id) {
                this.wsClients.splice(i, 1)
                break
            }
        }
        console.log(`client has id ${client.id} disconnected`)
    }

    @SubscribeMessage('newMessage')
    onNewMessage(@MessageBody() body: any) {
        this.server.emit('onMessage', {
            msg: 'new message',
            content: body,
        })
    }

    @SubscribeMessage('joinRoom')
    onJoinRoom(
        @MessageBody() body: RoomOptions,
        @ConnectedSocket() client: Socket
    ) {
        this.server.socketsJoin(body.roomId)
        client.broadcast
            .to(body.roomId)
            .emit('intro', `${body.userName} had join ${body.name} room`)
    }

    @SubscribeMessage('joinRoom')
    onLeaveRoom(@MessageBody() body: RoomOptions) {
        this.server.socketsLeave(body.roomId)
        return 'leave room successfully'
    }
}
