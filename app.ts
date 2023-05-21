import 'dotenv/config'
import "reflect-metadata"; // needed by typeorm on main file

import Repository from "./src/repository";
import Service from "./src/service";
import Delivery from "./src/delivery";

const postgresHost = String(process.env.POSTGRES_HOST);
const postgresPort = Number(process.env.POSTGRES_PORT);
const postgresUsername = String(process.env.POSTGRES_USER);
const postgresPassword = String(process.env.POSTGRES_PASSWORD);
const postgresDatabase = String(process.env.POSTGRES_DB);

const postgres = new Repository.Postgres(
  postgresHost,
  postgresPort,
  postgresUsername,
  postgresPassword,
  postgresDatabase
)
postgres.init();

const service = new Service(postgres);

const server = new Delivery(service);

server.start(3300);
