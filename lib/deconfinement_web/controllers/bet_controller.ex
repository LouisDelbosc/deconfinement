defmodule DeconfinementWeb.BetController do
  use DeconfinementWeb, :controller
  alias Deconfinement.Bets

  def send_error(conn, message) do
    conn
    |> put_status(400)
    |> json(%{errors: %{"date" => message}})
  end

  def index(conn, _params) do
    dates = Bets.get_all_date_count()
    json(conn, dates)
  end

  def create(conn, %{"date" => ""}) do
    send_error(conn, "Tu n'as pas rempli la date !")
  end

  def create(conn, %{"date" => raw_date}) do
    date = Date.from_iso8601!(raw_date)
    min_date = ~D[2020-12-01]
    max_date = ~D[2021-12-25]

    case {Date.compare(min_date, date), Date.compare(date, max_date)} do
      {:gt, _} ->
        send_error(
          conn,
          "La date est trop petite, c'est sûr qu'on sera pas libre avant le 1er décembre MINIMUM!"
        )

      {_, :gt} ->
        send_error(
          conn,
          "C'est dans trop longtemps, j'espère qu'on sera libre avant Noël prochain quand même."
        )

      _ ->
        {:ok, _date} = Bets.create_date_bets(%{selected_date: date})
        date_bets = Bets.get_all_date_count()
        json(conn, date_bets)
    end
  end
end
