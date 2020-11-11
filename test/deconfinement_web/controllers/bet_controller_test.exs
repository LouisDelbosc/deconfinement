defmodule DeconfinementWeb.BetControllerTest do
  use DeconfinementWeb.ConnCase

  test "GET /api/bets empty", %{conn: conn} do
    conn = get(conn, "/api/bets")
    assert json_response(conn, 200) == []
  end

  test "GET /api/bets with one bet", %{conn: conn} do
    conn = post(conn, "/api/bets", %{"date" => "2020-12-10"})
    conn = get(conn, "/api/bets")
    assert json_response(conn, 200) == [%{"date" => "2020-12-10", "count" => 1}]
  end

  test "POST /api/bets", %{conn: conn} do
    conn = post(conn, "/api/bets", %{"date" => "2020-12-01"})
    assert [%{"date" => "2020-12-01", "count" => 1}] = json_response(conn, 200)
  end

  test "POST /api/bets with no date", %{conn: conn} do
    conn = post(conn, "/api/bets", %{"date" => ""})
    assert json_response(conn, 400) == %{"errors" => %{"date" => "Tu n'as pas rempli la date !"}}
  end

  test "POST /api/bets with date too early", %{conn: conn} do
    conn = post(conn, "/api/bets", %{"date" => "2020-11-01"})
    assert json_response(conn, 400) == %{"errors" => %{"date" => "La date est trop petite, c'est sur qu'on sera pas libre !"}}
  end

  test "POST /api/bets with date too far", %{conn: conn} do
    conn = post(conn, "/api/bets", %{"date" => "2030-11-01"})
    assert json_response(conn, 400) == %{"errors" => %{"date" => "C'est dans trop longtemps, j'espere qu'on sera libre avant."}}
  end
end
