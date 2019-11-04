
(()=>{
	'use strict'

  const $ = document.querySelector.bind(document)
  const fs = require('fs')
	
	const remote = require('electron').remote;     

	 // change value of global prop1
	 var mainFolder = remote.getGlobal('conf').mainFolder;

	var setMainFolder = function (){
		var libelleFolder = document.getElementById('mainFolderLabel');
		console.log(mainFolder);
		libelleFolder.innerHTML=mainFolder;
	}
	

	var readPhotos =function (){
		fs.readdir(mainFolder, (err, dir) => {
			var list =document.getElementById('photos_list');
			console.log(list);

			console.log(dir);
	 
		    for (var i=0; i<dir.length; i++) {
		        list.innerHTML+=formatImageToHtml(dir[i]);
		    }
		});
	}

	var setFolder = function(){
		var remoteItem = require('remote');
		var dialog = remoteItem.require('electron').dialog;

		mainFolder = dialog.showOpenDialog({
		    properties: ['openDirectory']
		});
		setMainFolder();
		
	}

	var formatImageToHtml =function (imageName){
		return '<li > '+imageName+' <img class="img" src="./photos/'+imageName+'" /> </li>';
	}

	var initPage = function() {
		var button = document.getElementById("selectFolder");
		button.innerHTML = "Selectionner le dossier";
		button.onclick=function(){setFolder();}
		setMainFolder();
		readPhotos();	
	}

	initPage();

})()
