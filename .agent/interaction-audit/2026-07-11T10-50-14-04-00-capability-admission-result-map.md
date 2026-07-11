# Capability Admission and Result Map

**Timestamp:** `2026-07-11T10-50-14-04-00`

## Current protocol

```txt
invoke(action, arguments)
  -> capability lookup
  -> clone arguments
  -> execute callback
  -> completed when no exception occurs
  -> failed when an exception occurs
```

This protocol describes transport execution, not domain acceptance.

## Missing distinctions

```txt
capability available vs command admitted
transport completed vs domain accepted
accepted vs rejected vs duplicate vs stale
runtime running vs stopped vs disposed
matching session vs retired session
state mutation vs read-only observation
state commit vs visible render commit
```

## Required admission map

```txt
unavailable
  unknown or disabled capability

rejected
  capability exists but command fails policy

duplicate
  command ID already committed

stale
  session, epoch or expected frame is retired

accepted
  domain mutation committed

accepted-pending-render
  state committed but visible render acknowledgement pending

accepted-rendered
  state and committed frame correlated
```

## Required command envelope

```js
{
  id: "command-0001",
  capabilityId: "runtime.step",
  sessionId: "arrival-meadow:session-0",
  expectedStateFrame: 12,
  expectedRenderCommitId: "render-0012",
  payload: {}
}
```

## Required proof

```txt
unknown capability returns unavailable without mutation
stopped and disposed runtime reject consistently
stale session rejects
transport success cannot conceal domain rejection
duplicate IDs do not repeat side effects
result schema is identical in browser and Node adapters
read-only actions cannot gain mutation authority
accepted visible actions expose render correlation
```