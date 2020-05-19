
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { PMREMGenerator } from 'three/src/extras/PMREMGenerator';



class Section {
    constructor() {

    }

    init(_A) {
        let _App = _A;
        
        // console.log("Section.init()", GLTFLoader);

        const scene = new THREE.Scene(); 
        scene.background = new THREE.Color( 0x333333 );   
        let renderer = new THREE.WebGLRenderer({antialias: true});
        this.obj = {};
        
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        let container = document.querySelector("header");
        container.appendChild(renderer.domElement)
       

        let camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight , 1, 10000)
        camera.position.z = 200;
        camera.lookAt(new THREE.Vector3);
        scene.add(camera);
        
        let light = new THREE.PointLight( 0xffffbb, 2, 0, 2);
        scene.add( light );

        const hemiLight = new THREE.HemisphereLight();
            hemiLight.name = 'hemi_light';
            scene.add(hemiLight);
            
            
        

        const light1  = new THREE.AmbientLight(0x00ffff,2);
        light1.name = 'ambient_light';
        camera.add( light1 );

        const light2  = new THREE.DirectionalLight(0xffffff,1);
        light2.position.set(10, 0, 0.866);
        camera.add( light2 );

        let controls = new OrbitControls(camera, container);
        controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        controls.dampingFactor = 0.09;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;

        controls.screenSpacePanning = false;

        controls.minDistance = 100;
        controls.maxDistance = 500;

        controls.maxPolarAngle = Math.PI / 2;
        function render() {
            // console.log("render");
            requestAnimationFrame(render);
            controls.update();
            
            renderer.render(scene, camera);
          }

        render();

        this.initLoader(scene, renderer);
    }

    

    initLoader(scene, renderer) {

        console.log("initLoader() ");

        let loader = new GLTFLoader();
        loader.obj = this.obj;
        loader.load( 'component.glb', function ( gltf ) {
            
            scene.add( gltf.scene );
            
        }, undefined, function ( error ) {
	        console.error( error );
        } );

        let rgbeLoader = new RGBELoader();
        rgbeLoader.setDataType( THREE.UnsignedByteType );
        // console.log(renderer);
        
        let pmremGenerator = new PMREMGenerator(renderer);

        rgbeLoader.load( 'clouds3.hdr', function ( texture ) {
            console.log("loaded hdr");
            renderer.toneMappingExposure = 0.6;
            let envMap = pmremGenerator.fromEquirectangular( texture ).texture;

				// scene.background = envMap;
				scene.environment = envMap;

				texture.dispose();
				pmremGenerator.dispose();
            
        }, undefined, function ( error ) {
	        console.error( error );
        } );

    }
   


    clickHandler(e) {
        // console.log("canvas clicked CLICKCLICKCLICKCLICKCLICKCLICK",this.n);

        // e.preventDefault();
        // let tgt = "";
        // if (utils.getStatus().type == "mobile") {
        //     // console.log('checking mobiel click', e.targetTouches[0]);
        //     tgt = e.targetTouches[0]
        // } else {
        //     tgt = e;
        // }
        // this.mouse = {
        //     x: tgt.clientX,
        //     y: tgt.clientY
        // }
    }

}

export default Section