defmodule DeconfinementWeb.BetControllerTest do
  use DeconfinementWeb.ConnCase

  test "GET /api/bets empty", %{conn: conn} do
    conn = get(conn, "/api/bets")
    assert json_response(conn, 200) == []
  end

  test "GET /api/bets with one bet", %{conn: conn} do
    conn = post(conn, "/api/bets", %{"date" => "2020-11-01"})
    conn = get(conn, "/api/bets")
    assert json_response(conn, 200) == [%{"date" => "2020-11-01", "count" => 1}]
  end

  test "POST /api/bets", %{conn: conn} do
    conn = post(conn, "/api/bets", %{"date" => "2020-11-01"})
    assert [%{"date" => "2020-11-01", "count" => 1}] = json_response(conn, 200)
  end
end
