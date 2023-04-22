import './style.css'

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

// Add the renderer to the DOM
document.body.appendChild(renderer.domElement);

const fov = 45;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000.0;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);


const helper = new THREE.CameraHelper( camera );
//x,y.z
camera.position.set(0, 0, 20);


//const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

function render() {
  renderer.render(scene, camera);
}

// Resize the renderer when the window size changes
function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

window.addEventListener('resize', onWindowResize, false);


const light = new THREE.AmbientLight(  0xFFFFFF); // white light
scene.add( light );

///////////////////////////////////////////////////////////////////////
// Audio - tron, Son of Flynn 
const listener = new THREE.AudioListener();
camera.add(listener);

const sound = new THREE.Audio(listener);

const audioLoader = new THREE.AudioLoader();
audioLoader.load( 'assets/audio/Son_of_Flynn.mp3', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( true );
	sound.setVolume( 0.2 );

  //sound.play();
});

//////////////////////////////////////////////////////////////////////
const loader = new GLTFLoader();
let model;
let model1;

loader.load('assets/Magic room textured/Magic room textured.gltf', function(gltf){
  model1 = gltf.scene;
  scene.add(model1);

  gltf.scene.traverse( function ( child ) {
    if ( child.isMesh ) {
      // Create a new texture for each mesh
      let texture;
      if (child.name === "Mesh1") {
        
        texture = new THREE.TextureLoader().load( 'assign1/assets/Magic room textured/Textures/T_BedSheet_Diffuse.png' );
      } else if (child.name === "Mesh2") {
        texture = new THREE.TextureLoader().load( 'assets/Magic room textured/Textures/T_Chest_Diffuse.png' );
      } else if (child.name === "Mesh3") {
        texture = new THREE.TextureLoader().load( 'assets/Magic room textured/Textures/T_Plant_Diffuse.png' );
      } else if (child.name === "Mesh4") {
        texture = new THREE.TextureLoader().load( 'assets/Magic room textured/Textures/T_Vine_Diffuse.png' );
      } else if (child.name === "Mesh5") {
        texture = new THREE.TextureLoader().load( 'assets/Magic room textured/Textures/T_Book_1.png' );
      } else if (child.name === "Mesh6") {
        texture = new THREE.TextureLoader().load( 'assets/Magic room textured/Textures/T_Book_2.png' );
      }

      // Apply the texture to the mesh's material
      child.material.map = texture;
      child.material.needsUpdate = true;
    }
  } );


}, undefined, function (error) {
  console.error(error);
});

const clock = new THREE.Clock();
const radius = 6;
const angularSpeed = 1;

let delorean;

loader.load('assets/retro_delorean/test/new_delorean2.gltf', function (gltf) {
  delorean = gltf.scene;
  delorean.position.x = -8;
  
  scene.add(delorean);
  
}, undefined, function (error) {
  console.error(error);
});

loader.load('assets/skull_downloadable/scene.gltf', function (gltf) {
    model = gltf.scene;
    model.position.x = 8;

    const textureLoader1 = new THREE.TextureLoader();
    const texture1 = textureLoader1.load('assets/skull_downloadable/textures/defaultMat_baseColor.jpeg');

    const textureLoader2 = new THREE.TextureLoader();
    const texture2 = textureLoader2.load('assets/skull_downloadable/textures/defaultMat_normal.jpeg');

   
    model.traverse(function (child) {
      if (child.isMesh) {
        child.material.map = texture1;
        child.material.normalMap = texture2;
      }
    });
    
    scene.add(model);

}, undefined, function (error) {
    console.error(error);
});
/*
const skullCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );
skullCamera.position.set(0,0,5);
skullCamera.lookAt(model.position);
*/

// Cube map code - this code make the background using 6 images
// Creates the illusion of open world uing cube texture mapping
scene.background = new THREE.CubeTextureLoader()
	.setPath( 'assets/map/' )
	.load( [
		'space.jpg',
		'space.jpg',
		'space.jpg',
		'space.jpg',
		'space.jpg',
		'space.jpg'
	] );


  /*
const textureLoader = new THREE.TextureLoader();
textureLoader.load('assets/space.jpg', function (texture) {
    scene.background = texture;
});
*/
const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BoxGeometry( 5, 5, 5 );
const material = new THREE.MeshBasicMaterial( {color: 0xff99ff} );
const cube = new THREE.Mesh( geometry, material );

cube.position.y = 5;

scene.add( cube );

camera.lookAt(cube.position);
scene.add(camera);


// create a random number of cubes and spheres with random positions in the scene
for (let i = 0; i < 100; i++) {
  const geometry = Math.random() < 0.5 ? new THREE.BoxGeometry(2, Math.random() * 2, Math.random() * 2) : new THREE.SphereGeometry(0.3, 16, 16);
  const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
  const object = new THREE.Mesh(geometry, material);
  object.position.set(
    Math.random() * 100 - 50,
    Math.random() * 100 - 50,
    Math.random() * 100 - 50
  );
  scene.add(object);
}

document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowUp") {
    // Arrow Up key pressed
    camera.position.set(20,20,20);
    console.log("Arrow Up key pressed");
  } else if (event.key === "ArrowDown") {
    // Arrow Down key pressed
    camera.position.set(-20,-20,-20);
    console.log("Arrow Down key pressed");
  } else if (event.key === "ArrowLeft") {
    // Arrow Left key pressed
    camera.position.set(10,10,10);
    console.log("Arrow Left key pressed");
  } else if (event.key === "ArrowRight") {
    // Arrow Right key pressed
    camera.position.set(1,1,7);
    console.log("Arrow Right key pressed");
  }
});

document.getElementById("myBtn").addEventListener("click", playMusic);

function playMusic(){

  if(sound.isPlaying) {
    sound.pause();
  } else sound.play();

}

//let activeCamera = camera;

let scrollValue = 0;

function onMouseWheel(event) {
  // Normalize scroll value across different browsers
  const delta = -event.deltaY * 0.001;
  scrollValue += delta;
}

window.addEventListener('wheel', onMouseWheel, { passive: false });


function animate() {
    requestAnimationFrame(animate);
    //cube.rotation.y += 0.03;

    controls.update();

    if (model) {
        //model.rotation.x += 0.01;
        model.rotation.y += 0.03;
    }
    
    //This code move the delorean model along a circle 
    //with a specified radius and angular speed
    //const delta = clock.getDelta();
    //const angle = angularSpeed * clock.elapsedTime;
    const angle = angularSpeed * scrollValue;
  

    if (delorean) {
      delorean.position.x = -radius * Math.cos(angle);
      delorean.position.z = -radius * Math.sin(angle);
      
      const tangent = new THREE.Vector3(-Math.sin(angle), 0, Math.cos(angle));

    // Set model orientation to face the tangent direction
      delorean.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tangent);
      
    }

    renderer.render(scene, camera);
}


animate();

