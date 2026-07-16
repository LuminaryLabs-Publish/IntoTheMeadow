# Interaction Audit: Content Graph Command and Result Map

**Timestamp:** `2026-07-16T05-58-36-04-00`

## Summary

Interaction targets, objective requirements and story triggers share action and target identifiers but no command/result boundary owns their convergence.

## Plan ledger

**Goal:** make every authored interaction edge resolve before runtime commands can depend on it.

- [x] Identify target, action, objective and story trigger references.
- [x] Define content admission commands and typed results.
- [x] Define editor mutation revalidation.
- [ ] Implement later.

## Command map

```txt
ContentGraphAdmissionCommand
  inputs: manifest, scene configs, interaction targets, objectives, story beats, initial state
  result: ContentGraphAdmissionResult

ContentMutationCommand
  inputs: base content generation, mutation ID, changed nodes
  result: ContentMutationResult

ContentGenerationRetirementCommand
  inputs: content generation and reason
  result: ContentGenerationRetirementResult
```

## Result rules

```txt
accepted admission
  -> publishes typed registries and graph digest
  -> permits gameplay state creation

rejected admission
  -> publishes every duplicate, malformed, unknown and unreachable edge
  -> performs no gameplay or editor publication

accepted mutation
  -> creates one successor generation
  -> predecessor remains readable until adoption

rejected or stale mutation
  -> performs no public mutation
  -> returns the existing terminal result for duplicate command IDs
```

## Current edge examples

```txt
walk-the-path -> path-progress -> arrival-path
inspect-tree -> inspect -> focal-tree
path-discovery -> path-progress:0.25
focal-tree story beat -> inspect:focal-tree
initial progression -> walk-the-path and arrival
```

## Boundary

No interaction handlers or input mappings were implemented or changed.