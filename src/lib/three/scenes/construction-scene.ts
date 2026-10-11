/**
 * Dhaka Central Mall — Architectural Three.js Procedural Construction Scene
 *
 * Models a realistic contemporary commercial shopping mall development in Dhaka, Bangladesh:
 * 7-story reinforced concrete (RCC) structure (36m x 26m footprint, 8m x 8m column grid),
 * central multi-story retail atrium with crisscrossing escalators, double-height entrance canopy,
 * double-glazed curtain wall with vertical aluminum sun louvers (brise-soleil), rooftop chillers
 * & cooling towers, and authentic Dhaka urban streetscape.
 *
 * Strict building continuity is maintained across all 13 construction phases.
 */

import * as THREE from 'three';

export interface ConstructionScene {
	scene: THREE.Scene;
	camera: THREE.PerspectiveCamera;
	renderer: THREE.WebGLRenderer;
	groups: Map<string, THREE.Group>;
	dispose(): void;
	setSize(width: number, height: number): void;
	setInteriorMode(isInterior: boolean): void;
	setLightingMode(mode: 'day' | 'interior' | 'dusk'): void;
	setExplodedBim(amount: number): void;
}

export function createConstructionScene(canvas: HTMLCanvasElement): ConstructionScene {
	const scene = new THREE.Scene();
	const baseBgColor = new THREE.Color(0x0a0b10);
	scene.background = baseBgColor;
	scene.fog = new THREE.FogExp2(0x0a0b10, 0.009);

	const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 350);
	camera.position.set(28, 16, 32);
	camera.lookAt(0, 2, 0);

	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true,
		powerPreference: 'high-performance',
		alpha: false
	});
	renderer.setPixelRatio(Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2));
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFShadowMap;
	renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.toneMappingExposure = 1.05;

	// Lighting Rig — Realistic Dhaka Solar Coordinates
	const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
	scene.add(ambientLight);

	// Key Tropical Sun Light
	const sunLight = new THREE.DirectionalLight(0xfff5e4, 1.7);
	sunLight.position.set(26, 42, 22);
	sunLight.castShadow = true;
	sunLight.shadow.mapSize.width = 2048;
	sunLight.shadow.mapSize.height = 2048;
	sunLight.shadow.camera.near = 5;
	sunLight.shadow.camera.far = 130;
	sunLight.shadow.camera.left = -30;
	sunLight.shadow.camera.right = 30;
	sunLight.shadow.camera.top = 30;
	sunLight.shadow.camera.bottom = -30;
	sunLight.shadow.bias = -0.0003;
	scene.add(sunLight);

	// Soft Sky Ambient Fill
	const skyFillLight = new THREE.DirectionalLight(0x7dd3fc, 0.4);
	skyFillLight.position.set(-20, 18, -15);
	scene.add(skyFillLight);

	// Dusk / Warm Interior Accent Light
	const duskAccentLight = new THREE.DirectionalLight(0xf59e0b, 0);
	duskAccentLight.position.set(-15, 8, 25);
	scene.add(duskAccentLight);

	// =========================================================================
	// Materials Palette — Authentic Commercial Construction Materials
	// =========================================================================
	const concreteMat = new THREE.MeshStandardMaterial({
		color: 0x545452,
		roughness: 0.9,
		metalness: 0.05
	});
	const concretePouredMat = new THREE.MeshStandardMaterial({
		color: 0x6e6c67,
		roughness: 0.85,
		metalness: 0.05
	});
	const soilMat = new THREE.MeshStandardMaterial({
		color: 0x332519,
		roughness: 0.98,
		metalness: 0.02
	});
	const asphaltMat = new THREE.MeshStandardMaterial({
		color: 0x1a1a1c,
		roughness: 0.92,
		metalness: 0.05
	});
	const curbMat = new THREE.MeshStandardMaterial({
		color: 0x737373,
		roughness: 0.8,
		metalness: 0.1
	});
	const paverMat = new THREE.MeshStandardMaterial({
		color: 0x3f3f46,
		roughness: 0.75,
		metalness: 0.08
	});
	const glassCurtainMat = new THREE.MeshPhysicalMaterial({
		color: 0x78a8c9,
		roughness: 0.08,
		metalness: 0.15,
		transparent: true,
		opacity: 0.32,
		side: THREE.DoubleSide,
		transmission: 0.65,
		ior: 1.45
	});
	const louverBronzeMat = new THREE.MeshStandardMaterial({
		color: 0x9a7b4f,
		roughness: 0.35,
		metalness: 0.75
	});
	const spandrelCharcoalMat = new THREE.MeshStandardMaterial({
		color: 0x222225,
		roughness: 0.4,
		metalness: 0.6
	});
	const rebarMat = new THREE.MeshStandardMaterial({
		color: 0x9c4f24,
		roughness: 0.6,
		metalness: 0.6
	});
	const mepDuctMat = new THREE.MeshStandardMaterial({
		color: 0x71717a,
		roughness: 0.35,
		metalness: 0.65
	});
	const mepChillerMat = new THREE.MeshStandardMaterial({
		color: 0x0284c7,
		roughness: 0.4,
		metalness: 0.5
	});
	const mepGhostMat = new THREE.MeshBasicMaterial({
		color: 0xe5a93c,
		transparent: true,
		opacity: 0.45,
		wireframe: true
	});
	const clashPulseMat = new THREE.MeshBasicMaterial({
		color: 0xef4444,
		wireframe: true
	});
	const terrazzoMat = new THREE.MeshStandardMaterial({
		color: 0x99948a,
		roughness: 0.3,
		metalness: 0.15
	});
	const warmLightMat = new THREE.MeshBasicMaterial({
		color: 0xffedd5
	});
	const markerGoldMat = new THREE.MeshBasicMaterial({
		color: 0xe5a93c
	});
	const urbanBuildingMat = new THREE.MeshStandardMaterial({
		color: 0x1c1c1f,
		roughness: 0.95,
		metalness: 0.05
	});
	const treeCanopyMat = new THREE.MeshStandardMaterial({
		color: 0x2d4a27,
		roughness: 0.9,
		metalness: 0.02
	});
	const treeTrunkMat = new THREE.MeshStandardMaterial({
		color: 0x3e2c1e,
		roughness: 0.95,
		metalness: 0.02
	});
	const tinHoardingMat = new THREE.MeshStandardMaterial({
		color: 0x475569,
		roughness: 0.5,
		metalness: 0.5
	});

	const groups = new Map<string, THREE.Group>();

	// Mall Dimensions: 36m wide (X: -18 to +18) x 26m deep (Z: -13 to +13)
	// Column grid lines: 5 along X (-16, -8, 0, 8, 16) x 4 along Z (-10, -3.33, 3.33, 10)
	const colX = [-16, -8, 0, 8, 16];
	const colZ = [-10, -3.33, 3.33, 10];
	const floors = 6;
	const floorHeight = 3.8;
	const groundHeight = 4.2;
	const buildingHeight = groundHeight + (floors - 1) * floorHeight; // 4.2 + 19 = 23.2m
	const topY = 1.2 + buildingHeight; // 24.4m

	// =========================================================================
	// 01. Urban Context & Dhaka Streetscape
	// =========================================================================
	const urbanGroup = new THREE.Group();
	urbanGroup.name = 'urban-context';

	// Ground site plot base
	const siteBase = new THREE.Mesh(
		new THREE.PlaneGeometry(120, 100, 1, 1),
		new THREE.MeshStandardMaterial({ color: 0x141416, roughness: 0.95, metalness: 0.05 })
	);
	siteBase.rotation.x = -Math.PI / 2;
	siteBase.position.y = -0.02;
	siteBase.receiveShadow = true;
	urbanGroup.add(siteBase);

	// Gulshan Commercial Frontage Asphalt Road (Z: 19 to 32)
	const road = new THREE.Mesh(new THREE.BoxGeometry(110, 0.1, 14), asphaltMat);
	road.position.set(0, 0.05, 26);
	road.receiveShadow = true;
	urbanGroup.add(road);

	// Road center lane markings
	for (let rx = -50; rx <= 50; rx += 5) {
		const laneLine = new THREE.Mesh(
			new THREE.BoxGeometry(2.5, 0.12, 0.25),
			new THREE.MeshBasicMaterial({ color: 0xdedede })
		);
		laneLine.position.set(rx, 0.11, 26);
		urbanGroup.add(laneLine);
	}

	// Concrete Pedestrian Sidewalk with curbs (Z: 13.5 to 19)
	const sidewalk = new THREE.Mesh(new THREE.BoxGeometry(90, 0.25, 5.5), curbMat);
	sidewalk.position.set(0, 0.15, 16.25);
	sidewalk.receiveShadow = true;
	urbanGroup.add(sidewalk);

	// Surrounding Dhaka mid-rise buildings in the backdrop & flanks (realistic city density)
	const surroundingCoords: Array<[number, number, number, number, number]> = [
		[-32, 10, -5, 14, 20], // West commercial mid-rise
		[-34, 12, 18, 12, 24], // Southwest block
		[32, 10, -5, 14, 20], // East commercial mid-rise
		[34, 13, 18, 12, 26], // Southeast block
		[-16, 14, -30, 20, 28], // North background tower 1
		[16, 15, -30, 22, 30] // North background tower 2
	];
	surroundingCoords.forEach(([x, h, z, w, d]) => {
		const bldg = new THREE.Mesh(new THREE.BoxGeometry(w, h * 2, d), urbanBuildingMat);
		bldg.position.set(x, h, z);
		bldg.castShadow = true;
		bldg.receiveShadow = true;
		urbanGroup.add(bldg);

		// Subtle horizontal window bands on surrounding buildings
		for (let fy = 3; fy < h * 2 - 2; fy += 3.5) {
			const band = new THREE.Mesh(
				new THREE.BoxGeometry(w + 0.1, 1.2, d + 0.1),
				new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.5, metalness: 0.3 })
			);
			band.position.set(x, fy, z);
			urbanGroup.add(band);
		}
	});

	// Early Phase Corrugated Tin Site Boundary Hoarding & Site Office Container
	const earlySiteHoardings = new THREE.Group();
	earlySiteHoardings.name = 'site-hoardings';
	// Tin fence around plot (front opening for truck gate)
	const fenceNorth = new THREE.Mesh(new THREE.BoxGeometry(44, 2.6, 0.15), tinHoardingMat);
	fenceNorth.position.set(0, 1.3, -15);
	earlySiteHoardings.add(fenceNorth);

	const fenceWest = new THREE.Mesh(new THREE.BoxGeometry(0.15, 2.6, 30), tinHoardingMat);
	fenceWest.position.set(-20, 1.3, 0);
	earlySiteHoardings.add(fenceWest);

	const fenceEast = new THREE.Mesh(new THREE.BoxGeometry(0.15, 2.6, 30), tinHoardingMat);
	fenceEast.position.set(20, 1.3, 0);
	earlySiteHoardings.add(fenceEast);

	// Front entrance gate posts
	[-8, 8].forEach((gx) => {
		const gatePost = new THREE.Mesh(new THREE.BoxGeometry(0.5, 3.2, 0.5), tinHoardingMat);
		gatePost.position.set(gx, 1.6, 14);
		earlySiteHoardings.add(gatePost);
	});

	// Temporary Site Engineer Office Container (Blue 20ft cabin)
	const siteOffice = new THREE.Mesh(
		new THREE.BoxGeometry(6, 2.6, 2.8),
		new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.4, metalness: 0.6 })
	);
	siteOffice.position.set(-14, 1.3, 11);
	siteOffice.castShadow = true;
	earlySiteHoardings.add(siteOffice);

	urbanGroup.add(earlySiteHoardings);
	scene.add(urbanGroup);
	groups.set('site', urbanGroup);

	// =========================================================================
	// 02. Survey & Benchmark Datum (Tripod, Total Station & Datum Stake)
	// =========================================================================
	const surveyGroup = new THREE.Group();
	surveyGroup.name = 'survey-markers';

	// Primary Benchmark Monument Pillar (+0.000m)
	const bmPillar = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.25, 0.9, 8), concreteMat);
	bmPillar.position.set(-12, 0.45, 14);
	surveyGroup.add(bmPillar);

	const bmBrassPlate = new THREE.Mesh(
		new THREE.CylinderGeometry(0.08, 0.08, 0.04, 8),
		markerGoldMat
	);
	bmBrassPlate.position.set(-12, 0.92, 14);
	surveyGroup.add(bmBrassPlate);

	// Motorized 3D Laser Scanning Total Station on Wooden Tripod
	const tsCenter = new THREE.Vector3(12, 0, 12);
	[-0.45, 0.45].forEach((tx) => {
		[0.35, -0.4].forEach((tz) => {
			const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.02, 1.5, 6), markerGoldMat);
			leg.position.set(tsCenter.x + tx, 0.75, tsCenter.z + tz);
			leg.rotation.z = tx * -0.25;
			leg.rotation.x = tz * 0.25;
			surveyGroup.add(leg);
		});
	});
	// Total Station instrument head
	const tsBody = new THREE.Mesh(
		new THREE.BoxGeometry(0.25, 0.35, 0.22),
		new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.3, metalness: 0.7 })
	);
	tsBody.position.set(tsCenter.x, 1.6, tsCenter.z);
	surveyGroup.add(tsBody);

	// Survey Grid Ticks across building boundary
	colX.forEach((gx) => {
		colZ.forEach((gz) => {
			const stake = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.06, 0.08), markerGoldMat);
			stake.position.set(gx, 0.03, gz);
			surveyGroup.add(stake);
		});
	});
	scene.add(surveyGroup);
	groups.set('survey-markers', surveyGroup);

	// =========================================================================
	// 03. 2D AutoCAD Architectural Grid Linework
	// =========================================================================
	const cadGroup = new THREE.Group();
	cadGroup.name = 'cad-grid';

	// Grid Lines along X and Z
	colX.forEach((gx) => {
		const lineZ = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.02, 28), markerGoldMat);
		lineZ.position.set(gx, 0.04, 0);
		cadGroup.add(lineZ);
	});
	colZ.forEach((gz) => {
		const lineX = new THREE.Mesh(new THREE.BoxGeometry(38, 0.02, 0.06), markerGoldMat);
		lineX.position.set(0, 0.04, gz);
		cadGroup.add(lineX);
	});
	// Central Atrium boundary CAD footprint
	const atriumFrame = new THREE.Mesh(
		new THREE.RingGeometry(6, 6.2, 4),
		new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide })
	);
	atriumFrame.rotation.x = -Math.PI / 2;
	atriumFrame.position.set(0, 0.05, 0);
	cadGroup.add(atriumFrame);

	scene.add(cadGroup);
	groups.set('cad-grid', cadGroup);

	// =========================================================================
	// 04. Subterranean Excavation (Basement -5.5m Formation Level)
	// =========================================================================
	const soilGroup = new THREE.Group();
	soilGroup.name = 'soil-cut';

	const pitCut = new THREE.Mesh(new THREE.BoxGeometry(38, 5.5, 28), soilMat);
	pitCut.position.set(0, -2.75, 0);
	soilGroup.add(pitCut);

	// Stepped earthen retention slopes
	for (let s = 0; s < 3; s++) {
		const bench = new THREE.Mesh(new THREE.BoxGeometry(38 - s * 2, 0.6, 1.5), soilMat);
		bench.position.set(0, -0.6 - s * 0.7, 14 - s * 0.5);
		soilGroup.add(bench);
	}
	scene.add(soilGroup);
	groups.set('soil-cut', soilGroup);

	// =========================================================================
	// 05. Deep Bored Piling & Rebar Cages
	// =========================================================================
	const pilesGroup = new THREE.Group();
	pilesGroup.name = 'piles';

	colX.forEach((px) => {
		colZ.forEach((pz) => {
			// Cast-in-place concrete pile shaft (Ø1,000mm, 12m deep)
			const pile = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 12, 12), concreteMat);
			pile.position.set(px, -6, pz);
			pilesGroup.add(pile);

			// Rebar cage starter bars extending out of pile top
			for (let rb = 0; rb < 6; rb++) {
				const angle = (rb / 6) * Math.PI * 2;
				const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 1.8, 6), rebarMat);
				bar.position.set(px + Math.cos(angle) * 0.35, 0.6, pz + Math.sin(angle) * 0.35);
				pilesGroup.add(bar);
			}
		});
	});
	scene.add(pilesGroup);
	groups.set('piles', pilesGroup);

	// =========================================================================
	// 06. Foundation: Monolithic Raft & Heavy Grade Tie Beams
	// =========================================================================
	const foundationGroup = new THREE.Group();
	foundationGroup.name = 'foundation';

	// Pile caps at every column location
	colX.forEach((px) => {
		colZ.forEach((pz) => {
			const cap = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.2, 2.4), concreteMat);
			cap.position.set(px, 0.6, pz);
			cap.castShadow = true;
			cap.receiveShadow = true;
			foundationGroup.add(cap);
		});
	});

	// Transverse and longitudinal tie beams
	colZ.forEach((pz) => {
		const beamX = new THREE.Mesh(new THREE.BoxGeometry(36, 0.8, 0.8), concreteMat);
		beamX.position.set(0, 0.7, pz);
		beamX.castShadow = true;
		foundationGroup.add(beamX);
	});
	colX.forEach((px) => {
		const beamZ = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 24), concreteMat);
		beamZ.position.set(px, 0.7, 0);
		beamZ.castShadow = true;
		foundationGroup.add(beamZ);
	});

	// Raft slab base
	const matSlab = new THREE.Mesh(new THREE.BoxGeometry(36, 0.4, 26), concreteMat);
	matSlab.position.set(0, 0.2, 0);
	foundationGroup.add(matSlab);

	scene.add(foundationGroup);
	groups.set('foundation', foundationGroup);

	// =========================================================================
	// 07. RCC Structural Columns, Moment Beams & Central Shear Core
	// =========================================================================
	const columnsGroup = new THREE.Group();
	columnsGroup.name = 'columns';

	// 20 heavy columns across 6 levels (800mm x 800mm tied columns)
	colX.forEach((cx) => {
		colZ.forEach((cz) => {
			for (let f = 0; f < floors; f++) {
				const h = f === 0 ? groundHeight : floorHeight;
				const yBase = f === 0 ? 1.2 : 1.2 + groundHeight + (f - 1) * floorHeight;
				const col = new THREE.Mesh(new THREE.BoxGeometry(0.8, h, 0.8), concreteMat);
				col.position.set(cx, yBase + h / 2, cz);
				col.castShadow = true;
				col.receiveShadow = true;
				columnsGroup.add(col);
			}
		});
	});

	// Central Dual Elevator & Fire Stair Shear Core (RCC walls: 300mm thick)
	const coreHeight = buildingHeight + 3.2;
	const shearCoreWest = new THREE.Mesh(new THREE.BoxGeometry(0.4, coreHeight, 5), concreteMat);
	shearCoreWest.position.set(-1.8, 1.2 + coreHeight / 2, -7.5);
	columnsGroup.add(shearCoreWest);

	const shearCoreEast = new THREE.Mesh(new THREE.BoxGeometry(0.4, coreHeight, 5), concreteMat);
	shearCoreEast.position.set(1.8, 1.2 + coreHeight / 2, -7.5);
	columnsGroup.add(shearCoreEast);

	const shearCoreBack = new THREE.Mesh(new THREE.BoxGeometry(4, coreHeight, 0.4), concreteMat);
	shearCoreBack.position.set(0, 1.2 + coreHeight / 2, -10);
	columnsGroup.add(shearCoreBack);

	scene.add(columnsGroup);
	groups.set('columns', columnsGroup);

	// Beams Group: Interconnecting Moment Beams at every floor level
	const beamsGroup = new THREE.Group();
	beamsGroup.name = 'beams';

	for (let f = 0; f < floors; f++) {
		const yBeam = f === 0 ? 1.2 + groundHeight : 1.2 + groundHeight + f * floorHeight;
		colZ.forEach((bz) => {
			const bX = new THREE.Mesh(new THREE.BoxGeometry(36, 0.6, 0.6), concreteMat);
			bX.position.set(0, yBeam - 0.3, bz);
			bX.castShadow = true;
			beamsGroup.add(bX);
		});
		colX.forEach((bx) => {
			const bZ = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 24), concreteMat);
			bZ.position.set(bx, yBeam - 0.3, 0);
			bZ.castShadow = true;
			beamsGroup.add(bZ);
		});
	}
	scene.add(beamsGroup);
	groups.set('beams', beamsGroup);

	// =========================================================================
	// 08. Floor Slabs (Post-Tensioned Flat Slabs with Central Atrium Void Cutout)
	// =========================================================================
	const slabsGroup = new THREE.Group();
	slabsGroup.name = 'slabs';

	for (let f = 0; f <= floors; f++) {
		const ySlab = f === 0 ? 1.2 : 1.2 + groundHeight + (f - 1) * floorHeight;

		if (f === 0) {
			// Ground Floor: Full slab
			const slabG = new THREE.Mesh(new THREE.BoxGeometry(37, 0.3, 27), concreteMat);
			slabG.position.set(0, ySlab - 0.15, 0);
			slabG.receiveShadow = true;
			slabsGroup.add(slabG);
		} else if (f === floors) {
			// Roof Deck: Slab with skylight opening over atrium
			const slabNorth = new THREE.Mesh(new THREE.BoxGeometry(37, 0.3, 9.5), concretePouredMat);
			slabNorth.position.set(0, ySlab - 0.15, -8.75);
			slabsGroup.add(slabNorth);

			const slabSouth = new THREE.Mesh(new THREE.BoxGeometry(37, 0.3, 9.5), concretePouredMat);
			slabSouth.position.set(0, ySlab - 0.15, 8.75);
			slabsGroup.add(slabSouth);

			const slabWest = new THREE.Mesh(new THREE.BoxGeometry(10.5, 0.3, 8), concretePouredMat);
			slabWest.position.set(-13.25, ySlab - 0.15, 0);
			slabsGroup.add(slabWest);

			const slabEast = new THREE.Mesh(new THREE.BoxGeometry(10.5, 0.3, 8), concretePouredMat);
			slabEast.position.set(13.25, ySlab - 0.15, 0);
			slabsGroup.add(slabEast);
		} else {
			// Upper Retail Floors: Central 16m x 8m open atrium cutout
			const slabNorth = new THREE.Mesh(new THREE.BoxGeometry(37, 0.25, 9.5), concretePouredMat);
			slabNorth.position.set(0, ySlab - 0.125, -8.75);
			slabNorth.receiveShadow = true;
			slabsGroup.add(slabNorth);

			const slabSouth = new THREE.Mesh(new THREE.BoxGeometry(37, 0.25, 9.5), concretePouredMat);
			slabSouth.position.set(0, ySlab - 0.125, 8.75);
			slabSouth.receiveShadow = true;
			slabsGroup.add(slabSouth);

			const slabWest = new THREE.Mesh(new THREE.BoxGeometry(10.5, 0.25, 8), concretePouredMat);
			slabWest.position.set(-13.25, ySlab - 0.125, 0);
			slabWest.receiveShadow = true;
			slabsGroup.add(slabWest);

			const slabEast = new THREE.Mesh(new THREE.BoxGeometry(10.5, 0.25, 8), concretePouredMat);
			slabEast.position.set(13.25, ySlab - 0.125, 0);
			slabEast.receiveShadow = true;
			slabsGroup.add(slabEast);
		}
	}

	// Grand Entrance Canopy Frame (Cantilevers 5.5m forward from Level 2 slab at Z: 13.5 to 19)
	const canopyFrame = new THREE.Mesh(new THREE.BoxGeometry(18, 0.25, 5.5), spandrelCharcoalMat);
	canopyFrame.position.set(0, 1.2 + groundHeight, 16.25);
	canopyFrame.castShadow = true;
	slabsGroup.add(canopyFrame);

	scene.add(slabsGroup);
	groups.set('slabs', slabsGroup);

	// =========================================================================
	// 09. Commercial Facade & Vertical Solar Louver Fins (Brise-Soleil)
	// =========================================================================
	const facadeGroup = new THREE.Group();
	facadeGroup.name = 'facade';

	const facadeYCenter = 1.2 + buildingHeight / 2;

	// North & South Facades (37m wide x buildingHeight)
	const glassSouth = new THREE.Mesh(new THREE.PlaneGeometry(37, buildingHeight), glassCurtainMat);
	glassSouth.position.set(0, facadeYCenter, 13.02);
	facadeGroup.add(glassSouth);

	const glassNorth = new THREE.Mesh(new THREE.PlaneGeometry(37, buildingHeight), glassCurtainMat);
	glassNorth.position.set(0, facadeYCenter, -13.02);
	glassNorth.rotation.y = Math.PI;
	facadeGroup.add(glassNorth);

	// East & West Facades (26m wide x buildingHeight)
	const glassEast = new THREE.Mesh(new THREE.PlaneGeometry(26, buildingHeight), glassCurtainMat);
	glassEast.position.set(18.52, facadeYCenter, 0);
	glassEast.rotation.y = -Math.PI / 2;
	facadeGroup.add(glassEast);

	const glassWest = new THREE.Mesh(new THREE.PlaneGeometry(26, buildingHeight), glassCurtainMat);
	glassWest.position.set(-18.52, facadeYCenter, 0);
	glassWest.rotation.y = Math.PI / 2;
	facadeGroup.add(glassWest);

	// Horizontal Spandrel Charcoal Metal Bands at Each Floor Level
	for (let f = 1; f <= floors; f++) {
		const yBand = 1.2 + groundHeight + (f - 1) * floorHeight;
		const spandrelFront = new THREE.Mesh(
			new THREE.BoxGeometry(37.2, 0.8, 0.2),
			spandrelCharcoalMat
		);
		spandrelFront.position.set(0, yBand, 13.1);
		facadeGroup.add(spandrelFront);

		const spandrelBack = new THREE.Mesh(new THREE.BoxGeometry(37.2, 0.8, 0.2), spandrelCharcoalMat);
		spandrelBack.position.set(0, yBand, -13.1);
		facadeGroup.add(spandrelBack);
	}

	// Vertical Architectural Champagne Aluminum Solar Fins (Brise-Soleil on South Frontage)
	// Spaced at 1.8m intervals across south elevation (vital for tropical solar shading in Dhaka)
	for (let lx = -17; lx <= 17; lx += 1.8) {
		// Keep entrance portal clear (x: -5 to +5 on ground/lvl2)
		if (Math.abs(lx) < 5) continue;
		const fin = new THREE.Mesh(
			new THREE.BoxGeometry(0.12, buildingHeight - 1, 0.75),
			louverBronzeMat
		);
		fin.position.set(lx, facadeYCenter, 13.5);
		fin.castShadow = true;
		facadeGroup.add(fin);
	}

	// Upper Level Decorative Fins across entrance portal (floors 3 to 6)
	for (let lx = -4; lx <= 4; lx += 1.6) {
		const finUpper = new THREE.Mesh(
			new THREE.BoxGeometry(0.12, buildingHeight - groundHeight, 0.65),
			louverBronzeMat
		);
		finUpper.position.set(lx, 1.2 + groundHeight + (buildingHeight - groundHeight) / 2, 13.45);
		facadeGroup.add(finUpper);
	}

	// Double-Height Grand Entrance Canopy Glass & Soffit
	const canopyGlass = new THREE.Mesh(new THREE.BoxGeometry(17.8, 0.08, 5.3), glassCurtainMat);
	canopyGlass.position.set(0, 1.2 + groundHeight + 0.15, 16.25);
	facadeGroup.add(canopyGlass);

	// Commercial Frieze Signage Band Zone above entrance
	const signageBand = new THREE.Mesh(new THREE.BoxGeometry(14, 1.4, 0.3), spandrelCharcoalMat);
	signageBand.position.set(0, 1.2 + groundHeight + 0.9, 13.25);
	facadeGroup.add(signageBand);

	scene.add(facadeGroup);
	groups.set('facade', facadeGroup);

	// =========================================================================
	// 10. BIM Coordination & Exploded Moment Setup
	// =========================================================================
	const bimGroup = new THREE.Group();
	bimGroup.name = 'mep-ghost';

	// Ghost wireframe ducts and clash detection zone
	for (let f = 1; f < floors; f++) {
		const yClash = 1.2 + groundHeight + (f - 1) * floorHeight + 2.8;
		const ghostDuctX = new THREE.Mesh(new THREE.BoxGeometry(32, 0.5, 0.6), mepGhostMat);
		ghostDuctX.position.set(0, yClash, -5);
		bimGroup.add(ghostDuctX);

		const ghostDuctZ = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.5, 20), mepGhostMat);
		ghostDuctZ.position.set(-6, yClash, 0);
		bimGroup.add(ghostDuctZ);
	}

	// Simulated Hard Clash Node at Level 3 (Duct through Transfer Girder)
	const clashNode = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.8, 1.2), clashPulseMat);
	clashNode.position.set(-8, 1.2 + groundHeight + floorHeight + 2.8, -3.33);
	bimGroup.add(clashNode);

	scene.add(bimGroup);
	groups.set('mep-ghost', bimGroup);

	// =========================================================================
	// 11. MEP Installed & Rooftop Mechanical Equipment
	// =========================================================================
	const mepGroup = new THREE.Group();
	mepGroup.name = 'mep';

	// Ceiling cavity primary supply & return ductwork (Levels 1 to 6)
	for (let f = 0; f < floors; f++) {
		const yDuct =
			f === 0 ? 1.2 + groundHeight - 0.7 : 1.2 + groundHeight + (f - 1) * floorHeight + 3.0;
		const ductLoop1 = new THREE.Mesh(new THREE.BoxGeometry(30, 0.45, 0.55), mepDuctMat);
		ductLoop1.position.set(0, yDuct, -6);
		mepGroup.add(ductLoop1);

		const ductLoop2 = new THREE.Mesh(new THREE.BoxGeometry(30, 0.45, 0.55), mepDuctMat);
		ductLoop2.position.set(0, yDuct, 6);
		mepGroup.add(ductLoop2);

		// Chilled water riser pipes (blue insulated piping)
		[-12, 12].forEach((rx) => {
			const riser = new THREE.Mesh(
				new THREE.CylinderGeometry(0.16, 0.16, buildingHeight, 10),
				mepChillerMat
			);
			riser.position.set(rx, 1.2 + buildingHeight / 2, -10.5);
			mepGroup.add(riser);
		});
	}

	// Rooftop Mechanical Plant: Enclosed Chiller Bulkhead & Cooling Towers
	const rooftopGroup = new THREE.Group();
	rooftopGroup.name = 'rooftop';

	// Elevator Motor Room & Stair Access Penthouse Bulkhead
	const elevatorPenthouse = new THREE.Mesh(
		new THREE.BoxGeometry(7, 3.4, 6),
		new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5, metalness: 0.5 })
	);
	elevatorPenthouse.position.set(0, topY + 1.7, -7);
	elevatorPenthouse.castShadow = true;
	rooftopGroup.add(elevatorPenthouse);

	// Twin Induced-Draft Cooling Towers with Top Rotating Fan Cowls
	[-7, 7].forEach((cx) => {
		const coolingTower = new THREE.Mesh(
			new THREE.BoxGeometry(4.5, 2.6, 4.5),
			new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.4, metalness: 0.6 })
		);
		coolingTower.position.set(cx, topY + 1.3, -7);
		coolingTower.castShadow = true;
		rooftopGroup.add(coolingTower);

		// Top fan exhaust cylinder
		const fanCowl = new THREE.Mesh(
			new THREE.CylinderGeometry(1.2, 1.2, 0.6, 16),
			new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3, metalness: 0.8 })
		);
		fanCowl.position.set(cx, topY + 2.9, -7);
		rooftopGroup.add(fanCowl);
	});

	// Central Atrium Pitched Glass Skylight Roof
	const skylightFrame = new THREE.Mesh(new THREE.ConeGeometry(8, 2.5, 4), glassCurtainMat);
	skylightFrame.position.set(0, topY + 1.25, 0);
	skylightFrame.rotation.y = Math.PI / 4;
	rooftopGroup.add(skylightFrame);

	// Rooftop Parapet Safety Railings
	const parapetWall = new THREE.Mesh(new THREE.BoxGeometry(37.4, 1.1, 27.4), concreteMat);
	parapetWall.position.set(0, topY + 0.55, 0);
	rooftopGroup.add(parapetWall);

	mepGroup.add(rooftopGroup);
	scene.add(mepGroup);
	groups.set('mep', mepGroup);

	// =========================================================================
	// 12. Interior Central Atrium & Crisscrossing Escalators
	// =========================================================================
	const interiorGroup = new THREE.Group();
	interiorGroup.name = 'interior';

	// Ground Floor Polished Terrazzo Flooring
	const groundTerrazzo = new THREE.Mesh(new THREE.BoxGeometry(36, 0.05, 25), terrazzoMat);
	groundTerrazzo.position.set(0, 1.23, 0);
	groundTerrazzo.receiveShadow = true;
	interiorGroup.add(groundTerrazzo);

	// Central Information & Concierge Kiosk at Ground Floor
	const infoKiosk = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.2, 1.1, 16), louverBronzeMat);
	infoKiosk.position.set(0, 1.2 + 0.55, 1);
	infoKiosk.castShadow = true;
	interiorGroup.add(infoKiosk);

	// Glass Balustrades around the Atrium Void on Floors 2 through 5
	for (let f = 1; f < floors; f++) {
		const yFloor = 1.2 + groundHeight + (f - 1) * floorHeight;

		// Balustrade North & South (16m wide x 1.0m high)
		const balNorth = new THREE.Mesh(new THREE.BoxGeometry(16, 1.0, 0.08), glassCurtainMat);
		balNorth.position.set(0, yFloor + 0.5, -4);
		interiorGroup.add(balNorth);

		const balSouth = new THREE.Mesh(new THREE.BoxGeometry(16, 1.0, 0.08), glassCurtainMat);
		balSouth.position.set(0, yFloor + 0.5, 4);
		interiorGroup.add(balSouth);

		// Balustrade East & West (8m long x 1.0m high)
		const balEast = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.0, 8), glassCurtainMat);
		balEast.position.set(8, yFloor + 0.5, 0);
		interiorGroup.add(balEast);

		const balWest = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.0, 8), glassCurtainMat);
		balWest.position.set(-8, yFloor + 0.5, 0);
		interiorGroup.add(balWest);
	}

	// Commercial Crisscrossing Escalators Linking Atrium Levels
	// Escalator 1: Ground to Level 2 (slanted upward toward +X)
	const esc1 = new THREE.Mesh(
		new THREE.BoxGeometry(8, 0.5, 1.4),
		new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3, metalness: 0.8 })
	);
	esc1.position.set(-2, 1.2 + groundHeight / 2, -1.8);
	esc1.rotation.z = -0.42;
	interiorGroup.add(esc1);

	// Escalator 2: Level 2 to Level 3 (crossing upward toward -X)
	const esc2 = new THREE.Mesh(
		new THREE.BoxGeometry(8, 0.5, 1.4),
		new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3, metalness: 0.8 })
	);
	esc2.position.set(2, 1.2 + groundHeight + floorHeight / 2, 1.8);
	esc2.rotation.z = 0.42;
	interiorGroup.add(esc2);

	// Escalator 3: Level 3 to Level 4 (slanted upward toward +X)
	const esc3 = new THREE.Mesh(
		new THREE.BoxGeometry(8, 0.5, 1.4),
		new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3, metalness: 0.8 })
	);
	esc3.position.set(-2, 1.2 + groundHeight + floorHeight * 1.5, -1.8);
	esc3.rotation.z = -0.42;
	interiorGroup.add(esc3);

	// Warm Linear LED Luminaires lining the atrium void ceilings
	for (let f = 0; f < floors; f++) {
		const yLight =
			f === 0 ? 1.2 + groundHeight - 0.2 : 1.2 + groundHeight + (f - 1) * floorHeight + 3.6;
		[-3.8, 3.8].forEach((lz) => {
			const lightStrip = new THREE.Mesh(new THREE.BoxGeometry(15.6, 0.06, 0.12), warmLightMat);
			lightStrip.position.set(0, yLight, lz);
			interiorGroup.add(lightStrip);
		});
	}

	scene.add(interiorGroup);
	groups.set('interior', interiorGroup);

	// =========================================================================
	// 13. Civil Landscape, Paved Plaza & Vehicular Drop-Off Loop
	// =========================================================================
	const landscapeGroup = new THREE.Group();
	landscapeGroup.name = 'landscape';

	// Curved Vehicular Drop-Off Asphalt Driveway Loop (Z: 13.5 to 20)
	const dropOffDrive = new THREE.Mesh(new THREE.BoxGeometry(42, 0.18, 6.5), asphaltMat);
	dropOffDrive.position.set(0, 0.1, 16.5);
	dropOffDrive.receiveShadow = true;
	landscapeGroup.add(dropOffDrive);

	// Paved Entrance Plaza Forecourt with granite paver bands
	const plazaForecourt = new THREE.Mesh(new THREE.BoxGeometry(40, 0.22, 6.5), paverMat);
	plazaForecourt.position.set(0, 0.12, 11);
	plazaForecourt.receiveShadow = true;
	landscapeGroup.add(plazaForecourt);

	// Stainless Steel Security Bollards along pedestrian edge
	for (let bx = -18; bx <= 18; bx += 2.2) {
		const bollard = new THREE.Mesh(
			new THREE.CylinderGeometry(0.09, 0.09, 0.85, 12),
			new THREE.MeshStandardMaterial({ color: 0xd4d4d8, roughness: 0.25, metalness: 0.85 })
		);
		bollard.position.set(bx, 0.55, 14.2);
		bollard.castShadow = true;
		landscapeGroup.add(bollard);
	}

	// Native Tropical Dhaka Trees (Frangipani & Date Palms) along Sidewalk & Flanks
	const treeCoords: Array<[number, number]> = [
		[-22, 16],
		[-26, 16],
		[22, 16],
		[26, 16],
		[-20, 8],
		[20, 8]
	];
	treeCoords.forEach(([tx, tz]) => {
		// Tree Planter Box
		const planter = new THREE.Mesh(new THREE.BoxGeometry(2, 0.5, 2), concreteMat);
		planter.position.set(tx, 0.25, tz);
		landscapeGroup.add(planter);

		// Trunk
		const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.18, 3.4, 8), treeTrunkMat);
		trunk.position.set(tx, 2.0, tz);
		trunk.castShadow = true;
		landscapeGroup.add(trunk);

		// Lush Tropical Foliage Canopy
		const canopy = new THREE.Mesh(new THREE.SphereGeometry(1.6, 8, 8), treeCanopyMat);
		canopy.position.set(tx, 3.8, tz);
		canopy.scale.set(1.1, 0.9, 1.1);
		canopy.castShadow = true;
		landscapeGroup.add(canopy);
	});

	scene.add(landscapeGroup);
	groups.set('landscape', landscapeGroup);

	// =========================================================================
	// 14. Completed Mall: Exterior Lighting & Handover Accent
	// =========================================================================
	const completedGroup = new THREE.Group();
	completedGroup.name = 'completed';

	// Facade Architectural Uplights along Canopy and Louvers
	[-8, -4, 0, 4, 8].forEach((ux) => {
		const uplightPoint = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.1, 0.3), warmLightMat);
		uplightPoint.position.set(ux, 1.2 + groundHeight + 0.1, 16.5);
		completedGroup.add(uplightPoint);
	});

	// Commercial Logo Illumination Band
	const logoGlow = new THREE.Mesh(new THREE.BoxGeometry(10, 0.8, 0.08), markerGoldMat);
	logoGlow.position.set(0, 1.2 + groundHeight + 0.9, 13.42);
	completedGroup.add(logoGlow);

	scene.add(completedGroup);
	groups.set('completed', completedGroup);

	// Set Initial Phase Visibility
	groups.forEach((g, key) => {
		g.visible = key === 'site' || key === 'survey-markers';
	});

	return {
		scene,
		camera,
		renderer,
		groups,
		setInteriorMode(isInterior: boolean) {
			glassCurtainMat.opacity = isInterior ? 0.08 : 0.32;
			glassCurtainMat.needsUpdate = true;
		},
		setLightingMode(mode: 'day' | 'interior' | 'dusk') {
			if (mode === 'dusk') {
				scene.background = new THREE.Color(0x060812);
				scene.fog = new THREE.FogExp2(0x060812, 0.009);
				sunLight.color.setHex(0xf59e0b);
				sunLight.intensity = 0.7;
				ambientLight.intensity = 0.28;
				duskAccentLight.intensity = 1.4;
				warmLightMat.color.setHex(0xffedd5);
			} else if (mode === 'interior') {
				scene.background = baseBgColor;
				scene.fog = new THREE.FogExp2(0x0a0b10, 0.012);
				sunLight.color.setHex(0xfff5e4);
				sunLight.intensity = 1.2;
				ambientLight.intensity = 0.65;
				duskAccentLight.intensity = 0;
			} else {
				// Day mode
				scene.background = baseBgColor;
				scene.fog = new THREE.FogExp2(0x0a0b10, 0.009);
				sunLight.color.setHex(0xfff5e4);
				sunLight.intensity = 1.7;
				ambientLight.intensity = 0.55;
				duskAccentLight.intensity = 0;
			}
		},
		setExplodedBim(amount: number) {
			const amt = Math.max(0, Math.min(1, amount));
			// Clean vertical system explosion for the signature BIM coordination moment
			const slabsG = groups.get('slabs');
			const facadeG = groups.get('facade');
			const mepG = groups.get('mep');

			if (slabsG) slabsG.position.y = amt * 3.5;
			if (facadeG) facadeG.position.y = amt * 7.0;
			if (mepG) mepG.position.y = amt * 10.5;
		},
		setSize(width, height) {
			if (width <= 0 || height <= 0) return;
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
			renderer.setSize(width, height, false);
		},
		dispose() {
			scene.traverse((obj) => {
				if (obj instanceof THREE.Mesh) {
					obj.geometry?.dispose();
					if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
					else obj.material?.dispose();
				}
			});
			renderer.dispose();
		}
	};
}
