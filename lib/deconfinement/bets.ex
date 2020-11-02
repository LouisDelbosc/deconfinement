defmodule Deconfinement.Bets do
  @moduledoc """
  The Bets context.
  """

  import Ecto.Query, warn: false
  alias Deconfinement.Repo

  alias Deconfinement.Bets.DateBets

  @doc """
  Returns the list of date_bets.

  ## Examples

      iex> list_date_bets()
      [%DateBets{}, ...]

  """
  def list_date_bets do
    Repo.all(DateBets)
  end

  def get_all_date_count() do
    DateBets
    |> group_by([bet], [bet.selected_date])
    |> select([bet], %{date: bet.selected_date, count: count(bet.id)})
    |> Repo.all()
  end

  @doc """
  Gets a single date_bets.

  Raises `Ecto.NoResultsError` if the Date bets does not exist.

  ## Examples

      iex> get_date_bets!(123)
      %DateBets{}

      iex> get_date_bets!(456)
      ** (Ecto.NoResultsError)

  """
  def get_date_bets!(id), do: Repo.get!(DateBets, id)

  @doc """
  Creates a date_bets.

  ## Examples

      iex> create_date_bets(%{field: value})
      {:ok, %DateBets{}}

      iex> create_date_bets(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_date_bets(attrs \\ %{}) do
    %DateBets{}
    |> DateBets.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a date_bets.

  ## Examples

      iex> update_date_bets(date_bets, %{field: new_value})
      {:ok, %DateBets{}}

      iex> update_date_bets(date_bets, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_date_bets(%DateBets{} = date_bets, attrs) do
    date_bets
    |> DateBets.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a date_bets.

  ## Examples

      iex> delete_date_bets(date_bets)
      {:ok, %DateBets{}}

      iex> delete_date_bets(date_bets)
      {:error, %Ecto.Changeset{}}

  """
  def delete_date_bets(%DateBets{} = date_bets) do
    Repo.delete(date_bets)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking date_bets changes.

  ## Examples

      iex> change_date_bets(date_bets)
      %Ecto.Changeset{data: %DateBets{}}

  """
  def change_date_bets(%DateBets{} = date_bets, attrs \\ %{}) do
    DateBets.changeset(date_bets, attrs)
  end
end
