// Initial array of animals
	var animals = ['cat', 'dog'];
	// ========================================================
	// Generic function for dumping the JSON content for each button into the div
	function displayAnimalInfo(){
		var animal = $(this).attr('data-name');
		//var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
		//Write code between the dashes below to hit the queryURL, take the data and display it in the div with an id of animalsmoviesView
		
		//------YOUR CODE GOES IN THESE DASHES
		$.ajax({
			url: queryURL, 
			method: 'GET'
		})
		.done(function(response) {
	     	 $("#animalsView").html(JSON.stringify(response));
	     	 var results = response.data;
         console.log(response)
		}); 
		//------
	}
	// ========================================================
	// Generic function for displaying animal data 
	function renderButtons(){ 
		// Deletes the animal prior to adding new animal (this is necessary otherwise you will have repeat buttons)
		$('#buttonsView').empty();
		// Loops through the array of animal
		for (var i = 0; i < animals.length; i++){
			// Then dynamicaly generates buttons for each animal in the array
			// Note the jQUery syntax here... 
		    var a = $('<button>') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
		    a.addClass('animal'); // Added a class 
		    a.attr('data-name', animals[i]); // Added a data-attribute
		    a.text(animals[i]); // Provided the initial button text
		    $('#buttonsView').append(a); // Added the button to the HTML
		}
	}
	// ========================================================
	// This function handles events where one button is clicked
	$('#addAnimal').on('click', function(){
		var animal = $(this).data('animal');
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {
                var results = response.data;
                console.log(response)

                    for (var i = 0; i < results.length; i++) {
                    var animalDiv = $('<div>');
                    var p = $('<p>');

                    console.log(results[i].rating);
                    p.text(results[i].rating);

                    var animalImage = $('<img>');
                    animalImage.attr('src', results[i].images.fixed_height.url);

                    animalDiv.append(p);
                    animalDiv.append(animalImage);

                    $('#gifsAppearHere').prepend(animalDiv);
                }

            });                


		// This line of code will grab the input from the textbox
		var animal = $('#animal-input').val().trim();
		// The animal from the textbox is then added to our array
		animals.push(animal);
		
		// Our array then runs which handles the processing of our animal array
		renderButtons();
		// We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
		return false;
	})
	// ========================================================
	// Generic function for displaying the animalInfo
	$(document).on('click', '.animal', displayAnimalInfo);
	// ========================================================
	// This calls the renderButtons() function
	renderButtons();