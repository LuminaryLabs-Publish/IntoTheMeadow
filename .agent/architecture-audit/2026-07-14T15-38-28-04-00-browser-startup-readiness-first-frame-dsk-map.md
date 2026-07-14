# Architecture Audit: Browser Startup Readiness and First Frame DSK Map

**Timestamp:** `2026-07-14T15-38-28-04-00`

## Summary

Startup currently spans provider import, game composition, renderer construction, enhancer construction, public host publication, editor bridge installation, loading UI, RAF scheduling, render-contract validation, and failure UI without one coordinating authority.

## Plan ledger

**Goal:** map existing ownership and the minimum coordinating domain needed for atomic browser readiness.

- [x] Map current participants.
- [x] Map premature publication points.
- [x] Map failure and rollback gaps.
- [x] Preserve the existing 44-kit service inventory.
- [ ] Implement the coordinating domain later.

## Current ownership

| Participant | Current owner | Current publication |
|---|---|---|
| External meadow provider | `web-host-dsk` / manifest URL | Imported before composition |
| Game and DSK stack | `into-the-meadow-game-dsk`, `game-composition-dsk` | Returned as game object |
| Renderer | `meadow-webgl-renderer-v2-kit` | Attached to GameHost before first frame |
| Enhancer | render-plan enhancer | Attached before first frame |
| GameHost | `exposeGameHost()` | Global immediately |
| Editor bridge | editor bridge adapter | Global immediately, listeners installed |
| Loading UI | web host | Hidden before first RAF |
| First frame | RAF callback | Validated after public publication |
| Fatal state | `showFatal()` | UI-only terminal projection |

## Required parent domain

`meadow-browser-startup-readiness-first-frame-authority-domain`

## Required services

```txt
BrowserStartupCommand admission
BootAttemptId allocation
provider identity and export validation
candidate participant registry
first-frame contract validation
atomic public-host publication
readiness-state publication
stale-attempt rejection
startup rollback and retirement
BrowserStartupResult
BrowserStartupFailureResult
FirstVisibleMeadowFrameAck
startup fixture matrix
```

## Dependency order

```txt
boot attempt
  -> provider candidate
  -> game candidate
  -> renderer and enhancer candidates
  -> editor bridge candidate without public exposure
  -> first candidate frame
  -> atomic public adoption
  -> Ready result and frame acknowledgement
```

## Failure order

```txt
reject new commands
  -> stop candidate frame submission
  -> remove candidate listeners
  -> dispose editor bridge candidate
  -> dispose renderer and enhancer candidates
  -> revoke candidate globals
  -> restore loading/fatal projection
  -> publish rollback receipts and terminal failure result
```

## Boundary

This audit defines coordination only. It does not claim implementation or executable proof.