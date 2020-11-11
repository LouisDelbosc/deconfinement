defmodule Deconfinement.BetsTest do
  use Deconfinement.DataCase

  alias Deconfinement.Bets

  describe "date_bets" do
    alias Deconfinement.Bets.DateBets

    @valid_attrs %{selected_date: ~D[2010-04-17]}
    @update_attrs %{selected_date: ~D[2011-05-18]}
    @invalid_attrs %{selected_date: nil}

    def date_bets_fixture(attrs \\ %{}) do
      {:ok, date_bets} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Bets.create_date_bets()

      date_bets
    end

    test "list_date_bets/0 returns all date_bets" do
      date_bets = date_bets_fixture()
      assert Bets.list_date_bets() == [date_bets]
    end

    test "get_date_bets!/1 returns the date_bets with given id" do
      date_bets = date_bets_fixture()
      assert Bets.get_date_bets!(date_bets.id) == date_bets
    end

    test "create_date_bets/1 with valid data creates a date_bets" do
      assert {:ok, %DateBets{} = date_bets} = Bets.create_date_bets(@valid_attrs)
      assert date_bets.selected_date == ~D[2010-04-17]
    end

    test "create_date_bets/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Bets.create_date_bets(@invalid_attrs)
    end

    test "update_date_bets/2 with valid data updates the date_bets" do
      date_bets = date_bets_fixture()
      assert {:ok, %DateBets{} = date_bets} = Bets.update_date_bets(date_bets, @update_attrs)
      assert date_bets.selected_date == ~D[2011-05-18]
    end

    test "update_date_bets/2 with invalid data returns error changeset" do
      date_bets = date_bets_fixture()
      assert {:error, %Ecto.Changeset{}} = Bets.update_date_bets(date_bets, @invalid_attrs)
      assert date_bets == Bets.get_date_bets!(date_bets.id)
    end

    test "delete_date_bets/1 deletes the date_bets" do
      date_bets = date_bets_fixture()
      assert {:ok, %DateBets{}} = Bets.delete_date_bets(date_bets)
      assert_raise Ecto.NoResultsError, fn -> Bets.get_date_bets!(date_bets.id) end
    end

    test "change_date_bets/1 returns a date_bets changeset" do
      date_bets = date_bets_fixture()
      assert %Ecto.Changeset{} = Bets.change_date_bets(date_bets)
    end
  end
end
