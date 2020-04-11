/*Kevin Bui, 1271124, AG
This allows the input/buttons/control elements of the 
page to be interactable*/
(function() {
	
	"use strict";
	/*
	timer keeps track of whether there is an interval going on or not
	textSpeed, sets the speed for the interval
	textTrack keeps account of the index or which word its on from the text area
	splitText is a list of the words, typed into the text area
	*/
	var timer;
	var textSpeed;
	var textTrack;
	var splitText;
	
	//calls different methods based on which button is clicked
	//default speed is 171ms, and default font size is medium
	window.onload = function() {
		debugger;
		timer = null;
		textSpeed = 171;
		textTrack = 0;
		document.getElementById("stopbutton").disabled = true;
		document.getElementById("stopbutton").style.backgroundColor = "#D3D3D3";
		document.getElementById("selected-speed").onchange = changeSpeed;
		var textSize = document.getElementsByName("changeSize");
		for(var i = 0; i < textSize.length; i++) {
			textSize[i].onclick = changeSize;
		}
		document.getElementById("startbutton").onclick = startText;
		document.getElementById("stopbutton").onclick = stopText;
	};
	
	//sets the interval for which the words appear on screen
	function startText() {
		var inputText = document.getElementById("text-area").value;
		splitText = inputText.split(/[ \t\n]+/);
		timer = setInterval(textSetup, textSpeed); 
		toggleButtons();
	}
	
	//stops words from appearing on screen, and resets the interval
	function stopText() {
		textTrack = 0;
		clearInterval(timer);
		timer = null;
		document.getElementById("readbox").innerHTML = "";
		toggleButtons();
	}
	
	//changes the size of the text appearing on screen
	function changeSize() {
		debugger;
		var changeTextSize = document.getElementsByName("changeSize");
		var selected;
		for(var i = 0; i < changeTextSize.length; i++) {
			if(changeTextSize[i].checked) {
				selected = changeTextSize[i].value;
			}
			else {
				changeTextSize[i].checked = false; 
			}
		}
		document.getElementById("readbox").style.fontSize = selected + "pt";
	}
	
	//changes the speed at which the words appear on screen
	function changeSpeed() {
		var dropDown = document.getElementById("selected-speed");
		var selectedSpeed = dropDown.options[dropDown.selectedIndex].value;
		textSpeed = selectedSpeed;
		clearInterval(timer);
		if(timer !== null) {
			timer = setInterval(textSetup, selectedSpeed);
		}
	}
	
	//allows the words to show up on screen, and goes through each index of the list of words
	//also deletes punctuation at the end of words, and makes it appear twice as long
	function textSetup() {
		if(textTrack < splitText.length) {
			var frameWord = splitText[textTrack];
			if(frameWord.charCodeAt(frameWord.length - 1) > 122 || frameWord.charCodeAt(frameWord.length - 1) < 65) {
				if(frameWord === splitText[textTrack - 1]) {
					document.getElementById("readbox").innerHTML = splitText[textTrack];
					textTrack++;
				}
				else {
				frameWord = frameWord.substring(0, frameWord.length - 1);
				splitText[textTrack] = frameWord;
				splitText.splice(textTrack, 0, frameWord);
				document.getElementById("readbox").innerHTML = splitText[textTrack];
				textTrack++;
				}
			}
			else{
				document.getElementById("readbox").innerHTML = splitText[textTrack];
				textTrack++;
			}
		}
		else {
			stopText();
		}
	}
	
	//enables and disables the start and stop button when animation is or not in progress
	function toggleButtons() {
		if(timer === null) {
			document.getElementById("stopbutton").disabled = true;
			document.getElementById("stopbutton").style.backgroundColor = "#D3D3D3";
			document.getElementById("startbutton").disabled = false;
			document.getElementById("startbutton").style.backgroundColor = "white";
		}
		else {
			document.getElementById("startbutton").disabled = true;
			document.getElementById("startbutton").style.backgroundColor = "#D3D3D3";
			document.getElementById("stopbutton").disabled = false;
			document.getElementById("stopbutton").style.backgroundColor = "white";
		}
	}
	
})();