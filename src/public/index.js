let socket = io();
let chatBox = document.getElementById('chatBox');
let log = document.getElementById('log');
let user;

/* ALERT DE IDENTIFICACIÓN */
Swal.fire({
	title: "Identifícate",
	input: "text",
	allowOutsideClick: false,
	inputValidator: (value) => {
		return !value && '¡Necesitas escribir un nombre de usuario para participar!'
	}
}).then(result => {
	user = result.value;
});

chatBox.addEventListener('keyup', evt => {
	if(evt.key === "Enter"){
		if(chatBox.value.trim().length > 0){
			socket.emit('message', {
				user, 
				message: chatBox.value.trim(), 
				date: moment().format('DD-MM-YYYY'), 
				time: moment().format('HH:mm')
			});
			chatBox.value = "";
		}
	}
});

/* EVENTOS DE SOCKETS */
socket.on('log', data => {	
	let messages = "";
	data.forEach(log => {
		messages = messages + `
			<div class="card mt-1 bg-light border">
				<div class="card-body">
					<h5 class="card-title"><div class="badge bg-primary text-wrap">${log.user}</div></h5>
					${log.message}
					<br><small class="text-muted"><i class="bi bi-stopwatch"></i> ${log.time}</small>
				</div>
			</div>
		`;
	});
	log.innerHTML = messages;
});