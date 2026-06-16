# AGENTS.md

Guidance for contributors working on `@capgo/capacitor-facebook-analytics`.

## Commands

Use Bun for JavaScript tooling.

```bash
bun install
bun run build
bun run verify
bun run lint
bun run fmt
```

Individual verification commands:

```bash
bun run verify:ios
bun run verify:android
bun run verify:web
```

## Project Structure

- `src/definitions.ts` is the source of truth for the public TypeScript API and generated README docs.
- `src/event.ts` contains Facebook standard event and parameter constants.
- `src/web.ts` contains the web fallback implementation.
- `ios/Sources/FacebookAnalyticsPlugin/` contains the Swift bridge.
- `android/src/main/kotlin/app/capgo/facebookanalytics/` contains the Kotlin bridge.
- `Package.swift` and `CapgoCapacitorFacebookAnalytics.podspec` must both stay valid.

## Development Notes

- Do not edit generated `dist/` files manually.
- Do not edit README API sections by hand; update `src/definitions.ts` and run `bun run docgen`.
- Keep iOS and Android APIs behaviorally aligned.
- Use JVM 21 for Android builds.
- Keep the plugin major version aligned with the Capacitor major version.

## Timeout Policy

- Keep CI, script, and runtime timeouts at 10 minutes or less. Use `timeout-minutes: 10` or lower in GitHub Actions and cap timeout values at `600000` ms, `600` seconds, or `10m` unless explicitly requested.
