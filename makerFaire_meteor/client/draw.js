skills = {};
links = {};

pI = null;


Meteor.startup(function(){

	//page variables
	Session.set('isVisual', false); 
	Session.set('isForm', false);
	Session.set('isThanks', false);
	Session.set('isAdmin', false);
	Session.set('isSplash', true);


	Meteor.autorun(function(){
	
		makerSkills.find({}).fetch();
	
		if(Session.get('isVisual')){
		
			findSkillPops();
			findLinkPops();
			calcCoordinates();
		}

	});

});


findSkillPops = function(){

	 for(var i = 0; i < 15; i ++){
	 	
	 	var field = {};
	 	field[skillIds[i]] = {$gt: 0};
	 	
	 	skills[skillIds[i]].pop = makerSkills.find(field).fetch().length;
 
	 }
}


findLinkPops = function(){


	for(var i = 0; i < 15; i ++){
		
		for(var j = i + 1; j < 15; j ++){
			
			var field = {};
	 		field[skillIds[j]] = {$gt: 0};
	 		field[skillIds[i]] = {$gt: 0};
			
			var str = skillIds[i] + "_" + skillIds[j];
			links[str].pop = makerSkills.find(field).fetch().length;
			
	
		}
	}	

}


sketchProc = function(p) {
 	
	var skillColors = [p.color(0,46,136), p.color(0,64,191), p.color(64,112,207), p.color(128,160,223),p.color(191,207,239),
						 p.color(65,85,61), p.color(117,157,90) ,p.color(149,202,87) , p.color(166,202,134) ,p.color(192,222,164),
						p.color(136,9,0),p.color(191,13,0),p.color(207,74,64),p.color(223,134,138),p.color(235,195,191)];
	var font = null;
	var maxHexSize = 500,  minHexSize = 50;
	var camDist = 0;
	var spaceUnit = 0;
	var skillMull = 5;
	var labelWidth = 400;
	var labelScale = 0.4;
	var caper;
	var physical, electronics, digital;
  
	p.setup = function(){
  
		p.size(p.screenWidth - 5, p.screenHeight -5, p.P3D);
		p.frameRate(30);
		p.smooth();
		p.bezierDetail(25);
		var cameraZ = (p.height/2.0) / p.tan(p.PI*60.0/360.0);
		p.perspective(p.PI/3.0, p.width/p.height, cameraZ/12.0, cameraZ*14.0); 

		createLinks();
	
		font = p.createFont("Helvetica Neue");
		p.textFont(font, 30);
		p.textAlign(p.CENTER, p.CENTER);
		
		var skill = null;
		
		for(var i = 0; i < 15; i++){
			
			var skill = {name: skillNames[i], col: skillColors[i], pop: 0};
			var str = skillIds[i];
			skills[skillIds[i]] = skill;
			var imgPath = 'labels/' + i +'.png';
			skills[skillIds[i]].image = p.loadImage(imgPath);
			
			
		}
		
		caper = p.loadImage('caper_400.png');
		physical = p.loadImage('physical.jpg');
		electronics = p.loadImage('electronics.png');
		digital = p.loadImage('digital.png');
		
		findLinkPops();
		findSkillPops();
		calcCoordinates();
		
  
  }
  
  
  createLinks = function(){
  
  	for(var h = 0; h < 3; h++){
		
			var count = 0;
		
			for(var i = 0; i < 4; i++){
				
				for(var j = i + 1; j < 5; j++){
				
						var sockets = [{a:[0,-0.5,0], b: [0,-0.5,0]},{a:[0,1,0], b: [0,1,0]}, {a:[0,1,0], b: [0,1,0]}];
						var controls = [{a:[0,-1,0], b: [0,-1,0]},{a:[0,1,-1], b: [0,1,-0.5]}, {a:[0,1,1], b: [0,1,0.5]}];
						
						var tLink = {a: i + h * 5, b: j + h * 5, pop: 0}; 
						
						tLink.sockets = sockets[h];
						tLink.controls = controls[h];
						
						var dist = Math.abs(tLink.a - tLink.b);
						
						if(h == 0){
							tLink.controls.a[2] += -0.75 + i * 0.5;
							tLink.controls.b[2] += -0.75 + i * 0.5;
							tLink.controls.a[1] -= dist * 0.1;
							tLink.controls.b[1] -= dist * 0.1;
						}
						
						if(h == 1){
							tLink.controls.a[0] += -0.4 + i * 0.4;
							tLink.controls.b[0] += -0.4 + i * 0.4;
							tLink.controls.a[1] += dist * 0.1;
							tLink.controls.b[1] += dist * 0.1;
						}
						
						if(h == 2){
							tLink.controls.a[0] += 0.4 + i * -0.4;
							tLink.controls.b[0] += 0.4 + i * -0.4;
							tLink.controls.a[1] += dist * 0.1;
							tLink.controls.b[1] += dist * 0.1;
						}
						
						var str = skillIds[tLink.a] + "_" + skillIds[tLink.b];
						links[str] = tLink;
						
						count ++;
				
				}
		
			}
		
		}
		
		
		//2-3
		for(var i = 0; i < 5; i++){
			
			for(var j = 0; j < 5; j++){
			
				var tLink = {a: i + 5, b: j + 10, pop: 0}; 
					
					var controls = [{a:[1,-0.4,-2], b: [-1,-0.4,-2]}, {a:[1,-0.5,1], b: [-1,-0.3,1]}]
					
					tLink.sockets ={a:[1,0,0], b: [-1,0,0]};
					tLink.controls = (j < 3)?controls[0] : controls[1];
					
					
					 var str = skillIds[tLink.a] + "_" + skillIds[tLink.b];
					links[str] = tLink;
				
			}
			
		}
		
		
		//0-1
		for(var i = 0; i < 5; i++){
			
			for(var j = 0; j < 5; j++){
			
				var tLink = {a: i, b: j + 5, pop: 0}; 
					
					var sockets = [{a:[0,1,0], b: [1,0, 0]},{a:[0,1,0], b: [1,0, 0]},{a:[0,1,0], b: [0,-1, 0]},{a:[0,1,0], b: [0,-1, 0]},{a:[0,1,0], b: [0,-1, 0]}];
					var controls = [{a:[0,1,0], b: [1,0, 0]},{a:[0,1,0], b: [1,0, 0]}, {a:[0,1,0], b: [0,-1, 0]},{a:[0,1,0], b: [0,-1, 0]},{a:[0,1,0], b: [0,-1, 0]}];
					
					tLink.sockets = sockets[j];
					tLink.controls = controls[j];
					
					
					var str = skillIds[tLink.a] + "_" + skillIds[tLink.b];
					links[str] = tLink;
				
			}
			
		}
		
		
		//0-2
		for(var i = 0; i < 5; i++){
			
			for(var j = 0; j < 5; j++){
			
				var tLink = {a: i, b: j + 10, pop: 0}; 
					
					var sockets = [{a:[0,1,0], b: [-1,0, 0]},{a:[0,1,0], b: [-1,0, 0]},{a:[0,1,0], b: [0,-1, 0]},{a:[0,1,0], b: [0,-1, 0]},{a:[0,1,0], b: [0,-1, 0]}];
					var controls = [{a:[0,1,0], b: [-1,0, 0]},{a:[0,1,0], b: [-1,0, 0]}, {a:[0,1,0], b: [0,-1, 0]},{a:[0,1,0], b: [0,-1, 0]},{a:[0,1,0], b: [0,-1, 0]}];
					
					tLink.sockets = sockets[j];
					tLink.controls = controls[j];
					
					
					 var str = skillIds[tLink.a] + "_" + skillIds[tLink.b];
					links[str] = tLink;
				
			}
			
		}
		
		
		
  }
  
  
  drawCylinder = function( sides, r, h){
  		
  		p.pushMatrix();
  		p.rotateZ(p.radians(30));
		var angle = 360 / sides;
		var halfHeight = h / 2;
		// draw top shape
	
		p.beginShape();
		for (var i = 0; i < sides; i++) {
			var x = Math.cos( p.radians( i * angle ) ) * r;
			var y = Math.sin( p.radians( i * angle ) ) * r;
			p.vertex( x, y, -halfHeight );    
		}
		p.endShape(p.CLOSE);
		
		// draw bottom shape
		p.beginShape();
		for (var i = 0; i < sides; i++) {
			var x = Math.cos( p.radians( i * angle ) ) * r;
			var y = Math.sin( p.radians( i * angle ) ) * r;
			p.vertex( x, y, halfHeight );    
		}
		p.endShape(p.CLOSE);
		
		
		// draw body
		p.beginShape();
		for (var i = 0; i < sides; i++) {
			var x = Math.cos( p.radians( i * angle ) ) * r;
			var y = Math.sin( p.radians( i * angle ) ) * r;
			var x1 = Math.cos( p.radians( (i+1)%sides * angle ) ) * r;
			var y1 = Math.sin( p.radians( (i+1)%sides * angle ) ) * r;
			p.vertex( x, y, halfHeight);
			p.vertex( x, y, -halfHeight); 
			p.vertex( x1, y1, -halfHeight); 
			p.vertex( x1, y1, halfHeight); 
			  
		}
		p.endShape(p.CLOSE);
		
		p.popMatrix();
		
	}
  
  	calcCoordinates = function(){
  
  	//first work out dimensions
  	var c_max = minHexSize;
  	
  	for(var i = 0; i < skillIds.length; i++){
  	
  		skills[skillIds[i]].dim = Math.max(minHexSize, skills[skillIds[i]].pop * skillMull);
		skills[skillIds[i]].dim = Math.min(skills[skillIds[i]].dim , maxHexSize);
		c_max = Math.max(skills[skillIds[i]].dim, c_max);
		
  	}
  	
  	spaceUnit =  c_max * (2 - 0.5 * (c_max-minHexSize)/(maxHexSize-minHexSize));
  	spaceUnit = Math.max(minHexSize * 2, spaceUnit);
  	camDist = 6 * spaceUnit;
  	
  	labelScale = c_max/maxHexSize * 2.5;
  
	var ini_x = -spaceUnit * 2
	var ini_y = -spaceUnit * 2;
	var ini_z = -spaceUnit * 2;

	for(var i = 0; i < 5; i++){
		
		skills[skillIds[i]].x = ini_x + i * spaceUnit;    //1
		skills[skillIds[i]].y = ini_y; 					//0
		skills[skillIds[i]].z = ini_z + i * spaceUnit * 0.75; //.75
				 
		skills[skillIds[i]].tx = -labelWidth/2 * labelScale;
		skills[skillIds[i]].ty = skills[skillIds[i]].dim * 2 + labelWidth/8 * labelScale;
		skills[skillIds[i]].tz = 0;
		
	}
	
	ini_x = -spaceUnit * 2.75;
	ini_y = -spaceUnit;
	ini_z = -spaceUnit * 3;


	var count = 0;

	for(var i = 5; i < 10; i ++){
				
		skills[skillIds[i]].x = ini_x + count * spaceUnit * 0.5;  //.5
		skills[skillIds[i]].y = ini_y + count * spaceUnit;         //1
		skills[skillIds[i]].z = ini_z + count * spaceUnit * 0.75; //.75
				 
		skills[skillIds[i]].tx = skills[skillIds[i]].dim * 2;
		skills[skillIds[i]].ty = -labelWidth/8 * labelScale;
		skills[skillIds[i]].tz = 0;
		
		count++;
		
	}
	
	count = 0;
	
	ini_x = spaceUnit * 2.75;
	ini_y = -spaceUnit;
	ini_z = spaceUnit * 2;

	for(var i = 10; i < 15; i ++){
		
		skills[skillIds[i]].x = ini_x + count * spaceUnit * -0.5; //-.5
		skills[skillIds[i]].y = ini_y + count * spaceUnit;  //1
		skills[skillIds[i]].z = ini_z + count * spaceUnit * -0.75; //-.75
				 
		skills[skillIds[i]].tx = -skills[skillIds[i]].dim * 2 - labelWidth * labelScale;
		skills[skillIds[i]].ty = -labelWidth/8 * labelScale;
		skills[skillIds[i]].tz = 0;
		
		count++;
	

	}
  
  
  }
  
  
	p.draw = function() {

		p.background(255);
		p.fill(255);
		p.stroke(255);
		p.pushMatrix();
			p.translate(p.width, p.height);
			p.scale(0.5,0.5);
			p.image(caper, -caper.width * 1.25, -caper.height * 1.35);
		p.popMatrix();
		
		
		p.pushMatrix();
			p.translate(p.width - 50, 50);
			p.scale(0.34,0.39);
			p.image(electronics, -physical.width, 0, 400,351);
			p.image(digital, -physical.width, 400, 400,351);
			p.image(physical, -physical.width, 800 , 400,351);
		p.popMatrix();
		
		var centerX = p.width / 2, centerY = p.height / 2;
		var orbitRadius = p.width/4 + camDist;
		var ypos= 0;
		var xpos= Math.cos(p.radians(p.frameCount/5)) * orbitRadius;
		var zpos= Math.sin(p.radians(p.frameCount/5)) * orbitRadius;


		p.camera(xpos, ypos, zpos, 0, 0, 0, 0, -1, 0);
		
		p.beginCamera();
		
		p.fill(255);
		
		for(var i = 0; i < 15; i ++){

			p.pushMatrix();
			
				p.translate(skills[skillIds[i]].x, skills[skillIds[i]].y, skills[skillIds[i]].z);
				
				
				
				p.rotateZ(p.radians(180));
				p.translate(skills[skillIds[i]].tx, skills[skillIds[i]].ty,0);
				
				
				
				p.scale(labelScale, labelScale, 1);
				p.image(skills[skillIds[i]].image, 0,0,labelWidth, labelWidth/4);
				
				p.rotateY(p.radians(180));
				
				p.translate(-labelWidth,0,5);
				p.image(skills[skillIds[i]].image,0,0, labelWidth, labelWidth/4);
				
				
				
			p.popMatrix();

		}
		
		//stupid hack for fill ?!!
		p.fill(255);
		p.box(1);
		
		// draw the hexagons
		
		p.stroke(255);


		for(var i = 0; i < skillIds.length; i ++){
		
			p.fill(skills[skillIds[i]].col);
			p.pushMatrix();	
				p.translate(skills[skillIds[i]].x, skills[skillIds[i]].y, skills[skillIds[i]].z);
				drawCylinder(6,skills[skillIds[i]].dim, skills[skillIds[i]].dim);
				
			p.popMatrix();

		}
		

		
		
		
		p.noFill();
		
			
		
		for(var tlink in links){
				
				
				if(links[tlink].pop > 0){
				
					
					var a = "s" + links[tlink].a;
					var b = "s" + links[tlink].b;
					
					var weight = 0;
					
					if(links[tlink].pop < 5){ 
						weight = 1;
					}else if(links[tlink].pop < 10){
						weight = 2;
					}else if(links[tlink].pop < 15){
						weight = 3;
					}else if(links[tlink].pop < 20){
						weight = 4;
					}else if(links[tlink].pop < 30){
						weight = 5;
					}else if(links[tlink].pop < 40){
						weight = 6;
					}else{
						weight = 7;						
					}
					
					var col = p.color(
									(p.red(skills[a].col) + p.red(skills[b].col))/2,
									(p.green(skills[a].col)  + p.green(skills[b].col))/2,
									(p.blue(skills[a].col) + p.blue(skills[b].col))/2
									);
					
					
					
					p.stroke(col);
					p.strokeWeight(weight);
					
				
					
					var asock = [
									skills[a].dim * 0.9 * links[tlink].sockets.a[0],
									skills[a].dim * 0.9 * links[tlink].sockets.a[1],
									skills[a].dim * 0.9 * links[tlink].sockets.a[2]
								];
					var bsock = [
									skills[b].dim * 0.9 * links[tlink].sockets.b[0],
									skills[b].dim * 0.9 * links[tlink].sockets.b[1],
									skills[b].dim * 0.9 * links[tlink].sockets.b[2]
								];
					
					var bezScale = spaceUnit * 0.65;
								
					var aAdd = [links[tlink].controls.a[0] * bezScale,
								links[tlink].controls.a[1] * bezScale,
								links[tlink].controls.a[2] * bezScale,
								];
								
					var bAdd = [
							links[tlink].controls.b[0] * bezScale,
							links[tlink].controls.b[1] * bezScale,
							links[tlink].controls.b[2] * bezScale,
						];
					
					
					p.bezier(
							skills[a].x + asock[0], skills[a].y + asock[1] , skills[a].z + asock[2],
							skills[a].x + asock[0] + aAdd[0], skills[a].y + asock[1] + aAdd[1], skills[a].z + asock[2] + aAdd[2], //control
							skills[b].x + bsock[0] + bAdd[0], skills[b].y + bsock[1] + bAdd[1], skills[b].z + bsock[2] + bAdd[2], //control
							skills[b].x + bsock[0], skills[b].y + bsock[1], skills[b].z + bsock[2]
							);
		
						
				}
			

		}
	
	p.strokeWeight(1);
	p.endCamera();
	


    
    
  };
  
}
