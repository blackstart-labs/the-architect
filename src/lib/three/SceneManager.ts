import * as THREE from 'three';
import { constructionStages } from '$content/home/home.content';

export class SceneManager {
	private container: HTMLElement;
	private scene: THREE.Scene;
	private camera: THREE.PerspectiveCamera;
	private renderer: THREE.WebGLRenderer;
	private isDisposed = false;

	// Logical Structural Groups for the 13 Stages
	private groupSite = new THREE.Group();
	private groupExcavation = new THREE.Group();
	private groupPiling = new THREE.Group();
	private groupFoundation = new THREE.Group();
	private groupColumnsFrame = new THREE.Group();
	private groupFloorSlabs = new THREE.Group();
	private groupFacade = new THREE.Group();
	private groupBim = new THREE.Group();
	private groupMep = new THREE.Group();
	private groupCranes = new THREE.Group();
	private groupInterior = new THREE.Group();
	private groupFinalInterior = new THREE.Group();
	private groupCompleted = new THREE.Group();

	// Root structural assembly
	private structureRoot = new THREE.Group();

	// Materials collection for transitions
	private materials: Record<string, THREE.Material> = {};

	// Current and target camera state
	private currentCamPos = new THREE.Vector3(0, 18, 32);
	private targetCamPos = new THREE.Vector3(0, 18, 32);
	private currentCamLookAt = new THREE.Vector3(0, 0, 0);
	private targetCamLookAt = new THREE.Vector3(0, 0, 0);

	constructor(container: HTMLElement) {
		this.container = container;
		const width = container.clientWidth || window.innerWidth;
		const height = container.clientHeight || window.innerHeight;

		// 1. Scene
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color(0x121212);
		this.scene.fog = new THREE.FogExp2(0x121212, 0.015);

		// 2. Camera
		this.camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 500);
		this.camera.position.copy(this.currentCamPos);
		this.camera.lookAt(this.currentCamLookAt);

		// 3. Renderer
		this.renderer = new THREE.WebGLRenderer({
			antialias: true,
			powerPreference: 'high-performance',
			alpha: false
		});
		this.renderer.setSize(width, height);
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFShadowMap;
		this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
		this.renderer.toneMappingExposure = 1.1;

		container.appendChild(this.renderer.domElement);

		// 4. Setup Lighting
		this.setupLighting();

		// 5. Initialize Materials
		this.initMaterials();

		// 6. Build Procedural Architectural Stages
		this.buildArchitecturalComponents();

		// 7. Initial Stage State
		this.setStage(0, 0);

		// 8. Start Render Loop
		this.render = this.render.bind(this);
		requestAnimationFrame(this.render);
	}

	private setupLighting() {
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
		this.scene.add(ambientLight);

		// Main Architectural Sun Light
		const sunLight = new THREE.DirectionalLight(0xfffaed, 2.2);
		sunLight.position.set(40, 70, 35);
		sunLight.castShadow = true;
		sunLight.shadow.mapSize.width = 2048;
		sunLight.shadow.mapSize.height = 2048;
		sunLight.shadow.camera.near = 10;
		sunLight.shadow.camera.far = 160;
		sunLight.shadow.camera.left = -35;
		sunLight.shadow.camera.right = 35;
		sunLight.shadow.camera.top = 35;
		sunLight.shadow.camera.bottom = -35;
		sunLight.shadow.bias = -0.0005;
		this.scene.add(sunLight);

		// Technical Rim / Fill Light
		const rimLight = new THREE.DirectionalLight(0xe5a93c, 0.8);
		rimLight.position.set(-30, 20, -30);
		this.scene.add(rimLight);
	}

	private initMaterials() {
		// Architectural Blueprint Wireframe
		this.materials.blueprintWireframe = new THREE.MeshBasicMaterial({
			color: 0x0ea5e9,
			wireframe: true,
			transparent: true,
			opacity: 0.5
		});

		// Architectural Grid / Site Ground
		this.materials.siteGround = new THREE.MeshStandardMaterial({
			color: 0x1f1f1f,
			roughness: 0.9,
			metalness: 0.1
		});

		// Excavation Rock & Earth
		this.materials.earth = new THREE.MeshStandardMaterial({
			color: 0x24221c,
			roughness: 0.95,
			metalness: 0.05
		});

		// Reinforced Concrete Raft & Columns
		this.materials.concrete = new THREE.MeshStandardMaterial({
			color: 0x71717a,
			roughness: 0.85,
			metalness: 0.15
		});

		// High-Strength Structural Steel (Graphite / Primer)
		this.materials.steel = new THREE.MeshStandardMaterial({
			color: 0x27272a,
			roughness: 0.4,
			metalness: 0.85
		});

		// Rebar High-Yield Steel Cage
		this.materials.rebar = new THREE.MeshStandardMaterial({
			color: 0xef4444,
			roughness: 0.5,
			metalness: 0.7
		});

		// Architectural Low-E Glass Facade
		this.materials.glass = new THREE.MeshPhysicalMaterial({
			color: 0x38bdf8,
			metalness: 0.1,
			roughness: 0.1,
			transmission: 0.82,
			thickness: 0.5,
			transparent: true,
			opacity: 0.45
		});

		// BIM Multi-Discipline Clash Colors
		this.materials.bimStructural = new THREE.MeshStandardMaterial({ color: 0x3b82f6 });
		this.materials.bimMepHvac = new THREE.MeshStandardMaterial({ color: 0x10b981 });
		this.materials.bimMepPlumbing = new THREE.MeshStandardMaterial({ color: 0x06b6d4 });
		this.materials.bimArchitecture = new THREE.MeshStandardMaterial({ color: 0xe5a93c });

		// Interior Finishes & Mass Timber
		this.materials.timber = new THREE.MeshStandardMaterial({
			color: 0x92400e,
			roughness: 0.7,
			metalness: 0.05
		});
	}

	private buildArchitecturalComponents() {
		this.scene.add(this.structureRoot);

		// ----------------------------------------------------
		// 01. Site Survey & Ground Datum Grid
		// ----------------------------------------------------
		const groundGeo = new THREE.PlaneGeometry(80, 80, 20, 20);
		const groundMesh = new THREE.Mesh(groundGeo, this.materials.siteGround);
		groundMesh.rotation.x = -Math.PI / 2;
		groundMesh.position.y = 0;
		groundMesh.receiveShadow = true;
		this.groupSite.add(groundMesh);

		const gridHelper = new THREE.GridHelper(80, 40, 0xe5a93c, 0x313131);
		gridHelper.position.y = 0.01;
		this.groupSite.add(gridHelper);

		// Survey benchmark datum prism
		const prismGeo = new THREE.CylinderGeometry(0.3, 0.3, 2, 8);
		const prismMat = new THREE.MeshStandardMaterial({ color: 0xe5a93c, metalness: 0.8 });
		const prism = new THREE.Mesh(prismGeo, prismMat);
		prism.position.set(12, 1, 12);
		this.groupSite.add(prism);

		this.structureRoot.add(this.groupSite);

		// ----------------------------------------------------
		// 02. Excavation Pit & Secant Wall
		// ----------------------------------------------------
		const pitWidth = 24;
		const pitDepth = 6;
		const pitLength = 24;
		const pitGeo = new THREE.BoxGeometry(pitWidth, pitDepth, pitLength);
		const pitMesh = new THREE.Mesh(pitGeo, this.materials.earth);
		pitMesh.position.set(0, -pitDepth / 2, 0);
		this.groupExcavation.add(pitMesh);

		// Secant retaining piles perimeter
		const pileGeo = new THREE.CylinderGeometry(0.4, 0.4, pitDepth + 2, 8);
		for (let i = -pitWidth / 2; i <= pitWidth / 2; i += 1.2) {
			const secant1 = new THREE.Mesh(pileGeo, this.materials.concrete);
			secant1.position.set(i, -pitDepth / 2, -pitLength / 2);
			this.groupExcavation.add(secant1);

			const secant2 = new THREE.Mesh(pileGeo, this.materials.concrete);
			secant2.position.set(i, -pitDepth / 2, pitLength / 2);
			this.groupExcavation.add(secant2);
		}
		this.structureRoot.add(this.groupExcavation);

		// ----------------------------------------------------
		// 03. Deep Piles (Foundation Friction & Socket Grid)
		// ----------------------------------------------------
		const deepPileGeo = new THREE.CylinderGeometry(0.5, 0.5, 12, 8);
		for (let x = -8; x <= 8; x += 4) {
			for (let z = -8; z <= 8; z += 4) {
				const pile = new THREE.Mesh(deepPileGeo, this.materials.concrete);
				pile.position.set(x, -12, z);
				this.groupPiling.add(pile);
			}
		}
		this.structureRoot.add(this.groupPiling);

		// ----------------------------------------------------
		// 04. Concrete Mat Foundation (2.8m thick raft)
		// ----------------------------------------------------
		const matGeo = new THREE.BoxGeometry(20, 2.5, 20);
		const matMesh = new THREE.Mesh(matGeo, this.materials.concrete);
		matMesh.position.set(0, -4.75, 0);
		matMesh.receiveShadow = true;
		matMesh.castShadow = true;
		this.groupFoundation.add(matMesh);

		// High-density rebar grid wireframe overlay
		const rebarGeo = new THREE.BoxGeometry(19.6, 2.3, 19.6);
		const rebarMesh = new THREE.Mesh(rebarGeo, this.materials.rebar);
		rebarMesh.position.set(0, -4.75, 0);
		this.groupFoundation.add(rebarMesh);
		this.structureRoot.add(this.groupFoundation);

		// ----------------------------------------------------
		// 05. Structural Columns, Core & Diagrid Frame
		// ----------------------------------------------------
		// Concrete Shear Core
		const coreGeo = new THREE.BoxGeometry(6, 32, 6);
		const coreMesh = new THREE.Mesh(coreGeo, this.materials.concrete);
		coreMesh.position.set(0, 12.5, 0);
		coreMesh.castShadow = true;
		this.groupColumnsFrame.add(coreMesh);

		// Perimeter Steel Columns
		const colGeo = new THREE.CylinderGeometry(0.35, 0.35, 32, 8);
		const colPositions = [
			[-9, -9],
			[-9, 0],
			[-9, 9],
			[0, -9],
			[0, 9],
			[9, -9],
			[9, 0],
			[9, 9]
		];
		colPositions.forEach(([cx, cz]) => {
			const col = new THREE.Mesh(colGeo, this.materials.steel);
			col.position.set(cx, 12.5, cz);
			col.castShadow = true;
			this.groupColumnsFrame.add(col);
		});

		// Diagrid Bracing Members
		for (let y = 0; y < 28; y += 4) {
			const beamXGeo = new THREE.BoxGeometry(18, 0.4, 0.4);
			const beamX = new THREE.Mesh(beamXGeo, this.materials.steel);
			beamX.position.set(0, y, 9);
			this.groupColumnsFrame.add(beamX);

			const beamXBack = new THREE.Mesh(beamXGeo, this.materials.steel);
			beamXBack.position.set(0, y, -9);
			this.groupColumnsFrame.add(beamXBack);
		}
		this.structureRoot.add(this.groupColumnsFrame);

		// ----------------------------------------------------
		// 06. Floor Slabs (Post-Tensioned Plates)
		// ----------------------------------------------------
		const slabGeo = new THREE.BoxGeometry(18.2, 0.35, 18.2);
		for (let fl = 0; fl <= 7; fl++) {
			const slab = new THREE.Mesh(slabGeo, this.materials.concrete);
			slab.position.set(0, fl * 4, 0);
			slab.receiveShadow = true;
			slab.castShadow = true;
			this.groupFloorSlabs.add(slab);
		}
		this.structureRoot.add(this.groupFloorSlabs);

		// ----------------------------------------------------
		// 07. Unitized Curtain Wall Facade
		// ----------------------------------------------------
		const facadeGeo = new THREE.BoxGeometry(18.6, 28, 18.6);
		const facadeMesh = new THREE.Mesh(facadeGeo, this.materials.glass);
		facadeMesh.position.set(0, 14, 0);
		this.groupFacade.add(facadeMesh);
		this.structureRoot.add(this.groupFacade);

		// ----------------------------------------------------
		// 08. BIM LOD 400 Coordination Overlay (Clash Colors)
		// ----------------------------------------------------
		const bimCore = new THREE.Mesh(
			new THREE.BoxGeometry(6.2, 28.2, 6.2),
			this.materials.bimStructural
		);
		bimCore.position.set(0, 14, 0);
		this.groupBim.add(bimCore);
		this.structureRoot.add(this.groupBim);

		// ----------------------------------------------------
		// 09. MEP Risers & HVAC Ducts
		// ----------------------------------------------------
		const ductGeo = new THREE.BoxGeometry(1.2, 28, 1.2);
		const duct = new THREE.Mesh(ductGeo, this.materials.bimMepHvac);
		duct.position.set(4, 14, 4);
		this.groupMep.add(duct);

		const pipeGeo = new THREE.CylinderGeometry(0.3, 0.3, 28, 12);
		const pipe = new THREE.Mesh(pipeGeo, this.materials.bimMepPlumbing);
		pipe.position.set(-4, 14, 4);
		this.groupMep.add(pipe);
		this.structureRoot.add(this.groupMep);

		// ----------------------------------------------------
		// 10. Tower Cranes & Site Logistics
		// ----------------------------------------------------
		const mastGeo = new THREE.BoxGeometry(1, 40, 1);
		const mast = new THREE.Mesh(mastGeo, new THREE.MeshStandardMaterial({ color: 0xd97706 }));
		mast.position.set(13, 16, 0);
		this.groupCranes.add(mast);

		const jibGeo = new THREE.BoxGeometry(22, 0.8, 0.8);
		const jib = new THREE.Mesh(jibGeo, new THREE.MeshStandardMaterial({ color: 0xd97706 }));
		jib.position.set(4, 36, 0);
		this.groupCranes.add(jib);
		this.structureRoot.add(this.groupCranes);

		// ----------------------------------------------------
		// 11. Interior Framing & Raised Access Flooring
		// ----------------------------------------------------
		const partitionGeo = new THREE.BoxGeometry(8, 3.2, 0.2);
		const partition = new THREE.Mesh(
			partitionGeo,
			new THREE.MeshStandardMaterial({ color: 0xd4d4d8 })
		);
		partition.position.set(2, 18, 0);
		this.groupInterior.add(partition);
		this.structureRoot.add(this.groupInterior);

		// ----------------------------------------------------
		// 12. Final Architectural Interior & Baffles
		// ----------------------------------------------------
		const baffleGeo = new THREE.BoxGeometry(16, 0.1, 0.4);
		for (let b = -6; b <= 6; b += 1.5) {
			const baffle = new THREE.Mesh(baffleGeo, this.materials.timber);
			baffle.position.set(0, 19.5, b);
			this.groupFinalInterior.add(baffle);
		}
		this.structureRoot.add(this.groupFinalInterior);

		// ----------------------------------------------------
		// 13. Completed Edifice
		// ----------------------------------------------------
		const crownGeo = new THREE.ConeGeometry(4, 6, 4);
		const crown = new THREE.Mesh(crownGeo, this.materials.steel);
		crown.position.set(0, 31, 0);
		crown.rotation.y = Math.PI / 4;
		this.groupCompleted.add(crown);
		this.structureRoot.add(this.groupCompleted);
	}

	public setStage(stageIndex: number, progress: number) {
		const totalStages = constructionStages.length;
		const safeProgress = Math.max(0, Math.min(1, progress));
		const stageProgress = safeProgress * (totalStages - 1);
		const currentIdx = Math.min(Math.floor(stageProgress), totalStages - 1);
		const nextIdx = Math.min(currentIdx + 1, totalStages - 1);
		const fraction = stageProgress - currentIdx;

		const c1 = constructionStages[currentIdx] || constructionStages[0];
		const c2 = constructionStages[nextIdx] || c1;

		// Smooth continuous camera interpolation between stages
		this.targetCamPos.set(
			c1.cameraPosition.x + (c2.cameraPosition.x - c1.cameraPosition.x) * fraction,
			c1.cameraPosition.y + (c2.cameraPosition.y - c1.cameraPosition.y) * fraction,
			c1.cameraPosition.z + (c2.cameraPosition.z - c1.cameraPosition.z) * fraction
		);
		this.targetCamLookAt.set(
			c1.cameraTarget.x + (c2.cameraTarget.x - c1.cameraTarget.x) * fraction,
			c1.cameraTarget.y + (c2.cameraTarget.y - c1.cameraTarget.y) * fraction,
			c1.cameraTarget.z + (c2.cameraTarget.z - c1.cameraTarget.z) * fraction
		);

		// Synchronized 3D rotation with scroll progress (full continuous orbit)
		this.structureRoot.rotation.y = safeProgress * Math.PI * 2;

		// Group Visibility based on current stage index
		const effectiveStage = stageIndex;
		this.groupSite.visible = true;
		this.groupExcavation.visible = effectiveStage >= 1;
		this.groupPiling.visible = effectiveStage >= 2 && effectiveStage <= 7;
		this.groupFoundation.visible = effectiveStage >= 3;
		this.groupColumnsFrame.visible = effectiveStage >= 4;
		this.groupFloorSlabs.visible = effectiveStage >= 5;
		this.groupFacade.visible = (effectiveStage >= 6 && effectiveStage !== 7 && effectiveStage !== 8) || effectiveStage >= 12;
		this.groupBim.visible = effectiveStage === 7;
		this.groupMep.visible = effectiveStage === 8 || (effectiveStage >= 9 && effectiveStage <= 11);
		this.groupCranes.visible = effectiveStage >= 4 && effectiveStage <= 9;
		this.groupInterior.visible = effectiveStage >= 10;
		this.groupFinalInterior.visible = effectiveStage >= 11;
		this.groupCompleted.visible = effectiveStage >= 12;

		// Smooth growth scale on the structure as construction progresses
		if (this.groupColumnsFrame.visible) {
			const growthProgress = effectiveStage >= 10 ? 1 : Math.min(1, Math.max(0.1, (effectiveStage - 3 + fraction) / 6));
			this.groupColumnsFrame.scale.set(1, growthProgress, 1);
		}
		if (this.groupFloorSlabs.visible) {
			const slabGrowth = effectiveStage >= 10 ? 1 : Math.min(1, Math.max(0.1, (effectiveStage - 4 + fraction) / 5));
			this.groupFloorSlabs.scale.set(1, slabGrowth, 1);
		}
	}

	public resize(width: number, height: number) {
		if (this.isDisposed) return;
		this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(width, height);
	}

	private render() {
		if (this.isDisposed) return;

		// Smoothly lerp camera to target
		this.currentCamPos.lerp(this.targetCamPos, 0.08);
		this.currentCamLookAt.lerp(this.targetCamLookAt, 0.08);

		this.camera.position.copy(this.currentCamPos);
		this.camera.lookAt(this.currentCamLookAt);

		this.renderer.render(this.scene, this.camera);
		requestAnimationFrame(this.render);
	}

	public dispose() {
		this.isDisposed = true;
		this.renderer.dispose();
		if (this.renderer.domElement.parentElement) {
			this.renderer.domElement.parentElement.removeChild(this.renderer.domElement);
		}
	}
}
