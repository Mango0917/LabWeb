require_relative 'boot'
require 'sprockets/railtie'
<% if include_all_railties? -%>
require 'rails/all'
<% else -%>
# Pick the frameworks you want:
<%= comment_if :skip_active_record %>require "active_record/railtie"
require "action_controller/railtie"
require "action_view/railtie"
<%= comment_if :skip_action_mailer %>require "action_mailer/railtie"
require "active_job/railtie"
<%= comment_if :skip_action_cable %>require "action_cable/engine"
<%= comment_if :skip_test %>require "rails/test_unit/railtie"
<%= comment_if :skip_sprockets %>require "sprockets/railtie"
<% end -%>
config.assets.initialize_on_precompile = false
Bundler.require(*Rails.groups)
require "<%= namespaced_name %>"

<%= application_definition %>
