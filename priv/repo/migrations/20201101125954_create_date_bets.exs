defmodule Deconfinement.Repo.Migrations.CreateDateBets do
  use Ecto.Migration

  def change do
    create table(:date_bets) do
      add :selected_date, :date

      timestamps()
    end
  end
end
