const serverSendingSocketName = "serverSendingSocket";
const serverReceivingSocketName = "serverReceivingSocket";

const serverSendingSocket = new WebSocket(`ws://${hostName}/${serverSendingSocketName}`);
const serverReceivingSocket = new WebSocket(`ws://${hostName}/${serverReceivingSocketName}`);






serverReceivingSocket.addEventListener("open", (event) => {

});

serverSendingSocket.addEventListener("message", (event) => {

});
















