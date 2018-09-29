var loader = new THREE.FileLoader();

var container;
var camera, scene, renderer;
var uniforms, material, mesh;
var mouseX = 0, mouseY = 0, lat = 0, lon = 0, phy = 0, theta = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var dancers;

var startTime = Date.now();
init();

function setupShader() {
	uniforms = {
		time: { type: "f", value: 1.0 },
		resolution: { type: "v2", value: new THREE.Vector2() },
		positions: {
			type: "v2v", value: dancers.positions
		}
	};

	material = new THREE.ShaderMaterial({
		uniforms: uniforms,
		vertexShader: vShader,
		fragmentShader: fShader
	});

	mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
	scene.add(mesh);

	uniforms.resolution.value.x = window.innerWidth;
	uniforms.resolution.value.y = window.innerHeight;

	animate();
}

function init() {
	container = document.getElementById('container');
	renderer = new THREE.WebGLRenderer();
	container.appendChild(renderer.domElement);
	renderer.setSize(window.innerWidth, window.innerHeight);


	camera = new THREE.Camera();
	scene = new THREE.Scene();

	dancers = new Dancers(window.innerWidth, window.innerHeight, 100);

	let numFilesLeft = 2;
	function whenDoneSetupShader() {
		numFilesLeft -= 1;
		if (numFilesLeft === 0) {
			setupShader();
		}
	}

	loader.load('sdf.fs', function (data) { fShader = data; whenDoneSetupShader(); });
	loader.load('sdf.vs', function (data) { vShader = data; whenDoneSetupShader(); });
}

function animate() {
	requestAnimationFrame(animate);
	update();
	render();
}

function update() {
	let dt = 0.01666666;
	// let dt = 1.0;
	dancers.update(dt);
}

function render() {
	let elapsedSeconds = Date.now() - startTime / 1000.0;
	uniforms.time.value = 60. * elapsedSeconds;

	renderer.render(scene, camera);
}