const socket = io();

$(() => {
   $("#send").click(() => {
      sendMessage({
         name: $("#name").val(),
         message: $("#message").val()
      });
      $("#message").val('');
   })
   getMessages()
})

socket.on('message', addMessages)

function addMessages(message) {
   $("#messages").append(`
      <h5> ${message.name} </h5>
      <p>  ${message.message} - ${new Date(message.date || Date.now).toLocaleString()} </p>`)
}

function getMessages() {
   $.get("http://localhost:3000/messages", (data) => {
      data.reverse().forEach(addMessages);
   })
}

function sendMessage(message) {
   $.post("http://localhost:3000/messages", message)
}