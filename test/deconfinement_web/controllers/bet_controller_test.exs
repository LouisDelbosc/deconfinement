defmodule DeconfinementWeb.BetControllerTest do
  use DeconfinementWeb.ConnCase

  test "GET /api/bets", %{conn: conn} do
    conn = get(conn, "/api/bets")
    assert json_response(conn, 200) == [%{"bets1" => "bets1"}]
  end

  test "POST /api/bets", %{conn: conn} do
    conn = post(conn, "/api/bets", %{"date" => "2010-11-01"})
    assert [%{"selected_date" => "2010-11-01"}] = json_response(conn, 200)
  end
end
