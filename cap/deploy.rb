#lock "~> 3.12.1"

set :application, "goodvibes"
set :repo_url, "git@git.ktmlabs.com:clickp/goodvibes/gvadmin.git"
set :slackistrano, {
  klass: Slackistrano::CustomMessaging,
  channel: '#notifications',
  webhook: 'https://hooks.slack.com/services/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'
}
set :yarn_flags, %w(--silent --no-progress)
set :ssh_options, { forward_agent: true, auth_methods: %w(publickey) }
set :keep_releases, 2
# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp


#append :linked_files, 'src/services/api_routes/constants.js'
append :linked_files, '.env'
append :linked_dirs, 'node_modules'
# Default deploy_to directory is /var/www/my_app_name

namespace :deploy do
  task :yarn_deploy do
    on roles fetch(:yarn_roles) do
      within fetch(:yarn_target_path, release_path) do
        execute fetch(:yarn_bin), 'build:staging'
      end
    end
  end
  
  before "symlink:release", :yarn_deploy
end

