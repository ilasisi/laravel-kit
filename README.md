# laravel-kit

A Claude Code plugin with Laravel workflow helpers.

| Component | What it does |
|---|---|
| `/laravel-kit:test-changed` | Runs only the Pest tests related to files changed on the branch |
| `new-feature` skill | Scaffolds a feature with artisan `make:` commands, policy and Pest tests |
| `pest-test-writer` agent | Writes and fixes Pest tests |
| Pint hook | Formats each PHP file with `vendor/bin/pint` after Claude edits it |
| `laravel-routes` MCP server | `list_routes` tool backed by `php artisan route:list --json` |

Requires `node` and `jq` on the PATH.

## Try it locally

```bash
claude --plugin-dir ~/development/laravel-kit
```

## Install

```bash
claude plugin marketplace add ilasisi/laravel-kit
claude plugin install laravel-kit@laravel-kit
```

Or from a local clone: `claude plugin marketplace add ./laravel-kit`.
