# Reset Replay Audit: Session Generation and Participant Reset Contract

**Timestamp:** `2026-07-14T09-58-25-04-00`

## Summary

Reset requires an explicit participant manifest. State, provider, render plan, enhancer, renderer, schedulers, editor observations, capture baselines and error ledgers must each declare reset, carry-forward or retirement policy.

## Plan ledger

**Goal:** define one atomic reset contract shared by browser and headless environments.

- [x] Enumerate current reset participants.
- [x] Classify retained and reset state.
- [x] Define preparation, adoption, rollback and proof rules.
- [ ] Implement the contract later.

## Participant policy

| Participant | Current behavior | Required policy |
|---|---|---|
| Game state | Recreated | Recreate under a unique successor session generation. |
| Meadow provider | Retained | Explicitly retain with revision receipt or reset through provider API. |
| Base render plan | Retained | Rebuild or explicitly carry with source fingerprint. |
| Enhancer | Browser retained; headless invalidated | One shared invalidation policy. |
| Renderer cache | Retained | Clear, reuse with revision receipt, or rebuild by policy. |
| Browser RAF | Continues | Suspend and resume one accepted generation. |
| Manual editor tick | Remains callable | Reject while reset is preparing/adopting. |
| Browser last plan/render | Retained | Clear or mark predecessor-only until successor frame. |
| Headless time | Reset | Bind to successor session clock. |
| Headless last capture | Retained | Clear or explicitly carry as cross-session baseline. |
| Error ledger | Retained | Declare clear/carry policy and revision. |

## Atomicity rule

```txt
prepare every required participant
  -> validate successor identities and fingerprints
  -> adopt all participants together
  -> otherwise dispose candidates and preserve predecessor
```

## Replay rule

A replay is valid only when command journal, initial state, provider/plan fingerprints, tick sequence and terminal state/render fingerprints all match one session generation.

## Boundary

The contract is documentation only.