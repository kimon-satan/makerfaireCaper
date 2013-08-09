var adminPass = "innerbeast";


Meteor.methods({

	'clearAll': function(password){
		
		console.log(password)
		
		if(password == adminPass){
		
			makerSkills.remove({});
			console.log("all records cleared");
			
			return true;
			
		}else{
		
			throw new Meteor.Error(404, "password is incorrect");
		
		}
	
	},
	
	'populateRecords': function(nMakers, password){
	
		if(password == adminPass){
			
			for(var j = 0; j < nMakers; j++){

				var tData = {extraSkill0: "", extraSkill1: "", extraSkill2: "", timeStamp: 0};
	
				for(var i = 0; i < 15; i++){
					tData[skillIds[i]] = (Math.random() > 0.66) ? 1 : 0;
				}
	
				makerSkills.insert(tData);
				
				
			}
			
			return true;
	
			
		}else{
			
			throw new Meteor.Error(404, "password is incorrect");
		
		}


	},
	
	'saveToCSV':function(){
	
		var fileText = 'MakerFaire - data' + '\r\n';
		
		var fileName = new Date();
		fileName = fileName.toUTCString();
		
		fileText += fileName + '\r\n';
		

		
		dataFS.remove({});
		
		console.log("saving");
		
		var skillsArray = makerSkills.find({}).fetch();
		
		for(var i = 0; i < skillsArray.length; i++){
			
			fileText += '\r\n';
			fileText += "id, " + i + ", ";
			
			for(var j =0; j < 15; j++){
			
				if(j == 4){
					var str = (skillsArray[i].extraSkill0 == '')? 'other' :  skillsArray[i].extraSkill0;
					fileText += str + ", ";
				}else if(j == 9){
					var str = (skillsArray[i].extraSkill1 == '')? 'other' :  skillsArray[i].extraSkill1;
					fileText += str + ", ";
				}else if(j == 14){
					var str = (skillsArray[i].extraSkill2 == '')? 'other' :  skillsArray[i].extraSkill2;
					fileText += str + ", ";
				}else{
					fileText += skillNames[j] + ", ";
				}
				
				fileText += skillsArray[i][skillIds[j]] + ", ";
			}
			
		
		}
	
		var buffer = Buffer(fileText.length);
		for (var i = 0; i < fileText.length; i++) {
		
		
				buffer[i] = fileText.charCodeAt(i);
			
		}
		
	
		dataFS.storeBuffer(fileName, buffer, { 
			// Set a contentType (optional)
			contentType: 'text/plain',
			// Stop live update of progress (optional, defaults to false)     
			noProgress: true,
			// Attach custom data to the file  
			metadata: { text: 'some stuff' },
			// Set encoding (optional default 'utf-8')
			encoding: 'utf-8'
		});
	
	
	},
	
	
	

});