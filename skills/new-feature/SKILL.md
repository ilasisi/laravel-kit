---
name: new-feature
description: Scaffold a new Laravel feature end to end (model, migration, factory, Livewire/controller, policy, Pest tests) using artisan make commands and the project's existing conventions. Use when the user asks to add a new resource, page, or feature to a Laravel app.
---

# New Laravel feature

1. **Read the conventions first.** Look at 2-3 sibling files for whatever you are about to create (models, Livewire components, tests) and match their structure, naming and idioms. Check `CLAUDE.md` / `AGENTS.md` for project rules.
2. **Generate, don't hand-write.** Use `php artisan make:<type> --no-interaction` (run `php artisan make:model --help` to see options such as `-mfs`). Use `make:class` for plain classes.
3. **Data layer:** migration with proper foreign keys and indexes, model with casts and relationships (explicit return types), factory with useful states.
4. **Behaviour:** authorization via a policy, validation via form request or Livewire validation attributes.
5. **Tests:** `php artisan make:test --pest <Name>Test`. Cover the happy path, validation failures and authorization. Use factories.
6. **Finish:** run the new tests with `php artisan test --compact --filter=<Name>` and format with `vendor/bin/pint --dirty`.

Report what was created as a short list of file paths.
