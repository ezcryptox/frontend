<script>
  import SocketManager from "$lib/socket/Socketmanager";
  import {ServerURl} from "$lib/backendUrl"
	import { cryptoQuotes } from "./store";
   const socket = SocketManager.socket(ServerURl());
  const socketRequest = SocketManager.socketRequestBind(socket);

  socket.on("connect", () => {
    socketRequest("join-ticker");
  })

  socket.on("quotes", (data) => {
    cryptoQuotes.set(data);
  })

</script>
<slot></slot>