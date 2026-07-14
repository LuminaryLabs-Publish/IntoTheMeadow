# Browser Observation Audit: Attempt and Artifact Provenance Contract

**Timestamp:** `2026-07-13T22-40-52-04-00`

## Summary

The current artifact directory is mutable and reused. A reliable observation must isolate each attempt, bind every artifact to immutable source and runtime evidence, then atomically promote only a terminally complete manifest.

## Plan ledger

**Goal:** prevent stale, mixed or unattributed browser artifacts from being accepted as current proof.

- [x] Record fixed-name artifact behavior.
- [x] Record missing source and browser provenance.
- [x] Record missing hash and promotion semantics.
- [x] Define attempt directory and manifest rules.
- [ ] Implement atomic artifact settlement later.

## Required attempt layout

```txt
.artifacts/headless-editor/browser/<ObservationAttemptId>/
  command.json
  server.json
  browser.json
  page.json
  renderer-frame.json
  dom.html
  canvas.png
  screenshot.png
  browser.stdout.log
  browser.stderr.log
  server.stderr.log
  manifest.pending.json
  manifest.json
```

## Required provenance

```txt
repository full name and commit SHA
working-tree or build artifact fingerprint
provider URL and immutable provider commit
observation policy revision
browser executable path, version and hash
launch arguments and effective viewport
server PID, address, port and ownership receipt
page URL and page generation
editor bridge protocol and capability snapshot
renderer frame, mesh and GPU generations
artifact byte length, media type, dimensions and cryptographic hash
capture start/end timestamps
retirement receipts
```

## Promotion rule

```txt
write isolated temporary attempt
  -> validate required artifacts
  -> validate hashes and semantic checks
  -> validate same-page and same-frame relations
  -> validate process retirement
  -> rename manifest.pending.json to manifest.json
  -> update latest pointer atomically
```

Failed and partial attempts remain quarantined and must never replace the latest completed pointer.

## Boundary

No filesystem or artifact behavior changed.