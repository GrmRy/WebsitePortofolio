<script setup>
import { onMounted, onUnmounted } from 'vue'

let renderer, animationId

onMounted(() => {
  const THREE = window.THREE

  const scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x050b14, 0.0016)

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 30

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.getElementById('canvas-container').appendChild(renderer.domElement)

  const group = new THREE.Group()
  scene.add(group)

  const geos = [
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.TetrahedronGeometry(1),
    new THREE.OctahedronGeometry(1)
  ]

  const mats = [
    new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true, transparent: true, opacity: 0.28 }),
    new THREE.MeshBasicMaterial({ color: 0xa855f7, wireframe: true, transparent: true, opacity: 0.18 })
  ]

  for (let i = 0; i < 150; i++) {
    const mesh = new THREE.Mesh(
      geos[Math.floor(Math.random() * geos.length)],
      mats[Math.floor(Math.random() * 2)]
    )
    mesh.position.set(
      (Math.random() - 0.5) * 100,
      (Math.random() - 0.5) * 100,
      (Math.random() - 0.5) * 50 - 20
    )
    const s = Math.random() * 2 + 0.5
    mesh.scale.set(s, s, s)
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0)
    mesh.userData = {
      rx: (Math.random() - 0.5) * 0.02,
      ry: (Math.random() - 0.5) * 0.02
    }
    group.add(mesh)
  }

  // Connecting lines
  const pts = []
  for (let i = 0; i < 50; i++) {
    pts.push(new THREE.Vector3(
      (Math.random() - 0.5) * 80,
      (Math.random() - 0.5) * 80,
      (Math.random() - 0.5) * 40 - 10
    ))
  }
  group.add(new THREE.LineSegments(
    new THREE.BufferGeometry().setFromPoints(pts),
    new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.06 })
  ))

  // Mouse parallax
  let mx = 0, my = 0
  const onMouseMove = (e) => {
    mx = (e.clientX - window.innerWidth / 2) * 0.001
    my = (e.clientY - window.innerHeight / 2) * 0.001
  }
  document.addEventListener('mousemove', onMouseMove)

  // Resize
  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', onResize)

  // Animate
  const animate = () => {
    animationId = requestAnimationFrame(animate)
    group.rotation.y += (mx - group.rotation.y) * 0.05
    group.rotation.x += (my - group.rotation.x) * 0.05
    group.children.forEach(c => {
      if (c.userData.rx) {
        c.rotation.x += c.userData.rx
        c.rotation.y += c.userData.ry
      }
    })
    camera.position.y = -(window.scrollY * 0.01)
    renderer.render(scene, camera)
  }
  animate()

  onUnmounted(() => {
    cancelAnimationFrame(animationId)
    renderer.dispose()
    document.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('resize', onResize)
    const canvas = document.getElementById('canvas-container')
    if (canvas) canvas.innerHTML = ''
  })
})
</script>

<template>
  <div id="canvas-container" class="animated-background"></div>
</template>

<style scoped>
.animated-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}
</style>