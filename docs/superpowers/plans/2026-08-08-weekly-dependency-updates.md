# Weekly Dependency Updates Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use
> superpowers:subagent-driven-development (recommended) or
> superpowers:executing-plans to implement this plan task-by-task. Steps use
> checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a weekly workflow that updates npm packages and Ruby Gems,
validates the rendered site, and commits successful updates directly to
`main`.

**Architecture:** A single GitHub Actions workflow owns dependency discovery,
lockfile regeneration, asset generation, site rendering, HTML validation, and
conditional commit. Sequential steps ensure no repository write occurs until
all validation gates pass.

**Tech Stack:** GitHub Actions, Node.js 20, npm, Ruby 3.4.3, Bundler, Jekyll,
HTMLProofer

## Global Constraints

- Run every Monday on a UTC schedule and support manual dispatch.
- Include major npm and Jekyll updates.
- Disable external URL validation while checking generated HTML.
- Push only when files changed and only after every validation step succeeds.
- Use the existing `COMMIT_NAME` and `COMMIT_EMAIL` secrets.
- Do not create a Git commit during implementation unless explicitly requested.

---

### Task 1: Add And Validate The Weekly Update Workflow

**Files:**

- Create: `.github/workflows/update-dependencies.yml`

**Interfaces:**

- Consumes: `package.json`, `package-lock.json`, `Gemfile`, `Gemfile.lock`,
  `COMMIT_NAME`, and `COMMIT_EMAIL`
- Produces: updated dependency files and generated assets committed to `main`
  after a successful production build and HTMLProofer run

- [x] **Step 1: Establish the failing structural check**

Run:

```shell
ruby -e 'require "yaml"; YAML.load_file(".github/workflows/update-dependencies.yml")'
```

Expected: FAIL because `.github/workflows/update-dependencies.yml` does not
exist.

- [x] **Step 2: Create the workflow**

Create `.github/workflows/update-dependencies.yml` with:

- `schedule` set to Monday in UTC and a `workflow_dispatch` trigger.
- `contents: write` as the only permission.
- a concurrency group that does not allow overlapping update jobs.
- checkout of `main` using full history.
- Node.js 20 and Ruby 3.4.3 setup with npm and Bundler caching.
- `npx npm-check-updates@latest -u` followed by `npm install`.
- a Ruby command that queries the latest stable Jekyll version from RubyGems
  and replaces the existing `gem "jekyll"` constraint in `Gemfile`.
- `bundle update`, `npm run build`, and a production Jekyll build.
- installation and execution of HTMLProofer against representative generated
  pages, using `_site` as the serving root and disabling external URL checks.
- a final conditional commit and push using the configured automation identity.

- [x] **Step 3: Validate workflow syntax and required controls**

Run:

```shell
ruby -e 'require "yaml"; workflow = YAML.load_file(".github/workflows/update-dependencies.yml"); abort "missing schedule" unless workflow.dig(true, "schedule"); abort "missing dispatch" unless workflow.dig(true, "workflow_dispatch"); abort "wrong permissions" unless workflow["permissions"] == {"contents" => "write"}; puts "workflow structure OK"'
```

Expected: `workflow structure OK`.

- [x] **Step 4: Exercise the rendering validation path**

Run:

```shell
npm ci
npm run build
bundle install
JEKYLL_ENV=production bundle exec jekyll build
gem install html-proofer --no-document
pages=(
  ./_site/index.html
  ./_site/posts/index.html
  ./_site/about/index.html
  ./_site/projects/index.html
  ./_site/archive/index.html
)
for page in "${pages[@]}"; do
  htmlproofer "$page" \
    --root-dir "$PWD/_site" \
    --disable-external \
    --no-enforce-https
done
```

Expected: every command exits with status 0 and HTMLProofer reports no invalid
local links, images, scripts, or generated HTML.

- [x] **Step 5: Review the final changes**

Run:

```shell
git diff --check
git status --short
git diff -- .github/workflows/update-dependencies.yml
```

Expected: no whitespace errors; the new workflow and planning documents are
the only intentional changes.