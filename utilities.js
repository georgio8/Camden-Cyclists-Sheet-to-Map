/* Constants and utility functions for use in Sheet-to-Map app */

	const LatColumnName = "Latitude", LngColumnName = "Longitude", SVColumnName = "StreetView";
//	Quick Wins
//	const SheetUrl = 'https://docs.google.com/spreadsheets/d/1HvqP8O6oZFB8s70obKc9M_ksk-QcYKF6kxxcmqJ9HUg/edit?usp=sharing';
//	Covid19 shopping issues
	const SheetUrl = 'https://docs.google.com/spreadsheets/d/1B6Sj6RaSF1Hf43ESlnVxNdO1HXuwPNcxU7tSlxqqFig/edit?usp=sharing';
	const FieldsToShow = ["Title", "Location", "Description", "Photos", "StreetView"];
	const FieldSyles = {"Title": "H3", "Location": "H4", "Description": "p","Photos": "links","StreetView": "links"};
	const MapInitialCenter = [-0.16, 51.543]; // starting position [lng, lat]
	const MapInitialZoom = 12.5; // starting zoom
	function urlParam(name){
	// get a named parameter from the URL string
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		if (results==null){
		   return null;
		}
		else{
		   return decodeURIComponent(results[1]) || 0;
		}
	}

	function getLngLat(row) {
		if(row[LatColumnName] && row[LngColumnName]) {
			return [[LatColumnName], row[LngColumnName]];
		} else if(row[SVColumnName] && row[SVColumnName].indexOf('@') > 0) {
			return extractStreetViewLocation(row[SVColumnName]);
		} else {
			return null;
		}
	}
		
	  function extractStreetViewLocation(googleURL) {
			var s = googleURL.slice(googleURL.indexOf('@')+1);
			var parts = s.split(',');
			return [parts[1],parts[0]];
	  }

	  function getURLParams() {
	  	var latName, lngName, svn;
		if(t = urlParam("title")) document.title = t;
		if((latName = urlParam("latcolumn")) && (lngName = urlParam("lngcolumn"))) {
			LatColumnName = latName; LngColumnName = urlParam("latcolumn") ;
		}
		if(svn = urlParam("svcolumn")) SVColumnName = svn;
	  }
	  
	  function categoryToColor(category) {
	  	return ((category == "Shops") ? "red" : 
	  		(category == "Filter") ? "green" :
	  		(category == "MainRoad") ? "orange" : "white");
	  }
