---
layout: post
title: "Octopress Markdown Parsers"
date: 2013-10-07 21:19
comments: true
categories: 
---

### RedCarpet
[Installation and Configuration](http://yangsu.github.io/blog/2012/10/11/using-octopress-with-github-flavored-markdown-redcarpet/)

_config.yml

>  markdown: redcarpet
>  redcarpet:
>    extensions: ["hard_wrap", "superscript", "footnotes", "no_intra_emphasis", "fenced_code_blocks", "autolink", "strikethrough", "with_toc_data"]


Gemfile

>  source "https://rubygems.org"
>
>  group :development do
>    gem 'redcarpet', '~> 2.1.1'
>    ...

CONS:
- unable to get footnotes to work as described on their blog.
- Github Flavored Markdown's task list support doesn't work.


PRO:
- more like Github Flavored Markdown, but not exactly

### Kramdown and CodeRay
[Installation and Configuration](http://blog.codebykat.com/2013/05/23/gorgeous-octopress-codeblocks-with-coderay/)

removed from Gemfile
  gem 'rdiscount', '~> 2.0.7'

Copied in all of the changes except the captions.
Created the _coderay-github.scss file
Changed the _styles.scss and _syntax.scss
All of the details are available by following the link in the code snippets to go to the github account.
Push the changes to github. `git push origin source`

CONS:
- more file changes required to setup this way
- cant use triple backticks ```
- specifying the code highlighting is awkward: `{:lang="ruby"}`


### Questions:
- Do either of these have support for shell formatting?
- How do I render a multi-line code block in a table?


=========
### Testing

``` ruby
def ruby?
  puts "I hope so"
end
```

~~Mistaken text.~~
www.google.com

This is a sentence.<sup id="fnref-1"><a href="#fn-1" class="footnote-ref">1</a></sup>with a hardcoded footnote, because stupid octopress doesnt work with PHP style footnotes.

here is some intervening text

[^1]: This is a footnote.


Roses are red
Violets are blue

<a id="fn-1" href="#fnref-1" class="footnote-backref">&#8617;</a>A hard coded footnote

perform_complicated_task
do_this_and_do_that_and_another_thing

- [x] @mentions, #refs, [links](), **formatting**, and <del>tags</del> supported
- [x] list syntax required (any unordered or ordered list supported)
- [x] this is a complete item
- [ ] this is an incomplete item

### Installed using Homebrew
    homebrew install rbenv
    homebrew install ruby-build
    homebrew install rbenv-gem-rehash

##### Additional Plugins

* rbenv-env

  Code | Text
  --- | ---
  mkdir /usr/local/var/rbenv/plugins
  git clone https://github.com/ianheggie/rbenv-env.git | explanatory text goes here.
