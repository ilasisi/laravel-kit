---
description: Run Pest tests related to the files changed on this branch
argument-hint: "[extra pest args]"
allowed-tools: Bash(git diff:*), Bash(git status:*), Bash(php artisan test:*)
---

Find the PHP files changed relative to the default branch (committed and uncommitted):

!`git diff --name-only $(git merge-base HEAD origin/HEAD 2>/dev/null || echo HEAD) -- '*.php'; git status --porcelain -- '*.php' | awk '{print $2}'`

For each changed file, work out which test files cover it:
- Files already under `tests/` are tests themselves.
- For `app/**/Foo.php`, look for `tests/**/FooTest.php` and tests that reference `Foo`.

Run only those tests with `php artisan test --compact <files> $ARGUMENTS`. If nothing maps to a test, say so instead of running the whole suite. Summarise failures with file:line and the likely cause.
