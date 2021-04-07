import * as io from "socket.io-client";

class ChatSocket {
  socket;

  constructor(url) {
    this.socket = io.connect(url);
  }

  getSocket() {
    return this.socket;
  }

  test() {
    this.socket.emit("data");
  }
}

const socket = new ChatSocket("http://localhost");

export default socket;
