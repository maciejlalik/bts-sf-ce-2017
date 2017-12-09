var dragSrc = {"id":-1,"sourceuser":-1};

function dragStart(e) {
	dragSrc["id"] = e.target.dataset["id"];
	dragSrc["sourceuser"] = e.target.dataset["sourceuser"];
	e.dataTransfer.effectAllowed = 'move';
	 e.dataTransfer.setData('text/html', this.outerHTML);
	console.log(dragSrc);
}

function allowDrop(e,newuser) {
	e.preventDefault();
	if (dragSrc["sourceuser"] != newuser) {
		$("#card-user-"+newuser).addClass("targetHighlight");
	}
}

function dragOut(e){
	removeHighlightFromBoxes();
}

function dropElement(e,newuser) {
	console.log(newuser);
	e.preventDefault()
	
	if (dragSrc["sourceuser"] != newuser) {
		reassignTask(dragSrc["id"],newuser)
	}
	dragSrc = {"id":-1,"sourceuser":-1};
}