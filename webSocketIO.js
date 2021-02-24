const okMessage = "CLIENT_DATA_OK";
const sockets = {
  dataSocket: {
    name: "dataSocket",
    instance: new WebSocket(`ws://${window.location.host}/${name}`),
    isOpen: false,
    failed: false,
  },
  statusSocket: {
    name: "statusSocket",
    instance: new WebSocket(`ws://${window.location.host}/${name}`),
    isOpen: false,
    failed: false,
  }
};
const socketsSuccessMessage = (msg = "Connected") => {
  if(msg !== "") console.log(msg);
  isConnectedDiv.innerHTML = connectedStr;
  isConnectedDiv.style.color = '#00a103';
  loadingInfo.innerHTML = "";
}
const socketFailMessage = (msg = "Disconnected") => {
  if(msg !== "") console.log(msg);
  isConnectedDiv.innerHTML = disconnectedStr;
  isConnectedDiv.style.color = '#a10000';
}

const onSocketOpen = (socket) => {
  socketsSuccessMessage(`Connected with ${socket.name}`);
  socket.isOpen = true;
}

const onSocketError = (socket) => {
  socketFailMessage(`Error occured with ${socket.name}`);
  socket.failed = true;
}

const onSocketClose = (socket) => {
  socketFailMessage(`Socket ${socket.name} closed`);
  socket.isOpen = false;
}

sockets.dataSocket.instance.addEventListener("open", () => { onSocketOpen(sockets.dataSocket) });
sockets.dataSocket.instance.addEventListener("error", () => { onSocketError(sockets.dataSocket) });
sockets.dataSocket.instance.addEventListener("close", () => { onSocketClose(sockets.dataSocket) });

sockets.dataSocket.instance.addEventListener("message", (event) => {
  const data = event.data;
  if (data === null) return;
  renderData(data);
  components.forEach(el => {
    const element = document.getElementById(el.name);
    if(element === null) content.appendChild(el.render());
  });
  sockets.dataSocket.failed = false;
  socketsSuccessMessage("");
});

sockets.statusSocket.instance.addEventListener("open", () => { onSocketOpen(sockets.statusSocket) });
sockets.statusSocket.instance.addEventListener("error", () => { onSocketError(sockets.statusSocket) });
sockets.statusSocket.instance.addEventListener("close", () => { onSocketClose(sockets.statusSocket) });

sockets.statusSocket.instance.addEventListener("message", ({data}) => {
  if (data === okMessage)
    blinkSuccessIndicator();
});



















