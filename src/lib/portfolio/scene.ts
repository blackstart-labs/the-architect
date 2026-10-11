import * as THREE from 'three';
import { createBuilding } from './building';
import { experienceStages, localProgress, stageAt } from './stages';

const smooth = (t: number) => t * t * (3 - 2 * t);
type Point = [number, number, number];

// Human-scale paths turn through the open corridor, rather than cutting across rooms.
const routes: { id: string; points: Point[]; targets: Point[] }[] = [
	{
		id: 'entrance',
		points: [
			[0, 1.65, 8],
			[0, 1.65, 4],
			[0, 1.65, 1]
		],
		targets: [
			[0, 1.5, 0],
			[0, 1.5, -3],
			[0, 1.5, -4.8]
		]
	},
	{
		id: 'lobby',
		points: [
			[0, 1.65, 1],
			[0, 1.65, -2],
			[0, 1.65, -3.6]
		],
		targets: [
			[0, 1.5, -4.8],
			[0, 1.5, -4.8],
			[0, 1.5, -4.8]
		]
	},
	{
		id: 'living',
		points: [
			[0, 1.65, -3.6],
			[0, 1.65, 2],
			[-2, 1.65, 2],
			[-2, 1.65, 3.5]
		],
		targets: [
			[0, 1.5, 2],
			[-4, 1.2, 2],
			[-4, 1.2, 2],
			[-3.5, 1.5, 5]
		]
	},
	{
		id: 'balcony',
		points: [
			[-2, 1.65, 3.5],
			[-2, 1.65, 5.7],
			[-3.5, 1.65, 5.8]
		],
		targets: [
			[-3.5, 1.5, 6],
			[25, 4, 7],
			[25, 4, 7]
		]
	},
	{
		id: 'kitchen',
		points: [
			[-3.5, 1.65, 5.8],
			[-2, 1.65, 5.7],
			[-2, 1.65, 2],
			[0, 1.65, 2],
			[2, 1.65, 2]
		],
		targets: [
			[25, 4, 7],
			[-2, 1.5, 2],
			[0, 1.5, 2],
			[4.9, 1.4, 2],
			[4.9, 1.4, 2]
		]
	},
	{
		id: 'bedroom',
		points: [
			[2, 1.65, 2],
			[0, 1.65, 2],
			[0, 1.65, -2],
			[-1.8, 1.65, -2]
		],
		targets: [
			[0, 1.5, 2],
			[0, 1.5, -2],
			[-3.7, 1, -3],
			[-3.7, 1, -3]
		]
	},
	{
		id: 'bathroom',
		points: [
			[-1.8, 1.65, -2],
			[0, 1.65, -2],
			[2, 1.65, -2],
			[3, 1.65, -2]
		],
		targets: [
			[0, 1.5, -2],
			[4, 1.2, -3],
			[4.9, 1.2, -3.5],
			[4.9, 1.2, -3.5]
		]
	}
];

function along(points: Point[], t: number, out: THREE.Vector3) {
	const scaled = Math.min(0.999999, t) * (points.length - 1);
	const index = Math.floor(scaled),
		f = smooth(scaled - index);
	return out.set(...points[index]).lerp(new THREE.Vector3(...points[index + 1]), f);
}

export function createPortfolioScene(canvas: HTMLCanvasElement, hero = false) {
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true,
		alpha: false,
		powerPreference: 'low-power'
	});
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1.2 : 1.5));
	renderer.outputColorSpace = THREE.SRGBColorSpace;
	renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.toneMappingExposure = 1.35;
	renderer.shadowMap.enabled = window.innerWidth >= 960;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	const scene = new THREE.Scene();
	scene.background = new THREE.Color('#dae5e6');
	scene.fog = new THREE.Fog('#dae5e6', 58, 150);
	scene.add(new THREE.HemisphereLight('#eaf4ff', '#a48d72', 2.5));
	const sun = new THREE.DirectionalLight('#ffebce', 4.2);
	sun.position.set(-25, 45, 35);
	sun.castShadow = true;
	sun.shadow.mapSize.set(1024, 1024);
	Object.assign(sun.shadow.camera, {
		left: -35,
		right: 35,
		top: 40,
		bottom: -30,
		near: 1,
		far: 120
	});
	sun.shadow.bias = -0.001;
	scene.add(sun);
	const model = createBuilding();
	scene.add(model.root);
	const camera = new THREE.PerspectiveCamera(40, 1, 0.08, 250);
	let aspect = 1,
		progress = 0,
		raf = 0,
		disposed = false;
	const target = new THREE.Vector3();
	function update(p: number) {
		progress = p;
		const index = hero ? 14 : stageAt(p),
			stage = experienceStages[index];
		const lp = (id: string) => (hero ? 1 : localProgress(p, id));
		const sectional = index === 22 && lp('outro') < 0.5;
		const indoors = index >= 15 && (index < 22 || sectional);
		renderer.shadowMap.enabled = !indoors && window.innerWidth >= 960;
		model.root.children.forEach((child) => {
			child.visible = !indoors;
		});
		model.interior.visible = indoors;
		model.interiorCeiling.visible = !sectional;
		model.context.visible = true;
		model.context.children[0].visible = !(index === 2 || index === 3);
		model.survey.visible = index <= 2;
		model.temporary.visible = index >= 1 && index < 14;
		model.excavation.visible = index >= 2 && index <= 3;
		model.foundation.visible = index >= 3 && !indoors;
		model.blinding.visible = lp('foundation') > 0.01;
		model.cages.visible = lp('foundation') > 0.08 && index === 3;
		model.piles.visible = lp('foundation') > 0.25;
		model.foundationForms.visible = lp('foundation') > 0.35 && lp('foundation') < 0.85;
		model.caps.visible = lp('foundation') > 0.55;
		model.groundBeams.visible = lp('foundation') > 0.7;
		model.core.visible = index >= 6 && !indoors;
		model.roof.visible = index >= 6 && !indoors;
		model.waterproofing.visible = index === 9 && lp('envelope') > 0.3;
		model.entrance.visible = index >= 10 && !indoors;
		model.landscape.visible = index >= 12;
		model.services.visible = index === 8;
		model.scaffold.visible = index >= 5 && index < 13;
		const frame = index < 4 ? 0 : index === 4 ? lp('ground') : 1 + lp('floors') * 9;
		model.scaffold.scale.y = Math.max(0.1, frame / 10);
		model.floors.forEach((floor, i) => {
			const cycle = Math.max(0, Math.min(1, frame - i));
			floor.root.visible = cycle > 0 && !indoors;
			floor.rebar.visible = cycle > 0.02 && cycle < 0.95;
			floor.forms.visible = cycle > 0.1 && cycle < 0.8;
			floor.columns.visible = cycle > 0.2;
			floor.columns.scale.y = Math.min(1, Math.max(0.001, (cycle - 0.2) / 0.1));
			floor.deck.visible = cycle > 0.3 && cycle < 0.8;
			floor.slabSteel.visible = cycle > 0.4 && cycle < 0.7;
			floor.embedded.visible = cycle > 0.5 && cycle < 0.7;
			floor.slab.visible = cycle > 0.6;
			floor.walls.visible = lp('masonry') * 10 > i && index >= 7 && index !== 8;
			floor.walls.children.forEach((wall) => {
				if (wall instanceof THREE.Mesh)
					wall.material =
						index >= 9 && lp('envelope') * 10 > i ? model.plasterMaterial : model.brickMaterial;
			});
			floor.facade.visible = lp('facade') * 10 > i && index >= 10;
			floor.finish.visible = index >= 11;
		});
		if (indoors) {
			if (sectional) {
				const pullback = smooth(lp('outro') * 2);
				camera.position.set(3, 1.65, -2).lerp(new THREE.Vector3(14, 12, 18), pullback);
				target.set(4.9, 1.2, -3.5).lerp(new THREE.Vector3(0, 0, 0), pullback);
			} else {
				const route = routes.find((r) => r.id === stage.id)!;
				along(route.points, lp(stage.id), camera.position);
				along(route.targets, lp(stage.id), target);
			}
			camera.fov = aspect < 0.8 ? 75 : 65;
			scene.fog = null;
		} else {
			scene.fog = new THREE.Fog('#dae5e6', 58, 150);
			camera.fov = 40;
			const rise = Math.min(1, frame / 10);
			const distance = aspect < 0.75 ? 1.5 : 1;
			let x = hero ? 25 : 28 - 8 * lp('reveal'),
				y = hero ? 24 : 15 + 12 * rise,
				z = hero ? 43 : 34 + 12 * rise;
			let ty = hero ? 15 : 2 + 12 * rise;
			if (index >= 14) {
				x = 27 - 5 * lp('reveal');
				y = 26;
				z = hero ? 57 : 54;
				ty = 15;
			}
			camera.position.set(x * distance, y + (distance - 1) * 12, z * distance);
			target.set(hero ? -1 : 0, ty, 0);
			if (index === 14 && !hero) {
				const approach = smooth(Math.max(0, (lp('reveal') - 0.72) / 0.28));
				camera.position.lerp(new THREE.Vector3(0, 1.65, 8), approach);
				target.lerp(new THREE.Vector3(0, 1.5, 0), approach);
				camera.fov = THREE.MathUtils.lerp(40, aspect < 0.8 ? 75 : 65, approach);
			}
		}
		camera.lookAt(target);
		camera.updateProjectionMatrix();
	}
	function invalidate() {
		if (raf || disposed) return;
		raf = requestAnimationFrame(() => {
			raf = 0;
			if (!disposed) renderer.render(scene, camera);
		});
	}
	return {
		setProgress(p: number) {
			update(p);
			invalidate();
		},
		resize(width: number, height: number) {
			aspect = width / height;
			camera.aspect = aspect;
			renderer.setSize(width, height, false);
			update(progress);
			invalidate();
		},
		dispose() {
			disposed = true;
			cancelAnimationFrame(raf);
			model.dispose();
			renderer.dispose();
			renderer.forceContextLoss();
		}
	};
}
