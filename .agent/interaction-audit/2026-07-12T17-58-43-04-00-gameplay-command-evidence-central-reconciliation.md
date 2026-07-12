# Interaction Audit: Gameplay Command Evidence Central Reconciliation

**Generated:** `2026-07-12T17-58-43-04-00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

The browser and editor expose observation surfaces, but no bounded gameplay command enters the game owner. Movement and inspection therefore have no identity, revision admission, evidence or terminal result.

## Plan ledger

**Goal:** define one typed command path that rejects stale or unsupported intent before mutation and records exact DSK service consumption.

- [x] Identify browser/editor command ingress gaps.
- [x] Define movement and inspection evidence.
- [x] Define accepted, rejected and stale results.
- [ ] Implement after provider/capability readiness exists.

## Required command

```txt
GameplayCommand {
  commandId
  sessionId
  capabilityGeneration
  expectedGameplayRevision
  source: keyboard | pointer | editor
  action: move | look | inspect
  payload
}
```

## Required evidence flow

```txt
input sample
  -> context and capability admission
  -> normalized action
  -> detached movement or inspect proposal
  -> terrain/path or target/range evidence
  -> candidate progression transitions
  -> atomic GameplayResult
  -> DskConsumptionReceipt rows
```

## Required rejections

```txt
duplicate command
stale session or capability generation
stale gameplay revision
planned/unready service
invalid payload
unknown action
unknown target
out-of-range target
failed terrain/path projection
```

Every rejection must preserve player, interaction, objective and story state exactly.

## Consumption proof

Each accepted command must identify the kit, provider and service invoked, input/result fingerprints, predecessor/successor revisions and terminal status. Observation-only `GameHost` and editor snapshots are not substitutes for these receipts.