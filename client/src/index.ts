import { Client } from "colyseus.js";

const client = new Client("ws://localhost:2567");

async function joinRoom() {
  const room = await client.joinOrCreate("my_room");
  console.log("Joined room:", room.name);

  // Handle specific messages
  room.onMessage("move", (message) => {
    console.log("Move received:", message);
  });

  // Handle player join/leave messages
  room.onMessage("playerJoined", (message) => {
    console.log("Player joined:", message);
  });

  room.onMessage("playerLeft", (sessionId) => {
    console.log("Player left:", sessionId);
  });

  // Debug: Listen to ALL messages
  room.onMessage("*", (type, message) => {
    console.log(`[${type}]`, message);
  });
}

joinRoom().catch(console.error);