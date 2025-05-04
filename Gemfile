source "https://rubygems.org"

gem "jekyll", "~> 4.4.1"
gem "jekyll-theme-hydejack", "~> 9.1"

# Fixes `jekyll serve` in ruby 3
gem "webrick"

# Fix GitHub Pages issue "To use retry middleware with Faraday v2.0+, install `faraday-retry` gem"
gem "faraday-retry"

# CSV support for Ruby
gem "csv"

group :jekyll_plugins do
  #gem "github-pages"
  gem "jekyll-default-layout"
  gem "jekyll-feed"
  gem "jekyll-optional-front-matter"
  gem "jekyll-paginate"
  gem "jekyll-readme-index"
  gem "jekyll-redirect-from"
  gem "jekyll-relative-links"
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
  gem "jekyll-titles-from-headings"
  gem "jekyll-include-cache"

  # Non-Github Pages plugins:
  gem "jekyll-last-modified-at"
  gem "jekyll-compose"
  gem "jekyll-timeago", "~> 0.13.1"

  # Added gems
  gem "jekyll-gist"
  gem "jekyll-avatar"
end

gem 'wdm' if Gem.win_platform?
gem "tzinfo-data" if Gem.win_platform?
