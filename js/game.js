function Game(){
	var that = {},
	scene = new THREE.Scene(),
	camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 1, 1000 ),
	renderer = new THREE.WebGLRenderer(),
	loop = function(){
		requestAnimationFrame( loop );
		render();
		renderer.render( scene, camera );
	},
	render = function(){
		earth.render();
		// Flourish.camera.rotation.x += 0.01;
		// Flourish.camera.position.y += 0.01;
		// Flourish.camera.rotation.z += 0.01;

	},
	mouseMove = function(){
		if (event.clientX > window.innerWidth-100)
			Flourish.camera.position.x++;
		if (event.clientX < 100)
			Flourish.camera.position.x--;

		if (event.clientY > window.innerHeight-100)
			Flourish.camera.position.y--;
		if (event.clientY < 100)
			Flourish.camera.position.y++;
	},

	resizeWindow = function(){
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
	},
	setup = function(){
		renderer.setSize( window.innerWidth, window.innerHeight );
		camera.position.z = 5;
		document.body.appendChild( renderer.domElement );
		document.addEventListener( 'mousedown', mouseMove, false );
		window.addEventListener( 'resize', resizeWindow, false );
	};
	that.loop = loop;
	that.setup = setup;
	that.scene =scene;
	that.camera = camera;
	that.renderer = renderer;
	return that;
}
var Flourish = Game();
Flourish.setup(); 

function Unit(){
	var that = {};
	return that;
}
function Planet(){
	var that = Unit(),
	add = function(x,y){
		var texture = new THREE.Texture( generateTexture( ) );
		texture.needsUpdate = true; 
		var sphereGeometry =new THREE.SphereGeometry(0.5, 35, 35);
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
		Flourish.scene.add(sphere);

		var outlineMaterial1 = new THREE.MeshBasicMaterial( { color: 0xffffff, side: THREE.BackSide } );
		var outlineMesh1 = new THREE.Mesh( sphereGeometry, outlineMaterial1 );
		outlineMesh1.position.x = sphere.position.x;
		outlineMesh1.position.y = sphere.position.y;
		outlineMesh1.scale.multiplyScalar(1.05);
		Flourish.scene.add( outlineMesh1 );




	},
	render = function(){
		this.sphere.rotation.y += 0.05; 
		
	};
	that.render=render;
	that.add = add; 
	return that; 
}

for(i=0;i<5;i++){
	var eve = Planet();
	eve.add(i,i);
}
var earth = Planet();
earth.add(0,2); 

var mars = Planet();
mars.add(-3,2);

var jupiter = Planet();
jupiter.add(-3,0);

Flourish.loop(); 



function generateTexture( ) {

    // draw a circle in the center of the canvas
    var size = 128;
    
    // create canvas
    var canvas = document.createElement( 'canvas' );
    canvas.width = size;
    canvas.height = size;
    
    // get context
    var context = canvas.getContext( '2d' );
    
    // draw circle
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

}