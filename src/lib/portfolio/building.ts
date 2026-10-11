import * as THREE from 'three';

export const FLOOR_COUNT = 10;
export const FLOOR_HEIGHT = 3;

export function createBuilding() {
	const root = new THREE.Group();
	const geometries = new Set<THREE.BufferGeometry>();
	const materials = new Set<THREE.Material>();
	const unit = new THREE.BoxGeometry(1, 1, 1);
	geometries.add(unit);
	function material(color: string, roughness = 0.8, metalness = 0) {
		const m = new THREE.MeshStandardMaterial({ color, roughness, metalness });
		materials.add(m);
		return m;
	}
	const concrete = material('#a7aaa6'),
		plaster = material('#eee8db'),
		brick = material('#aa6c50');
	const dark = material('#34444a', 0.55, 0.3),
		wood = material('#8b6748'),
		glass = material('#73939a', 0.18, 0.45);
	const steel = material('#66594c', 0.4, 0.5),
		orange = material('#e88a35'),
		green = material('#526d55');
	const soil = material('#a89a83'),
		white = material('#d8d6ca'),
		blue = material('#4f7791'),
		copper = material('#a07f4b');
	const warm = new THREE.MeshStandardMaterial({
		color: '#fff0c7',
		emissive: '#ffc677',
		emissiveIntensity: 0.6
	});
	materials.add(warm);
	function box(
		parent: THREE.Group,
		m: THREE.Material,
		x: number,
		y: number,
		z: number,
		w: number,
		h: number,
		d: number
	) {
		const mesh = new THREE.Mesh(unit, m);
		mesh.position.set(x, y, z);
		mesh.scale.set(w, h, d);
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		parent.add(mesh);
		return mesh;
	}
	function group(parent = root) {
		const g = new THREE.Group();
		parent.add(g);
		return g;
	}
	const context = group();
	box(context, soil, 0, -0.65, 0, 27, 1.2, 24);
	box(context, material('#858b89'), 0, -0.02, 12, 80, 0.1, 7);
	box(context, white, 0, 0.02, 8.7, 29, 0.16, 0.8);
	for (let x = -32; x <= 32; x += 8) box(context, plaster, x, 0.05, 12, 3, 0.025, 0.12);
	const neighborhood = group(context);
	for (const [x, z, h, w, d] of [
		[-20, -8, 21, 9, 8],
		[19, -6, 17, 9, 9],
		[-15, -19, 28, 10, 8],
		[2, -22, 19, 10, 7],
		[20, -20, 25, 8, 9],
		[-29, 3, 13, 8, 7],
		[30, 6, 10, 8, 8]
	]) {
		box(neighborhood, material(h % 2 ? '#b4b4a6' : '#c3bbab'), x, h / 2 - 0.2, z, w, h, d);
		box(neighborhood, concrete, x, h, z, w + 0.3, 0.25, d + 0.3);
		for (let y = 2; y < h - 1; y += 2.8)
			for (let wx = x - w / 2 + 1; wx < x + w / 2; wx += 2)
				box(neighborhood, dark, wx, y, z + d / 2 + 0.02, 0.8, 1.35, 0.04);
	}
	const survey = group();
	for (const x of [-7, 7])
		for (const z of [-6, 6]) {
			box(survey, orange, x, 0.2, z, 0.12, 0.65, 0.12);
			box(survey, white, x, 0.6, z, 0.6, 0.08, 0.6);
		}
	for (const x of [-4, 0, 4]) box(survey, white, x, 0.04, 0, 0.035, 0.02, 14);
	for (const z of [-4, 0, 4]) box(survey, white, 0, 0.045, z, 16, 0.02, 0.035);
	box(survey, orange, 8, 1.3, 6, 0.4, 0.3, 0.3);
	for (const dx of [-0.3, 0.3]) {
		const leg = box(survey, dark, 8 + dx, 0.6, 6, 0.055, 1.2, 0.055);
		leg.rotation.z = dx * 0.7;
	}
	const temporary = group();
	for (const x of [-9, 9]) box(temporary, blue, x, 1.1, 0, 0.08, 2.2, 16);
	box(temporary, blue, 0, 1.1, -8, 18, 2.2, 0.08);
	box(temporary, orange, 8, 0.15, 6, 2, 0.3, 2);
	for (let i = 0; i < 6; i++) box(temporary, wood, -8, 0.2 + i * 0.12, 5, 1.2, 0.1, 2);
	const excavation = group();
	box(excavation, material('#6e6252'), 0, -0.28, 0, 14, 0.12, 12);
	for (const x of [-7, 7]) box(excavation, wood, x, -0.5, 0, 0.12, 1.8, 12);
	const foundation = group(),
		piles = group(foundation),
		cages = group(foundation),
		caps = group(foundation),
		groundBeams = group(foundation),
		foundationForms = group(foundation),
		blinding = group(foundation);
	const cylinder = new THREE.CylinderGeometry(0.25, 0.25, 3.2, 10);
	geometries.add(cylinder);
	for (const x of [-4, 0, 4])
		for (const z of [-4, 0, 4]) {
			if (x === 0 && z === -4) continue;
			const pile = new THREE.Mesh(cylinder, concrete);
			pile.position.set(x, -2.5, z);
			pile.castShadow = true;
			piles.add(pile);
			box(caps, concrete, x, -0.65, z, 1.5, 0.7, 1.5);
			box(blinding, white, x, -1.05, z, 1.8, 0.1, 1.8);
			for (const dx of [-0.78, 0.78]) box(foundationForms, wood, x + dx, -0.65, z, 0.08, 0.8, 1.7);
			for (const dx of [-0.14, 0.14])
				for (const dz of [-0.14, 0.14]) box(cages, steel, x + dx, -2.5, z + dz, 0.035, 3.2, 0.035);
			for (const dx of [-0.45, 0.45])
				for (const dz of [-0.45, 0.45]) box(cages, steel, x + dx, -0.5, z + dz, 0.05, 1.5, 0.05);
		}
	for (const x of [-4, 0, 4])
		box(groundBeams, concrete, x, -0.25, x === 0 ? 2 : 0, 0.4, 0.5, x === 0 ? 4 : 9);
	for (const z of [-4, 0, 4]) box(groundBeams, concrete, 0, -0.25, z, 9, 0.5, 0.4);
	const floors: {
		root: THREE.Group;
		rebar: THREE.Group;
		forms: THREE.Group;
		columns: THREE.Group;
		deck: THREE.Group;
		slabSteel: THREE.Group;
		embedded: THREE.Group;
		slab: THREE.Group;
		walls: THREE.Group;
		facade: THREE.Group;
		finish: THREE.Group;
	}[] = [];
	for (let i = 0; i < FLOOR_COUNT; i++) {
		const floor = group();
		floor.position.y = i * FLOOR_HEIGHT;
		const rebar = group(floor),
			forms = group(floor),
			columns = group(floor),
			deck = group(floor),
			slabSteel = group(floor),
			embedded = group(floor),
			slab = group(floor),
			walls = group(floor),
			facade = group(floor),
			finish = group(floor);
		for (const x of [-4, 0, 4])
			for (const z of [-4, 0, 4]) {
				if (x === 0 && z === -4) continue;
				box(columns, concrete, x, 1.5, z, 0.48, 3, 0.48);
				for (const dx of [-0.14, 0.14])
					for (const dz of [-0.14, 0.14])
						box(rebar, steel, x + dx, 1.6, z + dz, 0.035, 3.15, 0.035);
				box(forms, wood, x - 0.28, 1.5, z, 0.06, 3, 0.65);
				box(forms, wood, x + 0.28, 1.5, z, 0.06, 3, 0.65);
			}
		for (const [x, z, w, d] of [
			[0, 2.375, 10.5, 5.75],
			[0, -4.875, 10.5, 0.75],
			[-3.725, -2.5, 3.05, 4],
			[3.725, -2.5, 3.05, 4]
		]) {
			box(deck, wood, x, 2.8, z, w, 0.12, d);
			box(slab, concrete, x, 3, z, w, 0.22, d);
		}
		box(embedded, blue, 2.5, 2.97, -2.3, 2.8, 0.06, 0.06);
		box(embedded, copper, 3.8, 2.97, -1.2, 0.06, 0.06, 2.3);
		// Each cycle includes its ceiling slab: Ground + 01–09 = ten storeys.
		for (const x of [-4, 0, 4])
			box(slab, concrete, x, 2.8, x === 0 ? 2 : 0, 0.38, 0.4, x === 0 ? 4 : 9);
		for (const z of [0, 4]) box(slab, concrete, 0, 2.8, z, 9, 0.4, 0.38);
		for (const x of [-3.2, 3.2]) box(slab, concrete, x, 2.8, -4, 2.4, 0.4, 0.38);
		for (let x = -4.8; x < 5; x += 0.5) {
			if (Math.abs(x) < 2.2) {
				box(slabSteel, steel, x, 2.96, 2.25, 0.025, 0.025, 5.5);
				box(slabSteel, steel, x, 2.96, -4.875, 0.025, 0.025, 0.65);
			} else box(slabSteel, steel, x, 2.96, 0, 0.025, 0.025, 10);
		}
		for (let z = -4.8; z < 5; z += 0.5) {
			if (z > -4.5 && z < -0.5)
				for (const x of [-3.6, 3.6]) box(slabSteel, steel, x, 2.97, z, 2.8, 0.025, 0.025);
			else box(slabSteel, steel, 0, 2.97, z, 10, 0.025, 0.025);
		}
		// Openings are actual gaps, not windows pasted onto solid walls.
		for (const x of [-3.3, 3.3]) {
			box(walls, brick, x, 0.45, 4.9, 2.7, 0.9, 0.18);
			box(walls, brick, x, 2.7, 4.9, 2.7, 0.5, 0.18);
			box(facade, plaster, x, 0.45, 5.02, 2.8, 0.9, 0.09);
			box(facade, plaster, x, 2.7, 5.02, 2.8, 0.5, 0.09);
			box(facade, glass, x, 1.65, 4.95, 2.65, 1.55, 0.08);
			for (const dx of [-1.34, 0, 1.34]) box(facade, dark, x + dx, 1.65, 5.02, 0.055, 1.65, 0.1);
			box(facade, concrete, x, 0.05, 5.75, 3.35, 0.2, 1.6);
			box(facade, dark, x, 1.05, 6.52, 3.35, 0.065, 0.06);
			box(facade, dark, x, 0.45, 6.52, 3.35, 0.04, 0.05);
			for (let dx = -1.6; dx <= 1.6; dx += 0.32)
				box(facade, dark, x + dx, 0.6, 6.52, 0.035, 0.95, 0.035);
			for (const dx of [-1.65, 1.65]) {
				box(facade, plaster, x + dx, 1.4, 5.65, 0.12, 2.8, 1.7);
				box(facade, dark, x + dx, 1.05, 5.75, 0.055, 0.065, 1.5);
			}
			box(finish, warm, x, 2.3, 4.75, 1, 0.045, 0.03);
		}
		box(walls, brick, 0, 1.5, 4.9, 2.8, 3, 0.25);
		box(facade, plaster, 0, 1.5, 5.07, 2.8, 3, 0.13);
		for (let x = -0.95; x <= 1; x += 0.24) box(facade, wood, x, 1.5, 5.19, 0.085, 2.9, 0.09);
		box(walls, brick, 0, 1.5, -4.9, 10, 3, 0.18);
		box(facade, plaster, 0, 1.5, -5.02, 10, 3, 0.08);
		for (const x of [-5, 5])
			for (const z of [-3, 0, 3]) {
				box(walls, brick, x, 0.45, z, 0.18, 0.9, 2.8);
				box(walls, brick, x, 2.7, z, 0.18, 0.5, 2.8);
				box(facade, plaster, x + Math.sign(x) * 0.1, 0.45, z, 0.09, 0.9, 2.85);
				box(facade, plaster, x + Math.sign(x) * 0.1, 2.7, z, 0.09, 0.5, 2.85);
				box(facade, glass, x, 1.65, z, 0.06, 1.5, 2);
				box(facade, dark, x + Math.sign(x) * 0.05, 1.65, z, 0.06, 1.6, 0.04);
			}
		box(finish, white, 0, 0.02, 0, 10, 0.04, 9.8);
		floors.push({
			root: floor,
			rebar,
			forms,
			columns,
			deck,
			slabSteel,
			embedded,
			slab,
			walls,
			facade,
			finish
		});
	}
	const core = group();
	box(core, concrete, 1, 15, -2, 2, 30, 0.18);
	box(core, concrete, 2, 15, -3, 0.18, 30, 2);
	for (let f = 0; f < 10; f++) {
		for (let step = 0; step < 6; step++) {
			box(core, concrete, -1.5, f * 3 + 0.25 + step * 0.25, -4 + step * 0.4, 1.1, 0.18, 0.42);
			box(core, concrete, -0.3, f * 3 + 1.75 + step * 0.25, -2 - step * 0.4, 1.1, 0.18, 0.42);
		}
		box(core, concrete, -0.9, f * 3 + 1.5, -1.65, 2.4, 0.18, 0.7);
		box(core, concrete, -0.9, f * 3 + 3, -4.25, 2.4, 0.18, 0.5);
	}
	const roof = group();
	for (const x of [-5.15, 5.15]) box(roof, plaster, x, 30.5, 0, 0.2, 1.1, 10.5);
	for (const z of [-5.15, 5.15]) box(roof, plaster, 0, 30.5, z, 10.5, 1.1, 0.2);
	box(roof, plaster, -0.5, 31.25, -2.5, 4.4, 2.5, 4.4);
	box(roof, concrete, -0.5, 32.6, -2.5, 4.6, 0.2, 4.6);
	box(roof, dark, 3, 31, -3, 1.8, 1.4, 1.8);
	const waterproofing = group();
	box(waterproofing, blue, 0, 30.13, 0, 9.9, 0.025, 9.9);
	for (const x of [-3.3, 3.3])
		for (let i = 0; i < 10; i++) box(waterproofing, blue, x, i * 3 + 0.16, 5.75, 3.1, 0.025, 1.35);
	const entrance = group();
	box(entrance, dark, 0, 1.4, 5.3, 1.8, 2.8, 0.13);
	box(entrance, glass, 0, 1.4, 5.39, 1.6, 2.6, 0.05);
	box(entrance, concrete, 0, 3.1, 6.1, 3.6, 0.2, 2.4);
	const landscape = group();
	box(landscape, white, 0, 0.02, 7, 6, 0.12, 3.5);
	box(landscape, dark, 0, 0.04, 8.45, 16, 0.06, 0.12);
	const sphere = new THREE.SphereGeometry(1, 8, 7);
	geometries.add(sphere);
	function tree(x: number, z: number, size: number) {
		box(landscape, wood, x, size * 0.7, z, 0.18, size * 1.4, 0.18);
		for (let i = 0; i < 3; i++) {
			const crown = new THREE.Mesh(sphere, green);
			crown.position.set(x + (i - 1) * 0.5, size * 1.4 + i * 0.35, z);
			crown.scale.set(size * 0.65, size * 0.65, size * 0.6);
			crown.castShadow = true;
			landscape.add(crown);
		}
	}
	for (const [x, z, s] of [
		[-8, 4, 2.2],
		[8, 3, 2.4],
		[-8, -5, 2.8],
		[8, -5, 2.4]
	])
		tree(x, z, s);
	for (const x of [-6.7, 6.7]) {
		box(landscape, concrete, x, 0.25, 7, 2.5, 0.5, 1);
		for (let i = 0; i < 5; i++) {
			const shrub = new THREE.Mesh(sphere, green);
			shrub.position.set(x - 1 + i * 0.5, 0.65, 7);
			shrub.scale.set(0.4, 0.45, 0.4);
			landscape.add(shrub);
		}
	}
	const services = group();
	for (const [x, m] of [
		[3.7, blue],
		[4, copper],
		[4.3, dark]
	] as const) {
		box(services, m, x, 15, -3.5, 0.09, 30, 0.09);
		for (let f = 0; f < 10; f++) box(services, m, 2.4, f * 3 + 2.5, -3.5, 2.5, 0.06, 0.06);
	}
	const scaffold = group();
	for (const x of [-6, 6])
		for (const z of [-5, 5]) box(scaffold, steel, x, 15, z, 0.075, 30, 0.075);
	for (let y = 2; y < 30; y += 3)
		for (const x of [-6, 6]) box(scaffold, steel, x, y, 0, 0.075, 0.075, 10);
	const interior = group();
	box(interior, white, 0, -0.12, 0, 12, 0.2, 10);
	const interiorCeiling = box(interior, plaster, 0, 3.05, 0, 12, 0.15, 10);
	box(interior, plaster, 0, 1.5, -5, 12, 3, 0.16);
	for (const x of [-6, 6]) box(interior, plaster, x, 1.5, 0, 0.16, 3, 10);
	// Open doorway gaps along the central circulation spine.
	for (const x of [-1, 1])
		for (const z of [-4.1, 0, 4.1]) box(interior, plaster, x, 1.5, z, 0.14, 3, 1.7);
	for (const x of [-3.5, 3.5]) box(interior, plaster, x, 1.5, 0, 5, 3, 0.14);
	const interiorGlass = glass.clone();
	interiorGlass.transparent = true;
	interiorGlass.opacity = 0.24;
	interiorGlass.depthWrite = false;
	materials.add(interiorGlass);
	box(interior, interiorGlass, -4.4, 1.6, 5, 2.8, 2.7, 0.055);
	box(interior, interiorGlass, 3.5, 1.6, 5, 4.6, 2.7, 0.055);
	// Open sliding-door gap centered at x=-2, on the authored balcony route.
	for (const x of [-5.8, -3, -1.2, 1.2, 3.5, 5.8])
		box(interior, dark, x, 1.6, 5.02, 0.06, 2.8, 0.08);
	box(interior, concrete, -3.5, -0.05, 5.7, 5, 0.15, 1.5);
	box(interior, dark, -3.5, 1.05, 6.4, 5, 0.08, 0.08);
	for (let x = -5.9; x < -1; x += 0.3) box(interior, dark, x, 0.53, 6.4, 0.035, 1, 0.035);
	const fabric = material('#aaa898');
	box(interior, fabric, -5, 0.4, 2, 1.3, 0.65, 2.8);
	box(interior, fabric, -5.6, 0.8, 2, 0.25, 0.8, 2.9);
	box(interior, wood, -3.3, 0.35, 2, 1.2, 0.12, 1.5);
	for (const x of [-3.7, -2.9]) box(interior, dark, x, 0.16, 2, 0.06, 0.3, 1);
	box(interior, wood, -3, 0.78, 0.9, 1.5, 0.1, 0.8);
	for (const x of [-3.5, -2.5])
		for (const z of [0.65, 1.15]) box(interior, dark, x, 0.37, z, 0.06, 0.75, 0.06);
	for (const x of [-3.5, -2.5])
		for (const z of [0.25, 1.55]) {
			box(interior, fabric, x, 0.45, z, 0.45, 0.1, 0.45);
			box(interior, wood, x, 0.68, z + (z < 1 ? -0.2 : 0.2), 0.45, 0.5, 0.06);
			for (const dx of [-0.16, 0.16]) box(interior, dark, x + dx, 0.22, z, 0.04, 0.44, 0.34);
		}
	box(interior, wood, 4.9, 0.46, 2, 1.4, 0.92, 4.5);
	box(interior, white, 4.9, 0.96, 2, 1.5, 0.07, 4.5);
	box(interior, dark, 4.9, 1, 2, 1, 0.025, 0.8);
	box(interior, dark, 4.8, 1.05, 3.5, 0.9, 0.15, 0.65);
	box(interior, wood, 5.45, 2.2, 2, 0.5, 0.85, 4.4);
	box(interior, dark, 2.8, 1.05, 4.35, 1.1, 2.1, 1);
	box(interior, wood, -3.7, 0.25, -3, 2.8, 0.5, 3.6);
	box(interior, white, -3.7, 0.6, -3, 2.75, 0.3, 3.5);
	box(interior, fabric, -3.7, 1, -4.65, 2.9, 1.5, 0.15);
	for (const x of [-4.35, -3]) box(interior, white, x, 0.85, -4.1, 0.9, 0.2, 0.5);
	box(interior, wood, -5.45, 1.2, -1.5, 0.8, 2.4, 2.5);
	box(interior, white, 4.9, 0.5, -2.5, 1.1, 1, 0.65);
	box(interior, dark, 4.9, 1.65, -2.58, 1.1, 0.9, 0.08);
	box(interior, white, 2.2, 0.25, -3.5, 0.6, 0.5, 0.85);
	box(interior, white, 2.2, 0.75, -3.85, 0.6, 1, 0.25);
	box(interior, glass, 4, 1.15, -3.4, 0.04, 2.3, 2.8);
	box(interior, dark, 5.85, 2, -4.2, 0.08, 0.7, 0.08);
	box(interior, dark, 5.5, 2.35, -4.2, 0.7, 0.06, 0.3);
	box(interior, dark, 0, 1.3, -4.87, 1.55, 2.6, 0.08);
	box(interior, steel, -0.4, 1.3, -4.81, 0.73, 2.5, 0.05);
	box(interior, steel, 0.4, 1.3, -4.81, 0.73, 2.5, 0.05);
	for (let s = 0; s < 12; s++)
		box(interior, concrete, 5.1, s * 0.23, -4.3 + s * 0.26, 1.4, 0.18, 0.28);
	for (const x of [-3.5, 0, 3.5])
		for (const z of [-2.5, 2.5]) box(interior, warm, x, 2.94, z, 0.5, 0.04, 0.5);
	const light = new THREE.PointLight('#ffecd1', 45, 15, 2);
	light.position.set(0, 2.7, 0);
	interior.add(light);
	// Batch repeated components by material; staged groups remain independently controllable.
	function batch(g: THREE.Group) {
		const buckets = new Map<THREE.Material, THREE.Mesh[]>();
		for (const child of [...g.children]) {
			if (
				!(child instanceof THREE.Mesh) ||
				Array.isArray(child.material) ||
				child === interiorCeiling
			)
				continue;
			const list = buckets.get(child.material) ?? [];
			list.push(child);
			buckets.set(child.material, list);
		}
		for (const [m, meshes] of buckets) {
			if (meshes.length < 3) continue;
			const instances = new THREE.InstancedMesh(meshes[0].geometry, m, meshes.length);
			meshes.forEach((mesh, i) => {
				mesh.updateMatrix();
				instances.setMatrixAt(i, mesh.matrix);
				g.remove(mesh);
			});
			instances.castShadow = true;
			instances.receiveShadow = true;
			instances.computeBoundingSphere();
			g.add(instances);
		}
	}
	for (const floor of floors) {
		for (const key of [
			'rebar',
			'forms',
			'columns',
			'deck',
			'slabSteel',
			'embedded',
			'slab',
			'walls',
			'facade',
			'finish'
		] as const)
			batch(floor[key]);
	}
	[
		neighborhood,
		survey,
		temporary,
		piles,
		cages,
		caps,
		groundBeams,
		foundationForms,
		blinding,
		core,
		roof,
		landscape,
		services,
		scaffold,
		interior
	].forEach(batch);
	return {
		brickMaterial: brick,
		plasterMaterial: plaster,
		root,
		context,
		neighborhood,
		survey,
		temporary,
		excavation,
		foundation,
		piles,
		cages,
		caps,
		groundBeams,
		foundationForms,
		blinding,
		floors,
		core,
		roof,
		waterproofing,
		entrance,
		landscape,
		services,
		scaffold,
		interior,
		interiorCeiling,
		dispose() {
			geometries.forEach((g) => g.dispose());
			materials.forEach((m) => m.dispose());
		}
	};
}
