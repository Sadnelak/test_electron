
(()=>{
	'use strict'

  const $ = document.querySelector.bind(document)
  const fs = require('fs')
	
	const remote = require('electron').remote;     

	 // change value of global prop1
	 var mainFolder = remote.getGlobal('conf').mainFolder;

	var setMainFolder = function (){
		var libelleFolder = $('#mainFolderLabel');
		console.log(mainFolder);
		libelleFolder.innerHTML=mainFolder;
	}
	

	var readPhotos =function (){
		fs.readdir(mainFolder, (err, dir) => {
			var list =$('#photos_list');
			console.log(list);

			console.log(dir);
	 		if(dir != null && dir != undefined){
			    for (var i=0; i<dir.length; i++) {
			        list.innerHTML+=formatImageToHtml(dir[i]);
			    }
			}
		});
	}

	var setFolder = function(){
		var dialog = remote.dialog;
		dialog.showOpenDialog({
		    properties: ['openDirectory']
		}).then(result => {

		  console.log(result.canceled)
		  console.log(result.filePaths)
		  mainFolder=result.filePaths[0];
		  setMainFolder();
			readPhotos();
			saveConf();
		}).catch(err => {
		  console.log(err)
		});
		

	}

	var formatImageToHtml =function (imageName){
		return '<li > '+imageName+' <img class="img" src="'+mainFolder+'//'+imageName+'" /> </li>';
	}

	var initPage = function() {
		var button = document.getElementById("selectFolder");
		button.innerHTML = "Selectionner le dossier";
		button.onclick=function(){setFolder();}
		setMainFolder();
		readPhotos();	
	}

	var saveConf=function(){
		remote.getGlobal('conf').mainFolder=mainFolder;
		console.log(remote.getGlobal('conf'));
		fs.writeFile('conf.json', JSON.stringify(remote.getGlobal('conf')), 'utf8', function(err) {
		  if(err) {
		  	let myNotification = new Notification('Gestionnaire de fichier', {
			  body: err
			})
		    return console.log(err);
		  }
		  let myNotification = new Notification('Gestionnaire de fichier', {
			  body: 'Enregistrement du dossier cible effectué.'
			})
		 console.log('File was saved');
		});
	}

	initPage();

})()
