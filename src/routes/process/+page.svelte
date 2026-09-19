<script lang="ts">
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';

	const engineeringPhases = [
		{
			number: '01',
			title: 'Geotechnical & Structural Feasibility',
			timeline: 'Weeks 1 — 4',
			description:
				'Preliminary framing typology comparisons, soil-structure interaction criteria, preliminary seismic hazard assessment, and embodied carbon baseline benchmarking.',
			deliverables: [
				'Feasibility Memo',
				'Framing Comparison Matrix',
				'Geotechnical Soil Assumptions'
			]
		},
		{
			number: '02',
			title: 'Schematic Design & Dynamic Wind/Seismic Modeling',
			timeline: 'Weeks 5 — 12',
			description:
				'Nonlinear response spectrum analysis in CSI ETABS. Coordination with wind tunnel laboratories for aerodynamic loads and acceleration comfort limits.',
			deliverables: [
				'Basis of Design (BOD) Report',
				'Preliminary Gravity/Lateral Sizing',
				'Wind Tunnel Inputs'
			]
		},
		{
			number: '03',
			title: 'Detailed Structural Analysis & Calculation Package',
			timeline: 'Weeks 13 — 24',
			description:
				'Exhaustive structural calculation dossiers covering post-tensioning tendon profiles, beam-column moment connections, core boundary zone rebar, and foundation mat settlement.',
			deliverables: [
				'Full Structural Calculation Package',
				'Seismic Drift Verification',
				'Foundation Permitting Sets'
			]
		},
		{
			number: '04',
			title: 'LOD 400 BIM Coordination & Clash Resolution',
			timeline: 'Weeks 20 — 32',
			description:
				'Multidisciplinary model federation in Navisworks/Solibri. Point-by-point clash detection between structural rebar, embed plates, curtain wall anchors, and MEP distribution mains.',
			deliverables: [
				'LOD 400 Federated IFC Models',
				'Zero-Clash Sign-off Report',
				'CNC Fabrication Exports'
			]
		},
		{
			number: '05',
			title: 'Construction Administration & Special Inspections',
			timeline: 'Duration of Construction (12 — 36 Mo.)',
			description:
				'On-site surveillance of rebar placement, post-tensioning jacking operations, concrete cylinder compression breaks, ultrasonic steel weld testing, and RFI resolution.',
			deliverables: [
				'Weekly Site Observation Logs',
				'RFI & Submittal Turnaround',
				'Material Test Certificates'
			]
		},
		{
			number: '06',
			title: 'Digital Twin Handover & Structural Health Monitoring',
			timeline: 'Commissioning & Handover',
			description:
				'Final as-built model registration using terrestrial laser scanning. Calibration of permanent accelerometer and strain sensor arrays for ongoing structural health monitoring.',
			deliverables: [
				'LOD 500 COBie As-Built Model',
				'SHM Baseline Modal Report',
				'Certificate of Occupancy Sign-off'
			]
		}
	];
</script>

<svelte:head>
	<title>Engineering Lifecycle & Project Process | Vance Engineering</title>
	<meta
		name="description"
		content="The 6-stage engineering process from feasibility and nonlinear modeling to LOD 400 BIM, site supervision, and digital twin handover."
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
	<SectionHeader
		sectionNumber="01"
		category="ENGINEERING PROTOCOL"
		title="Project Lifecycle & Delivery Framework"
		subtitle="A disciplined, ISO 19650-aligned methodology delivering zero-defect structural engineering from concept to commissioning."
	/>

	<div class="space-y-8">
		{#each engineeringPhases as phase}
			<div class="blueprint-bracket border border-white/10 bg-[#181818] p-8">
				<div
					class="flex flex-col justify-between gap-4 border-b border-white/10 pb-4 font-mono text-xs sm:flex-row sm:items-center"
				>
					<div class="flex items-center gap-3">
						<span class="text-base font-bold text-[#e5a93c] sm:text-lg">PHASE {phase.number}</span>
						<span class="text-white/40">//</span>
						<span class="font-sans text-sm font-bold text-white sm:text-base">{phase.title}</span>
					</div>
					<div class="font-semibold text-[#e5a93c]">{phase.timeline}</div>
				</div>

				<p class="mt-6 max-w-4xl font-sans text-sm leading-relaxed text-white/70">
					{phase.description}
				</p>

				<div class="mt-6 border-t border-white/5 pt-4">
					<div class="tech-label mb-2 text-white/40">PHASE DELIVERABLES:</div>
					<div class="flex flex-wrap gap-2 font-mono text-xs">
						{#each phase.deliverables as del}
							<span class="border border-white/10 bg-[#121212] px-3 py-1 text-white/80">
								✓ {del}
							</span>
						{/each}
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
