defmodule DeconfinementWeb.PageController do
  use DeconfinementWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
