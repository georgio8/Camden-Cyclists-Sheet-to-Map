/*
	utilities.js
	Camden Cyclists Sheet-to-Map  
	Author: George Coulouris <george@coulouris.net>
	Beta release 21 May 2020

*/

/* Constants and utility functions for Sheet-to-Map app */

const LatColumnName = "Latitude", LngColumnName = "Longitude", SVColumnName = "StreetView";

//	Covid19 issues
//	const SheetUrl =  'https://docs.google.com/spreadsheets/d/1B6Sj6RaSF1Hf43ESlnVxNdO1HXuwPNcxU7tSlxqqFig/pub';

// The google sheet we are using for testing only.
const SheetUrlTest = 'https://docs.google.com/spreadsheets/d/1YIOymcV2MAyyUjZf4CcftHZDfN4illUmdW5EQxzPA4M/pub';

const SheetUrlTestV3 = 'https://docs.google.com/spreadsheets/d/1opi9r3TV3hLZwM4yYeUfyWnFDfMAvqjuG5jI_sv1KvM/pub';

// Ready for 2nd release:
const SheetUrl_v3 = 'https://docs.google.com/spreadsheets/d/1xqajoHc3Dj8QZp8BNnEk2TVwzcIzMppos_nthlOtOck/pub';

const Covid_19_measures_3 = 'https://docs.google.com/spreadsheets/d/1KWGAJTW3A6HsluAysJKVS-gAgZf7upKBGZLIthW1B0Y/pub';

 /* pixel tiles, probably incompatible with MB vector maps: */
const adminBoundariesUrl =  'https://tile.cyclestreets.net/boundaries/{z}/{x}/{y}.png';

const AttributionString = 'Application <a href="http://camdencyclists.org.uk/camden-cyclists-mapping/" target="_blank">© CamdenCyclistsMapping</a> | Maps & platform <a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox</a> | Data <a href="http://www.openstreetmap.org/about/" target="_blank">© OpenStreetMap contributors</a>';

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

var config = {
	'MapboxAccessToken' : 	//George's access token:
		'pk.eyJ1IjoiZ2VvcmdpbzgiLCJhIjoiY2loN2dtMmZ5MDAxbnZzbTNrZ2w5aWY4dCJ9.RJxJPq-II9GbDaTKy1xhkg',
	'SheetUrl' : Covid_19_measures_3, 
	'MapInitialCentre' :  [-0.1295298, 51.5082187],	// Trafalgar Square
	'MapInitialZoom' : 10, //covers London
	'FieldsToShow' : ["Title", "Location", "Description", "Photos", "StreetView", "Status", "Date"],
	'FieldStyles' : {"Title": "H3", "Location": "H4", "Description": "p", "Photos": "links", 
		"StreetView": "links", "Status": "p"},
	'FieldsWithLabel' : [ "Location", "Status"],
	'NoOfRolloverFields' : 2,	// include the first n fields from FieldsToShow in rollover boxes
	'CategoriesToColours' : {"Shops": "red", "Filter": "green", "MainRoad": "orange"},
	'ShowBoundary' : ''
}

function getUrlConfig() { // could be dome dynamically with config.foreach(item)
	var param;
	if(param = urlParam('MapboxAccessToken')) config.MapboxAccessToken = param;
	if(param = urlParam('SheetUrl')) config.SheetUrl = param;
	if(param = urlParam('MapInitialCentre')) config.MapInitialCentre = param;
	if(param = urlParam('MapInitialZoom')) config.MapInitialZoom = param;
	if(param = urlParam('FieldsToShow')) config.FieldsToShow = param;
	if(param = urlParam('FieldStyles')) config.FieldStyles = param;
	if(param = urlParam('FieldsWithLabel')) config.FieldsWithLabel = param;
	if(param = urlParam('NoOfRolloverFields')) config.NoOfRolloverFields = param;
	if(param = urlParam('CategoriesToColours')) config.CategoriesToColours = param;
	if(param = urlParam('ShowBoundary')) config.ShowBoundary = param;
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
  
function categoryToColor(category) {
	var result = config.CategoriesToColours[category];
	return result ? result : 'grey';
}
