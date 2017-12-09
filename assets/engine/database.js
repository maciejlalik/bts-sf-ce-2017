//Default version of tasklist
var mocked_tasks = [
	{"n":"Task 01","u":"0"},
	{"n":"Task 02","u":"0"},
	{"n":"Task 03","u":"0"},
	{"n":"Task 04","u":"0"},
	{"n":"Task 05","u":"0"},
	{"n":"Task 06","u":"0"},
	{"n":"Task 07","u":"0"},
	{"n":"Task 08","u":"0"},
	{"n":"Task 09","u":"0"},
	{"n":"Task 10","u":"0"},
	{"n":"Task 11","u":"0"},
	{"n":"Task 12","u":"0"},
	{"n":"Task 13","u":"0"},
	{"n":"Task 14","u":"0"},
	{"n":"Task 15","u":"0"},
	{"n":"Task 16","u":"0"},
	{"n":"Task 17","u":"0"},
	{"n":"Task 18","u":"0"},
	{"n":"Task 19","u":"0"},
	{"n":"Task 20","u":"0"}
];

//Browser's HTML5 local storage is used instead of real database.
//JSON Formatted data ready to be transferred to/from database via AJAX HTTP request

function saveToDatabase() { //TODO - AJAX TO REAL DATABASE
	localStorage.setItem('db', JSON.stringify(mocked_tasks));
}

function loadFromDatabase() { //TODO - AJAX TO REAL DATABASE
	if (localStorage.getItem("db") !== null) {
		mocked_tasks = JSON.parse(localStorage.getItem('db'));
	}
}