import { Room, Client } from "@colyseus/core";
import { MyRoomState } from "./schema/MyRoomState";

export class MyRoom extends Room<MyRoomState> {
  maxClients = 4;
  state = new MyRoomState();

  onCreate (options: any) {
    this.onMessage("move", (client, message) => {
      client.send("move", message);
    });
  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");
    this.broadcast("playerJoined", {sessionId: client.sessionId});
  }
  
  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
    this.broadcast("playerLeft", client.sessionId);
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
