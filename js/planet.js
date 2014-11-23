function Planet(def){
	var that = def,
	randomTexture = function(){
		var size = 200;
		var canvas = document.createElement( 'canvas' );
		canvas.width = size;
		canvas.height = size;
		var context = canvas.getContext( '2d' );
		context.rect( 0, 0, size, size);
		var x = 100, y = 100;
		var gradient = context.createRadialGradient( x,y,10,x,y,100);
		var calc = Calc();
		for(var i = calc.getBetween(3,10);i<10;i++)
			gradient.addColorStop(calc.getBetween(0,1),calc.getRandomColor());
		var opacity = 1;
		that.strength = calc.getBetween(20,50);
		for(i = 0;i < that.strength;i++){
			context.beginPath();
			context.fillStyle = "rgba(" + Math.floor(calc.getBetween(50,255)) + "," + Math.floor(calc.getBetween(50,255)) + "," + Math.floor(calc.getBetween(50,255)) + "," + calc.getBetween(0.1,1) + ")";
			context.arc(calc.getBetween(0,200),calc.getBetween(0,200),calc.getBetween(0,100),calc.getBetween(0,100),calc.getBetween(0,100),calc.getBetween(0,1));
			context.fill();
		}
		return canvas;
	},
	add = function(x,y){
		var texture = new THREE.Texture(randomTexture());
		texture.needsUpdate = true; 
		var sphereGeometry =new THREE.SphereGeometry(0.3, 35, 35);
		sphere = new THREE.Mesh(
			sphereGeometry,
			new THREE.MeshBasicMaterial({
				map:texture,
				transparent:false,
				wireframe: false,
				color:0x00AA00
			}) );
		sphere.position.x = x;
		sphere.position.y = y;

		that.sphere = sphere;
		flourish.scene.add(sphere);


		// outline
		var outlineMaterial1 = new THREE.MeshBasicMaterial({ opacity:0.1, transparent:true} );
		var outlineMesh1 = new THREE.Mesh(sphereGeometry, outlineMaterial1);
		outlineMesh1.position.x = sphere.position.x;
		outlineMesh1.position.y = sphere.position.y;
		outlineMesh1.scale.multiplyScalar(2);
		flourish.scene.add( outlineMesh1 );
		var min = -0.002, max = 0.005;

		that.rotateX = Calc().getBetween(min,max);
		that.rotateY = Calc().getBetween(min,max);
		that.rotateZ = Calc().getBetween(min,max);

	},
	render = function(){
		if ((Math.random()*2) % 2)
			this.sphere.rotation.y += that.rotateY; 
		if ((Math.random()*2) % 2)
			this.sphere.rotation.z += that.rotateZ; 
		if ((Math.random()*2) % 2)
			this.sphere.rotation.x += that.rotateX; 
	};
	that.randomTexture = randomTexture;
	that.render=render;
	that.add = add; 
	return that; 
}
function PlanetCollection(){
	var that = Collection();
	return that;
}