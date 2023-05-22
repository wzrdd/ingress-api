# Ingress-API

## Project Dependencies

- NPM
- Docker

## Installation

Install project packages:

```
npm install
```

Run docker-compose:

```
docker-compose --env-file .env -f dockerfiles/docker-compose.yml up --remove-orphans
```

Note: `--remove-orphans` is optional, but recommended. `--env-file` is mandatory.

## Running

### Running at dev enviroment

```
npm run dev
```

### Running at prod

```
npm run start
```
