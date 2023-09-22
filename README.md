# Acme Monorepo

Pre-requisites:

- Install [devenv](https://devenv.sh/getting-started/) and [direnv](https://devenv.sh/automatic-shell-activation/)

Opiniated TypeScript monorepo architecture including:

- [x] Stable system dependencies (Nix/Devenv)
- [x] Pure ESM packages
- [x] Fast package manager (Pnpm)
- [x] Type-checking (TypeScript)
- [x] Lint (ESLint)
- [x] Format (Prettier)
- [x] Task runner (Turborepo)
- [x] Monorepo lint (Knip)
- [x] Unit/Integration tests (Vitest)
- [x] Components/E2E tests (Playwright)
- [x] Storybook
- [x] Vite web app
- [x] CLI app
- [x] API backend
- [x] Shared core/SDK
- [ ] Observability (Opentelemetry/Grafana Tempo)
- [ ] GitHub Actions for the CI (type-check, lint, tests, deploy)