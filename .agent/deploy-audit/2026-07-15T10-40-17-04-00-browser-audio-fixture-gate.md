# Deploy Audit: Browser Audio Fixture Gate

**Timestamp:** `2026-07-15T10:40:17-04:00`  
**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

## Summary

Static and descriptor tests cannot prove browser audio unlock, lifecycle behavior or deployed-origin parity. Production readiness needs real browser fixtures against source, built output and GitHub Pages.

## Plan ledger

**Goal:** prevent audio readiness claims until the same accepted semantic event produces the expected audible result and retirement receipts across every shipped surface.

- [x] Define browser capability and unlock rows.
- [x] Define cue, lifecycle and resource-retirement rows.
- [x] Define source/build/Pages parity rows.
- [ ] Implement and run later.

## Required fixture rows

| Row | Required evidence |
|---|---|
| Capability | Audio support snapshot and policy classification. |
| Gesture unlock | Accepted user gesture, context generation and ready result. |
| Ambience | One adopted ambience revision and active-source receipt. |
| Semantic cue | Stable event ID, admitted cue and first audible acknowledgement. |
| Deduplication | Repeated state/snapshot does not replay the cue. |
| Preferences | Mute and volume revisions change buses without rebuilding gameplay state. |
| Pause/visibility | Immediate silence or suspension according to policy. |
| Resume | No stale cues; ambience resumes from accepted state. |
| Route retirement | All sources stop/disconnect and late events reject. |
| Fatal stop | Renderer/host failure cannot leave audio resources active. |
| Parity | Source, built artifact and Pages report matching audio policy and cue results. |

## Required artifacts

```txt
audio capability snapshot
unlock result
semantic event ledger
cue admission results
active source snapshot
bus/preference snapshot
lifecycle transition receipts
resource retirement receipts
visible frame ID
audible acknowledgement ID
source/build/Pages comparison
```

## Release gate

```txt
no deployed-audio claim without accepted gesture proof
no cue-correctness claim without stable semantic event identity
no lifecycle-safety claim without hidden/pause/route fixtures
no resource-safety claim without stop/disconnect receipts
no parity claim without source/build/Pages results
```

## Boundary

No build, browser audio fixture or deployed-origin smoke was executed.