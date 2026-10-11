export interface ExperienceStage {
	id: string;
	title: string;
	label: string;
	description: string;
	focus: string[];
	quality: string;
	weight: number;
	start: number;
	end: number;
}
const definitions = [
	[
		'survey',
		'Every building begins with the ground.',
		'Site survey',
		'Boundary references, existing conditions and a conceptual datum establish the starting point. Survey and geotechnical investigations inform the eventual design.',
		['Boundary verification', 'Site levels', 'Survey references'],
		'Confirm survey information before setting out.',
		1
	],
	[
		'preparation',
		'Make room for what comes next.',
		'Site preparation',
		'Clear the plot, establish a controlled entrance and separate storage, access and temporary drainage zones.',
		['Site clearance', 'Temporary fencing', 'Safe access'],
		'Keep pedestrians separate from construction access.',
		1
	],
	[
		'excavation',
		'Precision starts below the surface.',
		'Setting out & excavation',
		'Reference axes locate the column grid. A sectional ground view reveals the formation level and conceptual excavation support.',
		['Grid lines', 'Formation level', 'Excavation support'],
		'Actual excavation depth and support require site-specific design.',
		1
	],
	[
		'foundation',
		'A strong beginning. Out of sight.',
		'Foundation system',
		'Illustrative piles connect to pile caps and ground beams. Reinforcement precedes placement; curing and acceptance precede the frame.',
		['Piles & pile caps', 'Reinforcement', 'Placement → curing'],
		'Time compressed. Foundation selection requires a geotechnical report.',
		2
	],
	[
		'ground',
		'Connect the load path.',
		'Ground-floor structure',
		'Columns, connecting beams and the first elevated slab establish the reinforced-concrete frame. Loads transfer from slabs through columns to foundations.',
		['Column reinforcement', 'Formwork', 'Beams & slab'],
		'Inspect reinforcement, alignment and concrete before acceptance.',
		2
	],
	[
		'floors',
		'One level. Then the next.',
		'Repeated floor construction',
		'The frame rises sequentially: reinforcement, column forms, concrete, slab forms, reinforcement, embedded services, placement, curing, stripping and the next level.',
		['Ground + Floors 01–09', 'Sequential floor cycles', 'Curing & inspection'],
		'Elapsed construction time is compressed; stripping is not immediate.',
		6
	],
	[
		'roof',
		'Complete the structural silhouette.',
		'Core, staircase & roof',
		'Stair flights, the circulation core and roof complete the primary structure. Parapets and a supported service area define the roofline.',
		['Vertical circulation', 'Roof slab', 'Parapet & roof access'],
		'Keep access clear around rooftop equipment.',
		1
	],
	[
		'masonry',
		'Give structure a sense of space.',
		'Brickwork & partitions',
		'Brick infill rises floor by floor, preserving openings, balcony edges and the internal circulation route.',
		['Infill masonry', 'Window openings', 'Room partitions'],
		'Coordinate openings and lintels with drawings.',
		2
	],
	[
		'services',
		'The systems behind everyday life.',
		'MEP rough-in',
		'Coordinated electrical, water, waste and rainwater risers connect the floors. A sectional view keeps service routes visible before concealment.',
		['Water & waste risers', 'Electrical routes', 'Fire-safety coordination'],
		'Inspect services before closing walls; routes are illustrative.',
		1
	],
	[
		'envelope',
		'Designed for a monsoon climate.',
		'Plaster & waterproofing',
		'Render, roof protection and wet-area waterproofing prepare the envelope. Rainwater routes lead toward site drainage, away from occupied space.',
		['External render', 'Wet-area protection', 'Rainwater drainage'],
		'Check waterproofing, falls and seals before finishing.',
		1
	],
	[
		'facade',
		'A thoughtful face to the city.',
		'Windows, balconies & façade',
		'Recessed glazing, shaded balconies and charcoal railings bring together warm plaster, concrete and restrained timber-like details.',
		['Window systems', 'Balcony railings', 'Shading & entrance'],
		'Check fixing details, glazing and weather seals.',
		2
	],
	[
		'finishes',
		'Finish with care.',
		'Interior finishes',
		'Flooring, paint, joinery, lighting and practical kitchen and bathroom fittings complete the apartment interiors.',
		['Floor & ceiling finishes', 'Joinery & fittings', 'Lighting'],
		'Protect completed finishes during remaining works.',
		1
	],
	[
		'landscape',
		'A building belongs to its site.',
		'Site development',
		'A compact entrance court, pedestrian path, planted edges and drainage connect the residence to its Dhaka-inspired neighborhood.',
		['Pedestrian circulation', 'Tropical planting', 'Site drainage'],
		'Planting must not obstruct entrances or emergency access.',
		1
	],
	[
		'handover',
		'Completion is a process, too.',
		'Testing & handover',
		'Illustrative checks cover finishes, plumbing, electrical systems, lift services, fire provisions and drainage before documentation and handover.',
		['Snagging & cleaning', 'Systems testing', 'Handover records'],
		'A workflow visualization—not evidence of approvals or completed tests.',
		2
	],
	[
		'reveal',
		'From foundation to finish.',
		'The completed residence',
		'Every stage matters. Every detail contributes to the final result. Ten above-ground floors, one coherent engineering story.',
		['Ground Floor + 01–09', 'Dhaka-inspired context', 'Representative visualization'],
		'Conceptual architecture, not a certified structural design.',
		3
	],
	[
		'entrance',
		'Welcome inside.',
		'Main entrance',
		'A sheltered entrance opens into a warm, simply finished lobby. Follow the circulation route toward the lift and stairs.',
		['Entrance threshold', 'Lobby finishes', 'Clear circulation'],
		'Interior geometry is an illustrative spatial study.',
		1
	],
	[
		'lobby',
		'The connections between floors.',
		'Lift lobby & staircase',
		'A compact lift lobby and two-flight staircase organize vertical movement. The next view is a controlled sectional transition to an upper apartment.',
		['Lift lobby', 'Staircase', 'Vertical circulation'],
		'The apartment transition is sectional, not a continuous lift ride.',
		1
	],
	[
		'living',
		'Space for everyday moments.',
		'Living & dining',
		'Neutral finishes, modest furniture and generous openings create a practical shared living and dining space.',
		['Living & dining', 'Material selection', 'Natural daylight'],
		'Maintain clear walking routes around furniture.',
		2
	],
	[
		'balcony',
		'A little closer to the city.',
		'Balcony & neighborhood',
		'Shaded balcony access opens toward neighboring apartment blocks and tropical planting in a flat, urban setting.',
		['Balcony access', 'Solar shading', 'Urban outlook'],
		'Environmental performance is not calculated or certified.',
		1
	],
	[
		'kitchen',
		'Practical by design.',
		'Kitchen',
		'A compact kitchen brings together storage, sink, worktops and appliances while keeping the central circulation route open.',
		['Kitchen worktop', 'Storage', 'Service coordination'],
		'Fixture and service placement are conceptual.',
		1
	],
	[
		'bedroom',
		'Room to slow down.',
		'Bedroom',
		'A restrained bedroom combines a comfortable bed, wardrobe and daylight opening without unnecessary decoration.',
		['Bedroom', 'Daylight opening', 'Neutral finishes'],
		'Furniture preserves access to the door and window.',
		1
	],
	[
		'bathroom',
		'Care in the smallest details.',
		'Bathroom',
		'Tiled surfaces, a shower enclosure, basin and floor-supported WC distinguish wet and dry zones.',
		['Wet & dry zones', 'Bathroom fittings', 'Waterproofing'],
		'Wet-area falls and plumbing require detailed coordination.',
		1
	],
	[
		'outro',
		'Built to last. Designed for life.',
		'Interior to exterior',
		'The sectional view reconnects the rooms, circulation and complete ten-storey residence. Start a conversation about your next project.',
		['Architectural coordination', 'Quality & safety', 'Responsible delivery'],
		'All scenes and project categories are representative studies.',
		2
	]
] as const;
const total = definitions.reduce((sum, stage) => sum + stage[6], 0);
let cursor = 0;
export const experienceStages: ExperienceStage[] = definitions.map((s) => {
	const start = cursor / total;
	cursor += s[6];
	return {
		id: s[0],
		title: s[1],
		label: s[2],
		description: s[3],
		focus: [...s[4]],
		quality: s[5],
		weight: s[6],
		start,
		end: cursor / total
	};
});
export function stageAt(progress: number) {
	const index = experienceStages.findIndex((s) => progress < s.end);
	return index < 0 ? experienceStages.length - 1 : index;
}
export function localProgress(progress: number, id: string) {
	const stage = experienceStages.find((s) => s.id === id)!;
	return Math.max(0, Math.min(1, (progress - stage.start) / (stage.end - stage.start)));
}
export const floorOperations = [
	'Vertical reinforcement',
	'Column formwork',
	'Column concrete',
	'Beam & slab formwork',
	'Slab reinforcement',
	'Embedded services & openings',
	'Concrete placement',
	'Curing & inspection · elapsed time',
	'Formwork removal',
	'Prepare the next level'
];
