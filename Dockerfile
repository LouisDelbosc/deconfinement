FROM elixir:1.11

RUN apt-get update && apt-get upgrade -y &&  apt-get install -y \
  postgresql-client \
  curl \
  gnupg \
  inotify-tools

RUN curl -sL https://deb.nodesource.com/setup_12.x  | bash 
RUN apt-get install -y nodejs


RUN mkdir /app
COPY . /app
WORKDIR /app


RUN mix local.hex --force
RUN mix deps.get
RUN mix local.rebar --force
RUN mix do compile
RUN chmod +x entrypoint.sh
RUN cd assets && npm install

CMD ["/app/entrypoint.sh"]
