//FEATURED //

var featured_down = document.getElementById("featured-down");
var featured_state = false;

featured_down.addEventListener("click", function(){
	if (featured_state == false) {
		var featured_content = document.getElementById("featured-hidden");
		featured_content.classList.remove("featured-hidden");
		featured_state = true;
		featured_down.innerHTML = "&#x25B2;";
	} else {
		var featured_content = document.getElementById("featured-hidden");
		featured_content.classList.add("featured-hidden");
		featured_state = false;
		featured_down.innerHTML = "&#x25BC;";
	} 
});

// HIDE >>> //

var hide_link = document.getElementById("featured-less");
hide_link.addEventListener("click", function(){
	if (featured_state == false) {
		var featured_content = document.getElementById("featured-hidden");
		featured_content.classList.remove("featured-hidden");
		featured_state = true;
		featured_down.innerHTML = "&#x25B2;";
	} else {
		var featured_content = document.getElementById("featured-hidden");
		featured_content.classList.add("featured-hidden");
		featured_state = false;
		featured_down.innerHTML = "&#x25BC;";
		
	} 
});

// HIDE >>> END //

// FEATURED END //

// API //

var news_list = document.getElementById("news-list");
var base = 100;
var a = 0;

fetch("https://newsapi.org/v2/everything?domains=bloomberg.com&apiKey=9014b6c73e7f49909f08e45ff8b5a115").then(function(response) {
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

	var posts = result.articles;
	console.log(posts);
	for (let i = 0; a < 10; i++){
		if (posts[i].urlToImage != null) {
			var article_photo_url = posts[i].urlToImage;
			//            [(posts[i].photos[0].alt_sizes.length - 1)]
			console.log(article_photo_url);

			var new_img_element = document.createElement("img"); // <img>
			new_img_element.src = article_photo_url; // <img src"photo_url">
			new_img_element.classList.add("img-sizing"); // <img class"img-sizing" src"photo_url">
			
			var new_a_element = document.createElement("a"); // <a></a>
			new_a_element.innerHTML = posts[i].title; // <a></a>
			new_a_element.href = posts[i].url; // <a href="url"></a>
			new_a_element.target = "_blank"; // <a href="url" target="_blank"></a>
			new_a_element.classList.add("financial-reads-links", "position-abs"); // <a class="financial-reads-links" href="url" target="_blank"></a>

			var new_li_element = document.createElement("li"); // <li></li>
			new_li_element.style = "top: " + (base).toString() + "px; z-index: " + (i + 1 ).toString() + ";";// <li style="top: base px; z-index: i+1 ;"></li>
			new_li_element.classList.add("list-display", "list-news-" + (i + 1).toString()); // <li style="top: base px; z-index: i+1 ;" class="list-display"></li>
			
			new_li_element.appendChild(new_a_element); // <li style="top: base px; z-index: i+1 ;" class="list-display"><a></a></li>
			new_li_element.appendChild(new_img_element); // <li style="top: base px; z-index: i+1 ;" class="list-display"><img class"img-sizing" src"photo_url"></li>
			news_list.appendChild(new_li_element); // <ul><li style="top: base px; z-index: i+1 ;" class="list-display"><img class"img-sizing" src="photo_url"></li></ul>

			base = base + 350;
			a++;

		} else {
			console.log("Not a picture");
			continue;
		}	
	}
	
}).catch(function(err){
	window.alert("Looks like there is some errors with the network or News' API. Try again later.");
	console.log("DEBUG: " + err);
});

// API END //

// BACK TO TOP //

var scroll_button = document.getElementById("scroll-button");

scroll_button.addEventListener("click", function(){
	window.scrollTo(0, 0);
});

// BACK TO TOP END //