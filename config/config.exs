# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :deconfinement,
  ecto_repos: [Deconfinement.Repo]

# Configures the endpoint
config :deconfinement, DeconfinementWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "x35QIQNidRG2Ket3hUgDz3yQ0Nh5BIwPMThzXa5h+tfYUb6LcErb65HCQ5reg4kX",
  render_errors: [view: DeconfinementWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: Deconfinement.PubSub,
  live_view: [signing_salt: "4TTQlzZ5"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
