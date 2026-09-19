export interface ConstructionStage {
	index: number;
	stageNumber: string; // e.g., "01"
	discipline: string;
	title: string;
	subtitle: string;
	elevation: string; // e.g., "+0.000m", "-14.200m"
	datumCoord: string;
	keyMetric: {
		label: string;
		value: string;
		tolerance: string;
	};
	specs: Array<{ label: string; value: string }>;
	engineeringNote: string;
	cameraTarget: {
		x: number;
		y: number;
		z: number;
	};
	cameraPosition: {
		x: number;
		y: number;
		z: number;
	};
}
