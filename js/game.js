function Game(){
	var that = {},
	scene = new THREE.Scene(),
	camera = new THREE.PerspectiveCamera(
		45, window.innerWidth / window.innerHeight, 0.1,  20000 ),
	renderer = new THREE.WebGLRenderer(),
	planets = PlanetCollection(),
	loop = function(){
		requestAnimationFrame(loop);
		render();
		renderer.render(scene, camera);
	},
	render = function(){
		planets.foreach(function(planet){
			planet.render();
		});
	},
	navigation = function(){
		if (event.clientX > window.innerWidth-100)
			flourish.camera.position.x++;
		if (event.clientX < 100)
			flourish.camera.position.x--;

		if (event.clientY > window.innerHeight-100)
			flourish.camera.position.y--;
		if (event.clientY < 100)
			flourish.camera.position.y++;
	},
	resizeWindow = function(){
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	},
	setup = function(){
		renderer.setSize(window.innerWidth, window.innerHeight);
		camera.position.z = 10;
		document.body.appendChild(renderer.domElement);
		// document.body.appendChild(Planet().randomTexture());
		document.addEventListener('mousedown', navigation, false);
		window.addEventListener('resize', resizeWindow, false );
	};
	that.loop = loop;
	that.setup = setup;
	that.scene =scene;
	that.camera = camera;
	that.renderer = renderer;
	that.planets = planets;
	return that;
}



var flourish = Game();
var calc = Calc();
flourish.setup(); 

for(i=0;i<15;i++){
	var eve = Planet({name:'eve'+i});
	eve.add(calc.getBetween(-5,12),calc.getBetween(-5,12));
	flourish.planets.add('eve'+i,eve);
}
flourish.loop(); 


