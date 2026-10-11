import { describe, expect, it } from 'vitest';
import { experienceStages, localProgress, stageAt, floorOperations } from './stages';
import { createBuilding, FLOOR_COUNT, FLOOR_HEIGHT } from './building';

describe('Residential experience contracts', () => {
	it('covers a contiguous normalized timeline with fifteen construction and eight interior stages', () => {
		expect(experienceStages).toHaveLength(23);
		expect(experienceStages[0].start).toBe(0);
		expect(experienceStages.at(-1)?.end).toBe(1);
		experienceStages.forEach((stage, index) => {
			expect(stage.end).toBeGreaterThan(stage.start);
			if (index) expect(stage.start).toBe(experienceStages[index - 1].end);
			expect(stageAt(stage.start)).toBe(index);
			expect(stageAt((stage.start + stage.end) / 2)).toBe(index);
		});
	});
	it('restores the same state when progress reverses or jumps directly', () => {
		const foundation = experienceStages[3];
		expect(localProgress(0, 'foundation')).toBe(0);
		expect(localProgress(1, 'foundation')).toBe(1);
		expect(localProgress((foundation.start + foundation.end) / 2, 'foundation')).toBeCloseTo(0.5);
		expect(stageAt(1)).toBe(22);
		expect(stageAt(0)).toBe(0);
		expect(floorOperations).toHaveLength(10);
	});
	it('models exactly Ground Floor and Floors 01–09, with one ceiling slab per floor', () => {
		const model = createBuilding();
		expect(FLOOR_COUNT).toBe(10);
		expect(model.floors).toHaveLength(10);
		model.floors.forEach((floor, i) => {
			expect(floor.root.position.y).toBe(i * FLOOR_HEIGHT);
			expect(floor.slab.children.length).toBeGreaterThan(0);
		});
		model.dispose();
	});
});
