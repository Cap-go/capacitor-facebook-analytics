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
