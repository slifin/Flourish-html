function Planet(){
	var that = {},
	randomTexture = function(){
		var size = 128;
		var canvas = document.createElement( 'canvas' );
		canvas.width = size;
		canvas.height = size;
		var context = canvas.getContext( '2d' );
		context.rect( 0, 0, size*5, size*5 );
		var gradient = context.createRadialGradient( 1, 1, size, size,0,0);
		gradient.addColorStop(0, '#fff');
		gradient.addColorStop(0.2, '#ccc');
		gradient.addColorStop(0.3, '#fff');
		gradient.addColorStop(0.5, '#fff');
		gradient.addColorStop(0.6, '#fff');
		gradient.addColorStop(1, '#000');
		context.fillStyle = gradient;
		context.fill();
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
				transparent:true,
				color: Math.random() *0x00AAFF,
				wireframe: false,
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
		this.sphere.rotation.y += 0.05; 
	};
	that.render=render;
	that.add = add; 
	return that; 
}
function PlanetCollection(){
	var that = Collection();
	return that;
}