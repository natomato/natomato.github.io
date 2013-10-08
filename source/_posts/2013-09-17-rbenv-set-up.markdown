---
layout: post
title: "Switching to rbenv"
date: 2013-09-17 17:29
comments: true
categories: reference 
description: homebrew configuration settings on lion 10.8
---


### Installed using Homebrew
    homebrew install rbenv
    homebrew install ruby-build
    homebrew install rbenv-gem-rehash

##### Additional Plugins

* rbenv-env

    ~~~
    mkdir /usr/local/var/rbenv/plugins
    git clone https://github.com/ianheggie/rbenv-env.git
    ~~~

    `rbenv env` to see environment variables

* rbenv-binstubs

  ~~~
  mkdir -p ~/.rbenv/plugins
  git clone https://github.com/ianheggie/rbenv-binstubs.git 
  ~~~

  Then for each application directory run the following

  ~~~
  bundle install --binstubs .bundle/bin 
  rbenv rehash
  ~~~

  Now you don't need to type `bundle exec` before typing a command, like `rake`
  
  `rbenv which COMMAND` to confirm that the bundler binstub is being used 

  `bundle show GEM` to show which gem bundle will use 


### Homebrew Dirs

It stores shims in `/usr/local/var/rbenv/shims`
It stores programs in `/usr/local/Cellar/`
It does not use the default shims folder `~/.rbenv`


### To Use rbenv
Example Usage installing Ruby 2.0 for the first time

~~~
rbenv install 2.0.0-p247
rbenv versions
rbenv local 2.0.0-p247
rbenv versions
gem install bundler pg rails thin --no-rdoc --no-ri
bundle install --binstubs .bundle/bin
rbenv rehash
~~~

### Errors
Error: `rbenv: version '1.9.3' is not installed`
Solution: `rbenv local 1.9.3-p392`



### Miscellaneous Info
Source: http://robots.thoughtbot.com/post/47273164981/using-rbenv-to-manage-rubies-and-gems

Install your preferred version of Ruby and set it as the global default:

~~~
rbenv install 1.9.3-p392
rbenv global 1.9.3-p392
~~~

Update to the latest Rubygems version:
    `gem update --system`

Install gems critical to Rails development, e.g.
    `gem install bundler pg rails thin --no-rdoc --no-ri`

You can set project-specific Ruby and gem versions by running the rbenv local command within your project directory:
    `rbenv local 1.9.3-p385`

From https://github.com/sstephenson/rbenv
    `rbenv local`

Sets a local application-specific Ruby version by writing the version name to a .ruby-version file in the current directory. This version overrides the global version, and can be overridden itself by setting the `RBENV_VERSION` environment variable or with the rbenv shell command.

    $ rbenv local 1.9.3-p327

The ruby-build plugin provides an rbenv uninstall command to automate the removal process.

To later update these installs, use upgrade instead of install.

    $ rbenv install 2.0.0-p247

The `--unset` option will unset the Ruby currently assigned to a scope, letting the Ruby from the lower precedence scope show through.
