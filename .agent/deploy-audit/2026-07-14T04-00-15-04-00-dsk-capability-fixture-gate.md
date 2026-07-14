# Deploy Audit: DSK Capability Fixture Gate

## Goal

Prevent source, built output or GitHub Pages from claiming a complete game capability set from descriptor inventory alone.

## Required source fixtures

```txt
complete active manifest passes
missing requirement rejects
unknown service token rejects
duplicate provider rejects unless policy allows it
dependency cycle rejects
provider version mismatch rejects
planned kit cannot satisfy active requirement
deferred external provider returns explicit degraded or rejected result
service preparation failure preserves predecessor
service probe failure disposes candidates
rollback failure is terminal and visible
```

## Required browser fixtures

```txt
GameHost exposes immutable CapabilityManifest
editor bridge reports the same composition revision
unavailable capability commands reject without mutation
diagnostics distinguish active, planned, degraded and unavailable
first rendered frame cites accepted DskCompositionRevision
```

## Required artifact parity

```txt
source manifest fingerprint
built manifest fingerprint
Pages manifest fingerprint
provider revision
service owner map
dependency order
first capability frame acknowledgement
```

## Current validation

`npm run check` includes a DSK registry smoke, but that smoke verifies structural registry properties. No executable dependency, provider, rollback, browser readback or Pages capability fixture currently exists.

## Release boundary

Deployment can remain visually functional while capability claims are incomplete. Pages readiness should describe rendering separately from gameplay/service readiness until both are independently proven.