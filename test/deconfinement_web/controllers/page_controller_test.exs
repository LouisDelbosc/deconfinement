defmodule DeconfinementWeb.PageControllerTest do
  use DeconfinementWeb.ConnCase

  test "GET /", %{conn: conn} do
    conn = get(conn, "/")
    assert html_response(conn, 200) =~ "A quand la lib"
  end
end
