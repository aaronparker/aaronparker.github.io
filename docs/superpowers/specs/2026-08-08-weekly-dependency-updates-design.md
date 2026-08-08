# Weekly Dependency Updates Design

## Goal

Add a GitHub Actions workflow that updates npm packages and Ruby Gems every
week. The workflow must validate the generated site before committing changes
directly to `main`.

## Update Policy

- Run every Monday on a UTC schedule and support manual dispatch.
- Update npm dependency ranges, including major versions, with
  `npm-check-updates`, then regenerate `package-lock.json`.
- Query RubyGems for the latest stable Jekyll release and update the Jekyll
  constraint in `Gemfile`, including major versions.
- Run `bundle update` to update all Gems allowed by the resulting `Gemfile` and
  regenerate `Gemfile.lock`.

## Validation

Use the same Node.js and Ruby versions as the deployment workflow. After
installing the updated dependencies, run the following gates in order:

1. Build fonts, icons, and Tailwind CSS with `npm run build`.
2. Build the site in production mode with `bundle exec jekyll build`.
3. Validate generated HTML and local references with HTMLProofer. Disable
   external URL checks so transient network failures cannot block updates.

Any failed update or validation step stops the job before the commit step, so
`main` remains unchanged.

## Commit Behavior

Grant only `contents: write` permission. Use workflow concurrency to prevent
overlapping update runs. Commit all dependency manifests, lockfiles, and
regenerated site assets only when the working tree changed, then push the
single maintenance commit directly to `main`.

The checkout step targets `main`, and the commit step uses the repository's
configured automation identity secrets to match the existing deployment
workflow.

## Limitations

Build and HTML validation detect dependency resolution failures, rendering
errors, and broken local references. They cannot prove that a major dependency
update preserves every visual detail, so direct major-version updates retain a
higher regression risk than reviewed pull requests.