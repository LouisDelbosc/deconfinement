defmodule Deconfinement.Repo do
  use Ecto.Repo,
    otp_app: :deconfinement,
    adapter: Ecto.Adapters.Postgres
end
