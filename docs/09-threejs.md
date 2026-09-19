# 09 — Three.js Construction Experience

The signature 13-stage construction lifecycle visualizer is implemented in `src/lib/three/SceneManager.ts` and wrapped by `src/lib/three/ConstructionCanvas.svelte`.

---

## The 13 Construction Stages

| #      | Stage Name            | Visual State                                             |
| ------ | --------------------- | -------------------------------------------------------- |
| **01** | Site survey           | Ground contour grid, total station benchmark datum       |
| **02** | Excavation            | Secant retaining wall, stepped sub-grade pit             |
| **03** | Piling                | Deep rock-socketed bored piles grid                      |
| **04** | Foundation            | Monolithic 2.8m reinforced concrete raft mat with rebar  |
| **05** | Columns & frame       | Concrete shear core + steel columns & perimeter diagrid  |
| **06** | Floor slabs           | Post-tensioned concrete slab plates                      |
| **07** | Building envelope     | Unitized double-glazed curtain wall facade               |
| **08** | BIM coordination      | Exploded multi-discipline color-coded clash state        |
| **09** | MEP coordination      | Primary HVAC ducts and chilled-water piping risers       |
| **10** | Construction progress | Twin tower luffing cranes and staging platforms          |
| **11** | Interior construction | Heavy-gauge drywall framing and raised access floor      |
| **12** | Final interior        | Suspended mass timber acoustic ceiling baffles           |
| **13** | Completed project     | Commissioned tower with geometric crown and illumination |

---

## Customizing Geometry & Models

In `SceneManager.ts`, each phase is grouped into an independent `THREE.Group`:

- `groupSite`
- `groupExcavation`
- `groupPiling`
- `groupFoundation`
- `groupColumnsFrame`
- `groupFloorSlabs`
- `groupFacade`
- `groupBim`
- `groupMep`
- `groupCranes`
- `groupInterior`
- `groupFinalInterior`
- `groupCompleted`

You can swap out procedural geometric meshes with custom GLTF models loaded via `GLTFLoader`.
