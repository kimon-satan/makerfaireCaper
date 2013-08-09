


function sketchProc(p) {
  // Override draw function, by default it will be called 60 times per second
  
	var sw = p.screenWidth;
	var sh = p.screenHeight;
	var skills = [];
	var skillNames = ["Other", "Soldering", "CircuitDesign", "Robotics", "Lasers", 
					 "Other", "Sewing", "3d printing", "Carpentry/Joinery", "Welding",
					 "Other", "Code", "3d modelling", "Sound", "Interface Design"];
	var boxDim = 100;
	var spread = 2;
  	var font = null;
  
	p.setup = function(){
  
		p.size(sw,sh,p.P3D);
		p.frameRate(30);
		p.smooth();
		p.bezierDetail(100);
	
		// create the initial coordinates for the boxes
		
		var ini_x = -2 * boxDim * spread;
		var ini_y = -boxDim * spread * 2;
		var ini_z = -boxDim * spread * 2;
		var skill = null;
		
		font = p.createFont("Helvetica");
		p.textFont(font, 30);
		p.textAlign(p.CENTER, p.CENTER);
	
		for(var i = 0; i < 5; i++){
		
			skill = {x: ini_x + i * boxDim * spread, y: ini_y, z: ini_z + i * boxDim * spread * 0.75};
			skill.tx = 0;
			skill.ty = -boxDim;
			skill.tz = 0;
			skills.push(skill);
			
		}
		
		ini_x = -2.75 * boxDim * spread;
		ini_y = -boxDim * spread;
		ini_z = -boxDim * spread * 3;
	
		for(var i = 0; i < 5; i ++){
	
			skill = {x: ini_x + i * boxDim * spread/2, y: ini_y + i * boxDim * spread, z: ini_z + i * boxDim * spread * 0.75};
			skill.tx = -boxDim * 2;
			skill.ty = 15;
			skill.tz = 0;
			skills.push(skill);
	
		}
		
		ini_x = 2.75 * boxDim * spread;
		ini_y = -boxDim * spread;
		ini_z = boxDim * spread *2;
	
		for(var i = 0; i < 5; i ++){
	
			skill = {x: ini_x -i * boxDim * spread/2, y: ini_y + i * boxDim * spread, z: ini_z - i * boxDim * spread * 0.75};
			skill.tx = boxDim * 2;
			skill.ty = 15;
			skill.tz = 0;
			skills.push(skill);
	
		}
		
		for(var i = 0; i < skills.length; i++){
			
			skills[i].name = skillNames[i];
			skills[i].col = p.color(Math.random() * 255, Math.random() * 255, Math.random() * 255, 100);
		}
	
  	
  	
  
  
  }
  
	p.draw = function() {

		p.background(255);
		p.lights();
		
	

		var centerX = p.width / 2, centerY = p.height / 2;
		var orbitRadius = p.width/4 + 1500;
		var ypos= 0;
		var xpos= Math.cos(p.radians(p.frameCount/5)) * orbitRadius;
		var zpos= Math.sin(p.radians(p.frameCount/5)) * orbitRadius;

		p.camera(xpos, ypos, zpos, 0, 0, 0, 0, -1, 0);

	// draw the boxes	
		p.stroke(0);

		for(var i = 0; i < skills.length; i ++){
			p.fill(skills[i].col);
			p.pushMatrix();
				p.translate(skills[i].x, skills[i].y, skills[i].z);
				p.box(boxDim);
				
				p.pushMatrix();
				p.translate(skills[i].tx, skills[i].ty, skills[i].tz);
				p.rotateZ(p.radians(180));
				p.stroke(0);
				p.fill(0);
				p.text(skills[i].name, 0,0);
				p.popMatrix();
			p.popMatrix();

		}
		
		
		p.stroke(100);
		p.noFill();
		
	
		
		var cAdd = [[300,0,0], [300,0,0], [-300,0,0], [-300,0,0],[-300,0,0],
					 [0,300,0], [0,300,0], [0,300,0], [0,-300,0],[0,-300,0], 
					 [0,0,300], [0,0,300], [0,0,-300], [0,0,-300],[0,0,-300]];
		
		for(var i = 0; i < skills.length; i ++){
			
			for(var j = 0; j < skills.length; j ++){
				
				if(i != j){
					p.bezier(skills[i].x,skills[i].y, skills[i].z,
							skills[i].x + cAdd[i][0],skills[i].y + cAdd[i][1], skills[i].z + cAdd[i][2], //control
							skills[j].x + cAdd[i][0],skills[j].y + cAdd[i][1], skills[j].z + cAdd[i][2], //control
							skills[j].x, skills[j].y, skills[j].z
							);
						
				}
			}

		}
	
		
		
    
    
  };
}


var canvas = document.getElementById("canvas1");
// attaching the sketchProc function to the canvas
var pI = new Processing(canvas, sketchProc);

