


function sketchProc(p){

	var skills = [];
	var links = [];
	
	var skillNames = ["Other", "Soldering", "CircuitDesign", "Robotics", "Lasers", 
					  "Other", "Sewing", "3d printing", "Carpentry/Joinery", "Welding",
					  "Other", "Code", "3d modelling", "Sound", "Interface Design"];
	
	var skillColors = [p.color(0,46,136), p.color(0,64,191), p.color(64,112,207), p.color(128,160,223),p.color(191,207,239),
						 p.color(65,85,61), p.color(117,157,90) ,p.color(149,202,87) , p.color(166,202,134) ,p.color(192,222,164),
						p.color(136,9,0),p.color(191,13,0),p.color(207,74,64),p.color(223,134,138),p.color(235,195,191)];
	
	
  	var font = null;
  	var maxHexSize = 500,  minHexSize = 50;
  	var camDist = 0;
  	var spaceUnit = 0;
  
	p.setup = function(){
  
		p.size(p.screenWidth, p.screenHeight, p.P3D);
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
			
			var skill = {name: skillNames[i], col: skillColors[i], pop: i*35};
			skills.push(skill);
			
		}
		
		
		calcCoordinates();
  	
  
  }
  
  
  createLinks = function(){
  
  	for(var h = 0; h < 3; h++){
		
			var count = 0;
		
			for(var i = 0; i < 4; i++){
				
				for(var j = i + 1; j < 5; j++){
				
						var sockets = [{a:[0,-0.5,0], b: [0,-0.5,0]},{a:[0,1,0], b: [0,1,0]}, {a:[0,1,0], b: [0,1,0]}];
						var controls = [{a:[0,-1,0], b: [0,-1,0]},{a:[0,1,-1], b: [0,1,-0.5]}, {a:[0,1,1], b: [0,1,0.5]}];
						
						var tLink = {a: i + h * 5, b: j + h * 5, pop: 1}; 
						
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
						
						
						links.push(tLink);
						
						count ++;
				
				}
		
			}
		
		}
		
		
		//2-3
		for(var i = 0; i < 5; i++){
			
			for(var j = 0; j < 5; j++){
			
				var tLink = {a: i + 5, b: j + 10, pop: 1}; 
					
					var controls = [{a:[1,-0.4,-2], b: [-1,-0.4,-2]}, {a:[1,-0.5,1], b: [-1,-0.3,1]}]
					
					tLink.sockets ={a:[1,0,0], b: [-1,0,0]};
					tLink.controls = (j < 3)?controls[0] : controls[1];
					
					
				links.push(tLink);
				
			}
			
		}
		
		
		//0-1
		for(var i = 0; i < 5; i++){
			
			for(var j = 0; j < 5; j++){
			
				var tLink = {a: i, b: j + 5, pop: 1}; 
					
					var sockets = [{a:[0,1,0], b: [1,0, 0]},{a:[0,1,0], b: [1,0, 0]},{a:[0,1,0], b: [0,-1, 0]},{a:[0,1,0], b: [0,-1, 0]},{a:[0,1,0], b: [0,-1, 0]}];
					var controls = [{a:[0,1,0], b: [1,0, 0]},{a:[0,1,0], b: [1,0, 0]}, {a:[0,1,0], b: [0,-1, 0]},{a:[0,1,0], b: [0,-1, 0]},{a:[0,1,0], b: [0,-1, 0]}];
					
					tLink.sockets = sockets[j];
					tLink.controls = controls[j];
					
					
				links.push(tLink);
				
			}
			
		}
		
		
		//0-2
		for(var i = 0; i < 5; i++){
			
			for(var j = 0; j < 5; j++){
			
				var tLink = {a: i, b: j + 10, pop: 1}; 
					
					var sockets = [{a:[0,1,0], b: [-1,0, 0]},{a:[0,1,0], b: [-1,0, 0]},{a:[0,1,0], b: [0,-1, 0]},{a:[0,1,0], b: [0,-1, 0]},{a:[0,1,0], b: [0,-1, 0]}];
					var controls = [{a:[0,1,0], b: [-1,0, 0]},{a:[0,1,0], b: [-1,0, 0]}, {a:[0,1,0], b: [0,-1, 0]},{a:[0,1,0], b: [0,-1, 0]},{a:[0,1,0], b: [0,-1, 0]}];
					
					tLink.sockets = sockets[j];
					tLink.controls = controls[j];
					
					
				links.push(tLink);
				
			}
			
		}
		
		
		for(var i = 0; i < links.length; i++){
			links[i].pop = (Math.random() > 0.3) ? Math.min( Math.random() * 500, Math.random() * 500) : 0;
		}
  }
  
  
  drawCylinder = function( sides, r, h){
  
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
		
	}
  
  	calcCoordinates = function(){
  
  	//first work out dimensions
  	var c_max = minHexSize;
  	
  	for(var i = 0; i < skills.length; i++){
  	
  		skills[i].dim = Math.max(minHexSize, skills[i].pop);
		skills[i].dim = Math.min(skills[i].dim , maxHexSize);
		c_max = Math.max(skills[i].dim, c_max);
		
  	}
  	
  	spaceUnit =  c_max * (2 - 0.5 * (c_max-minHexSize)/(maxHexSize-minHexSize));
  	spaceUnit = Math.max(minHexSize * 2, spaceUnit);
  	camDist = 6 * spaceUnit;
  
	var ini_x = -spaceUnit * 2
	var ini_y = -spaceUnit * 2;
	var ini_z = -spaceUnit * 2;

	for(var i = 0; i < 5; i++){
		
		skills[i].x = ini_x + i * spaceUnit;    //1
		skills[i].y = ini_y; 					//0
		skills[i].z = ini_z + i * spaceUnit * 0.75; //.75
				 
		skills[i].tx = 0;
		skills[i].ty = -skills[i].dim * 2;
		skills[i].tz = 0;
		
	}
	
	ini_x = -spaceUnit * 2.75;
	ini_y = -spaceUnit;
	ini_z = -spaceUnit * 3;


	var count = 0;

	for(var i = 5; i < 10; i ++){
				
		skills[i].x = ini_x + count * spaceUnit * 0.5;  //.5
		skills[i].y = ini_y + count * spaceUnit;         //1
		skills[i].z = ini_z + count * spaceUnit * 0.75; //.75
				 
		skills[i].tx = -skills[i].dim * 2;
		skills[i].ty = 15;
		skills[i].tz = 0;
		
		count++;
		
	}
	
	count = 0;
	
	ini_x = spaceUnit * 2.75;
	ini_y = -spaceUnit;
	ini_z = spaceUnit * 2;

	for(var i = 10; i < 15; i ++){
		
		skills[i].x = ini_x + count * spaceUnit * -0.5; //-.5
		skills[i].y = ini_y + count * spaceUnit;  //1
		skills[i].z = ini_z + count * spaceUnit * -0.75; //-.75
				 
		skills[i].tx = skills[i].dim * 2;
		skills[i].ty = 15;
		skills[i].tz = 0;
		
		count++;
	

	}
  
  
  }
  
  
	p.draw = function() {

		p.background(255);


		var centerX = p.width / 2, centerY = p.height / 2;
		var orbitRadius = p.width/4 + camDist;
		var ypos= 0;
		var xpos= Math.cos(p.radians(p.frameCount/5)) * orbitRadius;
		var zpos= Math.sin(p.radians(p.frameCount/5)) * orbitRadius;

		p.camera(xpos, ypos, zpos, 0, 0, 0, 0, -1, 0);

		// draw the hexagons
		
		p.stroke(0);

		for(var i = 0; i < skills.length; i ++){
			
			p.fill(skills[i].col);
			//p.noFill();
			p.pushMatrix();
			
				p.translate(skills[i].x, skills[i].y, skills[i].z);
				
				drawCylinder(6,skills[i].dim, skills[i].dim);
				
				p.pushMatrix();
				p.translate(skills[i].tx, skills[i].ty, skills[i].tz);
				p.rotateZ(p.radians(180));
				p.stroke(0);
				p.fill(0);
				p.text(skills[i].name, 0,0);
				p.popMatrix();
				
			p.popMatrix();

		}
		
		
		
		p.noFill();
		
			
		
		for(var i = 0; i < links.length; i ++){
			
				if(links[i].pop > 0){
					
					var weight = 0;
					var col = 0;
					
					if(links[i].pop < 100){ 
						weight = 1;
						col = (200 - links[i].pop * 2);
					}else if(links[i].pop < 200){
						weight = 2;
						col = (400 - links[i].pop * 2);
					}else if(links[i].pop < 300){
						weight = 3;
						col = (600 - links[i].pop * 2);
					}else if(links[i].pop < 400){
						weight = 4;
						col = (800 - links[i].pop * 2);
					}else{
						weight = 5;
						col = (1000 - links[i].pop * 2);
					}
					
					
					p.stroke(100);
					p.strokeWeight(weight);
					
					var a = links[i].a;
					var b = links[i].b;
					
					var asock = [
									skills[a].dim * 0.9 * links[i].sockets.a[0],
									skills[a].dim * 0.9 * links[i].sockets.a[1],
									skills[a].dim * 0.9 * links[i].sockets.a[2]
								];
					var bsock = [
									skills[b].dim * 0.9 * links[i].sockets.b[0],
									skills[b].dim * 0.9 * links[i].sockets.b[1],
									skills[b].dim * 0.9 * links[i].sockets.b[2]
								];
					
					var bezScale = spaceUnit * 0.65;
								
					var aAdd = [links[i].controls.a[0] * bezScale,
								links[i].controls.a[1] * bezScale,
								links[i].controls.a[2] * bezScale,
								];
								
					var bAdd = [
							links[i].controls.b[0] * bezScale,
							links[i].controls.b[1] * bezScale,
							links[i].controls.b[2] * bezScale,
						];
					
					
		
					
					/*if(p.frameCount == 1){
					console.log(asock);
					console.log(bsock);
					console.log(aAdd);
					console.log(bAdd);
					}*/
					
					p.bezier(
							skills[a].x + asock[0], skills[a].y + asock[1] , skills[a].z + asock[2],
							skills[a].x + asock[0] + aAdd[0], skills[a].y + asock[1] + aAdd[1], skills[a].z + asock[2] + aAdd[2], //control
							skills[b].x + bsock[0] + bAdd[0], skills[b].y + bsock[1] + bAdd[1], skills[b].z + bsock[2] + bAdd[2], //control
							skills[b].x + bsock[0], skills[b].y + bsock[1], skills[b].z + bsock[2]
							);
		
						
				}
			

		}
	
	p.strokeWeight(1);
    
    
  };
  
}


var canvas = document.getElementById("canvas1");
// attaching the sketchProc function to the canvas
var pI = new Processing(canvas, sketchProc);

