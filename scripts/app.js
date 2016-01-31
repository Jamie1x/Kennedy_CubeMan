// MAIN GAME FILE
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var CubeGeometry = THREE.CubeGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var LambertMaterial = THREE.MeshLambertMaterial;
var Mesh = THREE.Mesh;
var SpotLight = THREE.SpotLight;
var PointLight = THREE.PointLight;
var Control = objects.Control;
var GUI = dat.GUI;
var Color = THREE.Color;
var Vector3 = THREE.Vector3;
var AxisHelper = THREE.AxisHelper;
//import Group = THREE.Object3D;
var scene;
var renderer;
var camera;
var cubeGeometry;
var planeGeometry;
var cubeMaterial;
var planeMaterial;
var head;
var body;
var leftArm;
var rightArm;
var leftLeg;
var rightLeg;
var plane;
var spotLight;
var pointLight;
var control;
var gui;
var stats;
var axis;
//var group: Group;
var group = new THREE.Object3D();
function init() {
    // Instantiate a new Scene object
    scene = new Scene();
    setupRenderer(); // setup the default renderer
    setupCamera(); // setup the camera
    //Add an axes helper to the scene
    axis = new AxisHelper(20);
    scene.add(axis);
    //Add a head to the Scene
    cubeGeometry = new CubeGeometry(1, 1, 1);
    cubeMaterial = new LambertMaterial({ color: 0x00ff00, opacity: 0.5 });
    head = new Mesh(cubeGeometry, cubeMaterial);
    head.position.x = 0;
    head.position.y = 4.75;
    head.position.z = 0;
    head.castShadow = true;
    group.add(head); //Add head to group
    console.log("Added head to scene...");
    //Add a body to the Scene
    cubeGeometry = new CubeGeometry(2, 2.5, 1);
    cubeMaterial = new LambertMaterial({ color: 0x00ff00, opacity: 0.5 });
    body = new Mesh(cubeGeometry, cubeMaterial);
    body.position.x = 0;
    body.position.y = 3;
    body.position.z = 0;
    body.castShadow = true;
    group.add(body); //Add body to group
    console.log("Added body to scene...");
    //Add a leftArm to the Scene
    cubeGeometry = new CubeGeometry(2, 0.5, 0.5);
    cubeMaterial = new LambertMaterial({ color: 0x00ff00, opacity: 0.5 });
    leftArm = new Mesh(cubeGeometry, cubeMaterial);
    leftArm.position.x = 1.75;
    leftArm.position.y = 3.75;
    leftArm.position.z = 0;
    leftArm.castShadow = true;
    group.add(leftArm); //Add arm to group
    console.log("Added leftArm to scene...");
    //Add a rightArm to the Scene
    cubeGeometry = new CubeGeometry(2, 0.5, 0.5);
    cubeMaterial = new LambertMaterial({ color: 0x00ff00, opacity: 0.5 });
    rightArm = new Mesh(cubeGeometry, cubeMaterial);
    rightArm.position.x = -1.75;
    rightArm.position.y = 3.75;
    rightArm.position.z = 0;
    rightArm.castShadow = true;
    group.add(rightArm); //Add arm to group
    console.log("Added rightArm to scene...");
    //Add a leftLeg to the Scene
    cubeGeometry = new CubeGeometry(0.5, 2, 0.5);
    cubeMaterial = new LambertMaterial({ color: 0x00ff00, opacity: 0.5 });
    leftLeg = new Mesh(cubeGeometry, cubeMaterial);
    leftLeg.position.x = 0.7;
    leftLeg.position.y = 1;
    leftLeg.position.z = 0;
    leftLeg.castShadow = true;
    group.add(leftLeg); //Add leg to group
    console.log("Added leftLeg to scene...");
    //Add a rightLeg to the Scene
    cubeGeometry = new CubeGeometry(0.5, 2, 0.5);
    cubeMaterial = new LambertMaterial({ color: 0x00ff00, opacity: 0.5 });
    rightLeg = new Mesh(cubeGeometry, cubeMaterial);
    rightLeg.position.x = -0.7;
    rightLeg.position.y = 1;
    rightLeg.position.z = 0;
    rightLeg.castShadow = true;
    group.add(rightLeg); //Add leg to group
    console.log("Added rightLeg to scene...");
    //Add person to scene
    scene.add(group);
    //Add a Plane to the Scene
    planeGeometry = new PlaneGeometry(20, 20);
    planeMaterial = new LambertMaterial({ color: 0xCCCCCC, opacity: 0.5 });
    plane = new Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.y = -2;
    scene.add(plane);
    console.log("Added Plane Primative to scene...");
    // Add a SpotLight to the scene
    spotLight = new SpotLight(0xffffff);
    spotLight.position.set(10, 20, 20);
    spotLight.castShadow = true;
    scene.add(spotLight);
    console.log("Added Spot Light to Scene");
    // add extras
    gui = new GUI();
    control = new Control(0.005, 0.005, 0.005, cubeMaterial.color.getHex());
    addControl(control);
    addStatsObject();
    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
}
function addControl(controlObject) {
    gui.add(controlObject, 'rotationSpeedx', -0.01, 0.01);
    gui.add(controlObject, 'rotationSpeedy', -0.01, 0.01);
    gui.add(controlObject, 'rotationSpeedz', -0.01, 0.01);
    gui.addColor(controlObject, 'color');
}
function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}
// Setup main game loop
function gameLoop() {
    stats.update();
    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
    head.material.color = new Color(control.color);
    body.material.color = new Color(control.color);
    leftArm.material.color = new Color(control.color);
    rightArm.material.color = new Color(control.color);
    leftLeg.material.color = new Color(control.color);
    rightLeg.material.color = new Color(control.color);
    group.rotation.x += control.rotationSpeedx;
    group.rotation.y += control.rotationSpeedy;
    group.rotation.z += control.rotationSpeedz;
    renderer.render(scene, camera);
}
// Setup default renderer
function setupRenderer() {
    renderer = new Renderer();
    renderer.setClearColor(0xCCCCCC, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    console.log("Finished setting up Renderer...");
}
// Setup main camera for the scene
function setupCamera() {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 15;
    camera.position.y = 16;
    camera.position.z = 25;
    camera.lookAt(scene.position);
    console.log("Finished setting up Camera...");
}
//# sourceMappingURL=app.js.map