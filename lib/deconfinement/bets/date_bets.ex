defmodule Deconfinement.Bets.DateBets do
  use Ecto.Schema
  import Ecto.Changeset

  schema "date_bets" do
    field :selected_date, :date

    timestamps()
  end

  @doc false
  def changeset(date_bets, attrs) do
    date_bets
    |> cast(attrs, [:selected_date])
    |> validate_required([:selected_date])
  end
end
