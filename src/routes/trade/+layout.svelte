<script>
  import SocketManager from "$lib/socket/Socketmanager";
  import {ServerURl} from "$lib/backendUrl"
	import { cryptoQuotes, socketRequest } from "./store";
   const socket = SocketManager.socket(ServerURl());
  const sr = SocketManager.socketRequestBind(socket);

  socket.on("connect", () => {
    // @ts-ignore
    socketRequest.set(sr)
  })

  socket.on("quotes", (data) => {
    cryptoQuotes.set(data);
  })

</script>
<slot></slot>