makerSkills = new Meteor.Collection('makerSkills');
dataFS = new CollectionFS('dataFS');


skillNames = [ "Sewing", "3d printing", "Carpentry/Joinery", "Welding", "Other", //Physical
			   "Code", "3d modelling", "Sound", "Interface Design" , "Other", //Digital
			   "Soldering","CircuitDesign", "Robotics", "Lasers",  "Other"  //Electronics 
				];
skillIds= ["s0", "s1","s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s10", "s11", "s12", "s13", "s14"];