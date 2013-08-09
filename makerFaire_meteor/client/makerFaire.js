





				
				
var userData;





//start and stopping processing

Template.visuals.rendered = function(){
	
	var canvas = document.getElementById("canvas1");
	if(!pI)pI = new Processing(canvas, sketchProc);

};

Template.visuals.destroyed = function(){
	
	if(pI){
		pI.exit();
		pI = null;
	}

};


Template.webForm.created = function(){
	
	
	userData = {extraSkill0: "", extraSkill1: "", extraSkill2: "", timeStamp: 0};	
	
	for(var i = 0; i < 15; i++){
		userData[skillIds[i]] = 0;
	}
	
}

Handlebars.registerHelper('isVisual', function(){return Session.get('isVisual')});
Handlebars.registerHelper('isForm', function(){return Session.get('isForm')});
Handlebars.registerHelper('isAdmin', function(){return Session.get('isAdmin')});
Handlebars.registerHelper('isSplash', function(){return Session.get('isSplash')});
Handlebars.registerHelper('isThanks', function(){return Session.get('isThanks')});

Template.frontPage.events({
	
	'click button.submit':function(e){
		
		Session.set('isSplash', false);
		
		switch(e.target.id){
			case 'visual': 
				Session.set('isAdmin', false);
				Session.set('isForm', false);
				Session.set('isVisual', true);
			break;
			
			case 'form': 
				Session.set('isAdmin', false);
				Session.set('isForm', true);
				Session.set('isVisual', false);
			break;
			
			case 'admin': 
				Session.set('isAdmin', true);
				Session.set('isForm', false);
				Session.set('isVisual', false);
			break;
		
		}
	
	}

});

											
Template.webForm.row0 = function(){return [{n: skillNames[0], id: "s0"} , 
											{n: skillNames[5], id: "s5"} , 
											{n: skillNames[10], id: "s10"} ]};
Template.webForm.row1 = function(){return [{n: skillNames[1], id: "s1"} , 
											{n: skillNames[6], id: "s6"} , 
											{n: skillNames[11], id: "s11"} ]};
Template.webForm.row2 = function(){return [{n: skillNames[2], id: "s2"} , 
											{n: skillNames[7], id: "s7"} , 
											{n: skillNames[12], id: "s12"} ]};
Template.webForm.row3 = function(){return [{n: skillNames[3], id: "s3"} , 
											{n: skillNames[8], id: "s8"} , 
											{n: skillNames[13], id: "s13"} ]};
Template.webForm.row4 = function(){return [{n: skillNames[4], id: "s4"} , 
											{n: skillNames[9], id: "s9"} , 
											{n: skillNames[14], id: "s14"} ]};

Template.score.events({

	'change select':function(event){
	
		console.log(event.target.id + " " +  event.target.selectedIndex);
		
		var index = parseInt(event.target.id.substring(1));
		
		userData[skillIds[index]] = event.target.selectedIndex;
		
	}
	

});


Template.webForm.events({
	
	'click button.submit': function(){
	
		console.log("event")
		
		userData.extraSkill0 = $('#s4').val();
		userData.extraSkill1 = $('#s9').val();
		userData.extraSkill2 = $('#s14').val();
		
		userData.timeStamp = new Date();
		
		var score = 0;
		
		for(var i = 0; i < 15; i++){
			score += userData[skillIds[i]];
		}
		
		
		if(score > 0){
			makerSkills.insert(userData);
		}
		
		Session.set("isThanks", true);
	
	}

});







Template.thanks.events({
	
	'click button.submit':function(){
	
		Session.set("isThanks", false);
	}

});

Template.admin.events({

	'click button.submit':function(e){
		
		Session.set('error',"");
		
		var password = $('#pw').val();	
		
		if(e.target.id == "clear"){
			
			Meteor.call('clearAll', password, displayErrors);
			
		}else if(e.target.id == "populate"){
			
			
			var nr = $('#numrecords').val();
			
			Meteor.call('populateRecords', nr, password, displayErrors);
			
		}
		
	
	}


});

Template.fileTable.files = function() {
    //show all files that have been published to the client, with most recently uploaded first
    return dataFS.find({}, { sort: { uploadDate:-1 } });
};


//in client.js
Template.fileTable.events({
    'click button.download': function(e) {
        e.preventDefault();
        
        var fn = this.filename;
        
        dataFS.retrieveBlob(this._id, function(fileItem) {
            if (fileItem.blob) {
                saveAs(fileItem.blob, fn);
            } else {
                saveAs(fileItem.file, fn);
            }
        });
    },
    
    'click button.create':function(){
    	
    	Meteor.call('saveToCSV');
    
    }
});



displayErrors = function(error, result){

	if(error){
	
		Session.set('error', error.reason);
		
	}else{
	
		Session.set('isAdmin', false);
		Session.set('isSplash', true);
		
	}

}

Template.admin.created = function(){

	Session.set('error',"");
}

Template.admin.errors = function(){return Session.get("error");}