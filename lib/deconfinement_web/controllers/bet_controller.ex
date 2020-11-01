defmodule DeconfinementWeb.BetController do
  use DeconfinementWeb, :controller
  alias Deconfinement.Bets

  def index(conn, _params) do
    json(conn, [%{"bets1" => "bets1"}])
  end

  def create(conn, %{"date" => raw_date}) do
    date = Date.from_iso8601!(raw_date)
    {:ok, _date} = Bets.create_date_bets(%{selected_date: date})
    date_bets = Bets.list_date_bets_formated()
    json(conn, date_bets)
  end
end
