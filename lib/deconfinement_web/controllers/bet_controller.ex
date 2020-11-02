defmodule DeconfinementWeb.BetController do
  use DeconfinementWeb, :controller
  alias Deconfinement.Bets

  def index(conn, _params) do
    dates = Bets.get_all_date_count()
    json(conn, dates)
  end

  def create(conn, %{"date" => raw_date}) do
    date = Date.from_iso8601!(raw_date)
    {:ok, _date} = Bets.create_date_bets(%{selected_date: date})
    date_bets = Bets.get_all_date_count()
    json(conn, date_bets)
  end
end
