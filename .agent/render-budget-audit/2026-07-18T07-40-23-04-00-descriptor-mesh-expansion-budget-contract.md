# Render Budget Audit: Descriptor-to-Mesh Expansion Contract

**Timestamp:** `2026-07-18T07-40-23-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Contract objective

Bound all CPU and GPU-facing work derived from one render plan before mesh construction begins.

## Required inputs

- Render plan ID, schema, topology key and source/provider revision.
- Terrain segment counts.
- Grass batches, cards per LOD and instances per draw group.
- Flower, cover, rock and distant-tree counts.
- Hero-tree segment, cluster and card counts.
- Viewport/device class and quality profile revision.

## Required limits

```txt
max terrain cells
max field instances by type
max grass cards and generated grass vertices
max hero-tree segments/cards
max total vertices and triangles
max typed attribute bytes
max synchronous build duration policy
max upload bytes per accepted generation
```

## Required settlement

```txt
accepted
  -> build exact admitted plan

degraded
  -> deterministic ordered reductions
  -> recompute estimate
  -> publish reduced plan digest

rejected
  -> retain last accepted generation or bounded fallback
  -> publish reasons without partial adoption
```

## Deterministic degradation order

A safe initial policy is:

1. Reduce far grass instances.
2. Reduce mid grass cards.
3. Reduce decorative flower and cover density.
4. Reduce distant-tree count.
5. Reduce terrain resolution within a declared minimum.
6. Preserve path, focal tree and required atmosphere identity.

The exact policy remains proposed and must be versioned.

## Required invariants

- Estimates and actual counts use the same expansion formulas.
- No build starts without an accepted admission ID.
- Actual mesh counts may not exceed admitted limits.
- Stale plan, profile or provider generations cannot commit.
- Renderer snapshot publishes admission ID, mesh key and actual bytes.
- The first presented matching frame publishes `FirstRenderBudgetBoundFrameAck`.

## Fixtures

- Exact-limit acceptance.
- One-over-limit rejection.
- Deterministic degradation repeatability.
- Extreme terrain-resolution rejection.
- Extreme grass-instance rejection.
- Estimated-versus-actual count parity.
- Stale generation rejection.
- Browser, artifact and Pages digest parity.

## Boundary

Documentation only; no budget runtime exists yet.