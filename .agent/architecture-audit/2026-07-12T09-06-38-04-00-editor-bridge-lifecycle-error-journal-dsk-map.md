# Architecture Audit: Editor Bridge Lifecycle and Error Journal DSK Map

**Generated:** `2026-07-12T09-06-38-04-00`

## Summary

The browser editor bridge is currently created as a helper object, not admitted as a runtime-owned generation. It installs global listeners, publishes a global capability surface and retains errors, but host stop/restart and host replacement do not coordinate those resources.

## Current ownership

```txt
startWebHost
  -> expose GameHost globally
  -> install editor bridge
     -> create local capability Map
     -> create local errors Array
     -> add error listener
     -> add unhandledrejection listener
     -> assign global NexusEditorEnvironment
  -> start RAF

stop
  -> stopped = true
  -> bridge remains published
  -> listeners remain installed
  -> errors remain retained
```

## Required parent domain

```txt
meadow-editor-bridge-lifecycle-and-error-journal-authority-domain
```

## DSK map

```txt
identity and admission
  editor-bridge-id-kit
  editor-bridge-generation-kit
  editor-bridge-install-command-kit
  editor-bridge-install-admission-kit
  stale-editor-bridge-rejection-kit

public capability ownership
  editor-bridge-publication-kit
  editor-capability-lease-kit
  editor-bridge-predecessor-retirement-kit
  editor-bridge-stop-policy-kit

browser callback ownership
  browser-listener-lease-kit
  editor-bridge-dispose-plan-kit
  editor-bridge-dispose-result-kit

error journal
  browser-error-entry-kit
  browser-error-sequence-kit
  browser-error-normalization-kit
  browser-error-retention-policy-kit
  browser-error-journal-kit
  browser-error-query-kit
  browser-error-ack-kit

observation and proof
  editor-bridge-observation-kit
  editor-bridge-lifecycle-journal-kit
  editor-bridge-restart-fixture-kit
  browser-error-flood-fixture-kit
  browser-listener-retirement-fixture-kit
  browser-editor-bridge-smoke-kit
```

## Invariants

```txt
one runtime session owns at most one published bridge generation
one bridge generation owns a finite set of listener and capability leases
replacing a bridge retires the predecessor before successor publication completes
stale bridge references cannot mutate the current journal or invoke current capabilities
error retention is bounded by explicit count, byte and age policy
queries are paged and cursor-based rather than cloning the full journal
stop/dispose removes listeners exactly once
removing a global checks bridge generation before deletion
```

## Existing owners to update first

```txt
src/hosts/web-host.js
src/boot/expose-game-host.js
src/editor/install-editor-bridge.js
web-host-dsk
meadow-diagnostics-dsk
into-the-meadow-game-dsk
runtime session lifecycle authority
host capability gateway authority
```
