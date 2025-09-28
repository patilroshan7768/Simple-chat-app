import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
console.log("Connecting to socket at:", SOCKET_URL);

const socket = io(SOCKET_URL, { autoConnect: false });
export default socket;
