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
- [x] Stories tests (a11y included)
- [x] Vite web app
- [x] CLI app
- [x] API backend
- [x] Shared core/SDK
- [x] GitHub Action for tests
- [x] Renovate for dependencies updates
- [ ] GitHub Action for deployments
- [ ] GitHub Action for previews
- [ ] Environment variables management with dotenv-vault or infisical
- [ ] Design-system / UI library
- [ ] Changesets for versioning and publishing packages
- [ ] Observability (Opentelemetry/Grafana Tempo)