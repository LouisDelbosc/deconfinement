import Config

config :deconfinement, DeconfinementWeb.Endpoint,
  server: true,
  http: [port: {:system, "PORT"}],
  url: [scheme: "https", host: "www.quandestcequonseralibre.fr", port: 443]
