
// list //
let country_list = ["Albania", "Andorra", "Armenia", "Austria", "Azerbaijan", "Belarus", "Belgium", "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Cyprus", 'Czech Republic', "Denmark", "Estonia", "Finland", "France", "Georgia", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Kazakhstan", "Kosovo", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands", "Norway", "Poland", "Portugal", "Romania", "Russia", "San Marino", "Serbia", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Turkey", "Ukraine", "United Kingdom", "Vatican City"];
let picture_gallery = document.getElementById("picture-gallery");

//PRNGs //

let random_list = (Math.floor(Math.random()* 1000) % 51);
let random_page = Math.floor(Math.random()* 250);

// choices //

let selected_item = country_list[random_list];
let choices = [];
choices.push(selected_item);

// choose the 4 buttons//

while (choices.length < 4){
	let random_item = country_list[(Math.floor(Math.random()* 1000) % 51)]
	if (choices.indexOf(random_item) == -1){
		choices.splice((Math.floor(Math.random()* 1000) % 3) , 0, random_item);
	} else {
		continue;
	}
}

// append the 4 buttons //

let i;
for (i = 0; i < choices.length; i++){
	let num = i + 1;
	let button = document.getElementById("button-" + num.toString());
	
	let country_img_element = document.createElement("img");
			
	country_img_element.src = "flags/" + choices[i] + ".png";
	country_img_element.style = "width: 30px; height: 30px;"

	button.innerHTML = choices[i] + " ";
	button.appendChild(country_img_element);
}

// masonry //

masonry = new Masonry("#picture-gallery", {
	itemSelector: ".grid-item"
});
masonry.layout();

// fetching API //

fetch("https://api.tumblr.com/v2/tagged?tag=" + selected_item + "&offset=" + random_page.toString() + "&limit=50&api_key=QgPv67WAh1cZqLPi45lCS7vNWE6grlSmjWEtkRhQFXScOGzk58").then(function(response) {
	console.log(response);
	if (!response.ok) {
		window.alert("Looks like there is some errors with the network. Try again later.");
		return;
	}
	return response.json();

}).then(function(result) {	
	console.log(result);
	
	if (!result){
		return;
	}

	let posts = result.response;
	for (let i = 0; i < posts.length; i++){
		if (posts[i].type == "photo") {
			let photo_url = posts[i].photos[0].alt_sizes[0].url;
			//            [(posts[i].photos[0].alt_sizes.length - 1)]
			console.log(photo_url);

			let new_img_element = document.createElement("img"); // <img>
			new_img_element.src = photo_url; // <img src"photo_url">
			new_img_element.style = "max-width: 300px; min-width: 300px;" // <img src"photo_url" style="max-width: 500px; max-height: 500px;">
			new_img_element.addEventListener('load', function() {
				masonry.layout();
			})

			let new_li_element = document.createElement("li"); // <li>
			new_li_element.classList.add("grid-item"); // <li class="grid-item">
			new_li_element.appendChild(new_img_element); // <li class="grid-item"><img src"photo_url" style="max-width: 500px; max-height: 500px;"></li>
			picture_gallery.appendChild(new_li_element); // <ul><li class="grid-item"><img src="photo_url" style="max-width: 500px; max-height: 500px;"></li></ul>
			masonry.appended(new_li_element);
		} else {
			console.log("Not a picture");
			continue;
		}
		
	} 

}).catch(function(err){
	window.alert("Looks like there is some errors with the network or Tumblr's API. Try again later.");
	console.log("DEBUG: " + err);
});

// Click Buttons //

let button_1 = document.getElementById("button-1");
button_1.addEventListener("click", function(){
	console.log(button_1.innerHTML);
	guess(choices[0]);
});

let button_2 = document.getElementById("button-2");
button_2.addEventListener("click", function(){
	console.log(button_2.innerHTML);
	guess(choices[1]);
});

let button_3 = document.getElementById("button-3");
button_3.addEventListener("click", function(){
	console.log(button_3.innerHTML);
	guess(choices[2]);
});

let button_4 = document.getElementById("button-4");
button_4.addEventListener("click", function(){
	console.log(button_4.innerHTML);
	guess(choices[3]);
});

function guess(x) {
	if (x == selected_item) {
		window.alert("You are right!!!");
		location.reload();
	} else {
		window.alert("It was " + selected_item + ".");
		location.reload();
	}
}