import Config

config :deconfinement, DeconfinementWeb.Endpoint,
  server: true,
  http: [port: {:system, "PORT"}],
  url: [scheme: "https", host: "deconfinement.gigalixirapp.com", port: 443]
