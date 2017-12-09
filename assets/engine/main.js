 $(document).ready(function(){initWebsite();});
//-----------------------------------------------------------	
function initWebsite() {
	loadFromDatabase();
	reloadPools();
	
	$("#btn_resetTasks").click(function(){
		resetTasks();
	});
	
	$("#btn_randomizeTasks").click(function(){
		randomizeTasks();
	});
	
}
//-----------------------------------------------------------	
function reloadPools(newlyAssignedTaskId) {
	removeHighlightFromBoxes();
	
	//if (typeof(newlyAssignedTaskId) == "undefined") {
	//	newlyAssignedTaskId = -1;
	//}
	console.log(newlyAssignedTaskId);
	
	var arrHTML = [[],[],[],[]];
	var taskCount=[0,0,0,0];
	for (var i=0,il=mocked_tasks.length;i<il;i++) {
		var tempIndex = parseInt(mocked_tasks[i]["u"],10);
		
		//Task Item
		arrHTML[tempIndex].push("<li draggable=\"true\" ",
		"data-id=\"",i,"\" data-sourceuser=\"",tempIndex,"\" ",
		"ondragstart=\"dragStart(event)\" ",
		"class=\"list-group-item ",(i == newlyAssignedTaskId ? "newlyAssignedTask" : ""),"\">",mocked_tasks[i]["n"]);
		
		//Assign buttom menu
		arrHTML[tempIndex].push("<div class=\"dropdown float-right\" >",
		"<button class=\"assign-to btn btn-sm btn-outline-info\" title=\"Assign this task to...\"  ",
		"type=\"button\" id=\"dropdownMenuButton\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">",
		"&raquo;<i class=\"fa fa-fw fa-user\"></i>",
		"</button>",
		"<ul class=\"dropdown-menu dropdown-menu-right\" aria-labelledby=\"dropdownMenuButton\">",
		"<h6 class=\"dropdown-header\">Assign '",mocked_tasks[i]["n"],"' to:</h6>");
		
		for (var m=1,ml=arrHTML.length;m<ml;m++) {
			if (tempIndex != m) {
				arrHTML[tempIndex].push("<li class=\"dropdown-item assign-item-link\" data-id=\"",i,"\" data-user=\"",m,"\">User ",m,"</li>");
			}
		}
		
		if (tempIndex != 0) {
			arrHTML[tempIndex].push("<div class=\"dropdown-divider\"></div>",
				"<li class=\"dropdown-item assign-item-link\" data-id=\"",i,"\" data-user=\"0\">Back to Task Pool</li>")
		}
		
		arrHTML[tempIndex].push("</ul>",
		"</div>");
		
		arrHTML[tempIndex].push("</li>");
		taskCount[tempIndex]++;
	}
	arrHTML.push();
	
	for (var m=0,ml=arrHTML.length;m<ml;m++) {
		$("#user-"+m).html(arrHTML[m].join(''));
		$("#badge-"+m).html(taskCount[m]);
	}

	$(".assign-item-link").click(function() {
		var id = parseInt($(this).data("id"),10);
		var newUser = parseInt($(this).data("user"),10);
		console.log(id + " | " + newUser);
		reassignTask(id,newUser);
	
	});
	
	//Highlighting Target box
	$(".assign-item-link").mouseenter(function(){
		var newUser = parseInt($(this).data("user"),10);
		var potentialTarget = "card-user-" + newUser;
		
		addHighlightToTargetBox(potentialTarget);
	})

	$(".assign-item-link").mouseleave(function(){
		removeHighlightFromBoxes();
	})
	
	saveToDatabase(); 
	
	setTimeout(function(){
		$(".newlyAssignedTask").removeClass("newlyAssignedTask");
	},500);
}
//-----------------------------------------------------------	
function reassignTask(id,newUser) {
	mocked_tasks[id]["u"] = newUser;
	reloadPools(id);
}
//-----------------------------------------------------------	
function resetTasks() {
	for (var i=0,il=mocked_tasks.length;i<il;i++) {
		mocked_tasks[i]["u"]="0";
	}
	reloadPools();
}
//-----------------------------------------------------------	
function randomizeTasks() {
	for (var i=0,il=mocked_tasks.length;i<il;i++) {
		mocked_tasks[i]["u"]= (Math.floor(Math.random()*(3-0+1)+0)).toString();
	}
	reloadPools();
}
//-----------------------------------------------------------	
var targetHighlightClass = "targetHighlight";
//-----------------------------------------------------------	
function addHighlightToTargetBox(box_id) {
	removeHighlightFromBoxes();
	$("#"+box_id).addClass(targetHighlightClass);
}
//-----------------------------------------------------------	
function removeHighlightFromBoxes() {
	$(".card").removeClass(targetHighlightClass);
}