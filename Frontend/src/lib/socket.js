import * as io from "socket.io-client";

class ChatSocket {
  socket;

  constructor(url) {
    this.socket = io.connect(url);
  }

  test() {
    this.socket.emit('data')

  }
}

const socket = new ChatSocket("http://localhost:80");

export default socket;