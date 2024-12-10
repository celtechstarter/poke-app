import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const RotatingBallWithImage = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Szene, Kamera und Renderer erstellen
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(200, 200); // Größe der Canvas
    mountRef.current.appendChild(renderer.domElement);

    // Kugel erstellen
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    
    // Textur laden
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("/images/Pokeball.png"); // Bildpfad
    const material = new THREE.MeshStandardMaterial({ map: texture }); // Textur anwenden
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Licht hinzufügen
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 10, 10);
    scene.add(light);

    // Kamera positionieren
    camera.position.z = 3;

    // Animations-Loop
    const animate = () => {
      requestAnimationFrame(animate);
      sphere.rotation.y += 0.01; // Kugel rotieren
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} />;
};

export default RotatingBallWithImage;
