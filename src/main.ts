import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const wrapper = document.getElementById('app') as HTMLDivElement;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
wrapper.appendChild(renderer.domElement);

const scene = new THREE.Scene();
// 回転軸をオブジェクトと合わせて直感的な操作になるようにしておく
scene.rotateX(-90 * (Math.PI / 180));

// ライティングの設定
const light1 = new THREE.DirectionalLight(0xFFFFFF);
light1.position.set(0, 0, -1);
const light2 = new THREE.DirectionalLight(0xFFFFFF);
light2.position.set(0, 0, 1);
const light3 = new THREE.AmbientLight(0x404040);
scene.add(light1);
scene.add(light2);
scene.add(light3);

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000);

camera.position.z = 300;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;
controls.enableDamping = true;
controls.dampingFactor = 0.1;

// STLファイルをロードしてレンダリング
const stlLoader = new STLLoader();
stlLoader.load('./Stanford_Bunny.stl', (geometry) => {
    const material = new THREE.MeshPhongMaterial({
        color: 0xFFFFFF
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.geometry.center(); // オブジェクトを中央に配置
    scene.add(mesh);

    // レンダリングループ
    const tick = () => {
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }
    tick();
});
