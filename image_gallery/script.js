
function reload(sec) {
	var reload = document.getElementById("reload");
	setTimeout(function() {
		reload.classList.remove("reload");
	},sec * 1000);
}

reload(3);

function open_reload(sec) {
	var reload = document.getElementById("reload");
	reload.classList.add("reload");
	setTimeout(function() {
		reload.classList.remove("reload");
	},sec * 1000);
}


// ********** Image Gallery & Light Box **********

var practice_img_list = 11;
var diabolo_camp_img_list = 11;
var performance_img_list = 4;

var practice_img_container = document.getElementById("practice-img");
var diabolo_camp_img_container = document.getElementById("diabolo-camp-img");
var performance_img_container = document.getElementById("performance-img");

for (var i = 1; i < practice_img_list + 1; i++) {
	var img_tag = document.createElement("img");
	var img_src = "gallery/a_" + i + ".jpg";
	img_tag.src = img_src;
	img_tag.id = "a_" + i;
	img_tag.addEventListener("click", open_window);
	practice_img_container.appendChild(img_tag);
}

for (var i = 1; i < diabolo_camp_img_list + 1; i++) {
	var img_tag = document.createElement("img");
	var img_src = "gallery/new_" + i + ".jpg";
	img_tag.src = img_src;
	img_tag.id = "new_" + i;
	img_tag.addEventListener("click", open_window);
	diabolo_camp_img_container.appendChild(img_tag);
}

for (var i = 1; i < performance_img_list + 1; i++) {
	var img_tag = document.createElement("img");
	var img_src = "gallery/diabolo_" + i + ".jpg";
	img_tag.src = img_src;
	img_tag.id = "diabolo_" + i;
	img_tag.addEventListener("click", open_window);
	performance_img_container.appendChild(img_tag);
}

function disbleScrolling(event) {
	document.documentElement.style.overflow = 'hidden';
}

function enableScrolling(event) {
	document.documentElement.style.overflow = 'auto';
}

function open_window(event, src) {
	disbleScrolling();
	open_reload(0.5);
	changeImage(event);
		
	var light_box = document.getElementById("light-box");
	light_box.classList.remove("hidden");
}

function close_window(event) {
	enableScrolling();

	var light_box = document.getElementById("light-box");
	light_box.classList.add("hidden");
}

function changeImage(event) {
	// var section = document.getElementById("section");
	var img_tag = document.getElementById("section-image");
	img_tag.src = event.target.src;
}