function Planet(){
	var that = {},
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
			// context.fillRect(calc.getBetween(-200,200), calc.getBetween(-200,200), 220,220);
			context.beginPath();
			context.fillStyle = "rgba(" + Math.floor(calc.getBetween(50,255)) + "," + Math.floor(calc.getBetween(50,255)) + "," + Math.floor(calc.getBetween(50,255)) + "," + calc.getBetween(0.1,1) + ")";

			context.arc(calc.getBetween(0,200),calc.getBetween(0,200),calc.getBetween(0,100),calc.getBetween(0,100),calc.getBetween(0,100),calc.getBetween(0,1));
			context.fill();
		}


		// context.fillStyle = gradient;
		// context.fill();
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

		var outlineMaterial1 = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.BackSide } );
		var outlineMesh1 = new THREE.Mesh(sphereGeometry, outlineMaterial1);
		outlineMesh1.position.x = sphere.position.x;
		outlineMesh1.position.y = sphere.position.y;
		outlineMesh1.scale.multiplyScalar(1.1);
		flourish.scene.add( outlineMesh1 );

	},
	render = function(){
		var min = -0.002, max = 0.002;
		if ((Math.random()*2) % 2)
			this.sphere.rotation.y += Calc().getBetween(min,max); 
		if ((Math.random()*2) % 2)
			this.sphere.rotation.z += Calc().getBetween(min,max); 
		if ((Math.random()*2) % 2)
			this.sphere.rotation.x += Calc().getBetween(min,max); 
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