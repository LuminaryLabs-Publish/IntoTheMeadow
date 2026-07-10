# Interaction Audit: Source Selection Result and Target Index Map

**Repository:** `LuminaryLabs-Publish/IntoTheMeadow`

**Timestamp:** `2026-07-10T19-48-39-04-00`

## Current selection behavior

```txt
browser:
  import external URL
  -> missing module/export throws
  -> no selection result row
  -> no browser fallback

Node/headless:
  omit external factory
  -> nullish fallback selection
  -> no selection result row
  -> local fallback silently becomes authoritative
```

Provider selection currently behaves like an implementation detail rather than a command with an observable result.

## Required provider-selection result

```txt
{
  sequence,
  request: {
    preferredProvider,
    fallbackPolicy,
    manifestUrl,
    pinnedCommit
  },
  status: accepted | rejected | fallback,
  reason,
  selectedProvider,
  providerVersion,
  sourceEpoch,
  sourcePlanFingerprint,
  validation
}
```

Stable reason codes should include:

```txt
external-selected
external-import-failed
external-export-missing
external-validation-failed
fallback-selected-by-policy
fallback-selected-for-headless
fallback-denied
fallback-validation-failed
source-rebuilt
source-unchanged
```

## Target-index requirement

The selected source should produce a bounded target index used by both rendering and interaction:

```txt
arrival-path
  -> source object id meadow-path
  -> path points
  -> width
  -> coordinate space
  -> source epoch

focal-tree
  -> source object id focal-tree
  -> position
  -> bounds/range anchor
  -> coordinate space
  -> source epoch
```

## Stale-reference policy

```txt
source rebuild increments sourceEpoch
commands carry or resolve the current sourceEpoch
stale target references reject without mutation
reason: stale-source-epoch
result includes current source fingerprint
```

## Host/editor projection

Additive methods should expose:

```txt
GameHost.getSourceProviderObservation()
GameHost.getSourceTargetIndex()
NexusEditorEnvironment capability: source.getProvider
NexusEditorEnvironment capability: source.getTargets
NexusEditorEnvironment capability: source.rebuild
```

Do not expose mutable provider factories or raw module objects.

## Conclusion

A source selection should be observable using the same accepted/rejected/result discipline planned for gameplay commands. This prevents browser, Node, and editor paths from silently operating on different meadow authorities.