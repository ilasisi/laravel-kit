#!/usr/bin/env bash
# Runs Laravel Pint on the PHP file Claude just edited, if the project has Pint installed.
set -euo pipefail

input="$(cat)"
file="$(jq -r '.tool_input.file_path // empty' <<<"$input")"
cwd="$(jq -r '.cwd // empty' <<<"$input")"

[[ "$file" == *.php && -f "$file" ]] || exit 0
[[ -x "$cwd/vendor/bin/pint" ]] || exit 0

cd "$cwd"
vendor/bin/pint --quiet "$file" >/dev/null 2>&1 || true
exit 0
