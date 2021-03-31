set :deploy_config_path, 'cap/deploy.rb'
# default stage_config_path is 'config/deploy'
set :stage_config_path, 'cap/stages'

# Load DSL and set up stages
require "capistrano/setup"
# Include default deployment tasks
require "capistrano/deploy"
require "capistrano/scm/git"
require 'capistrano/yarn'
#require 'capistrano/nvm'
install_plugin Capistrano::SCM::Git
require 'slackistrano/capistrano'
require_relative 'lib/custom_messaging'
