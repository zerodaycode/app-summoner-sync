# APP SUMMONERS SYNC

Hi there, and welcome to the central repository of `Summoners-Sync`.

As you may know, `Summoners-Sync` is not only a cutting-edge data-analysis tool for **League of Legends**.
We're a complete player-framework that aim to level-up the player experience to the next level,
from runes, items, jungle pathings, matchups, real time feedback, AI assistance and much more!

## This repository

This repo is created to centralize and unify core procedures, code access, documentation
examples and more in a unique place, leveraring **github actions** to simplify our cloud deployment
infrastructure.

An example w'd be that this repo will allows us in the future to have some kind of hooks or events,
that when a new release of our architecture is production ready, we may have automated `PR's` in this repo
that will require the approve of our administrators to deploy whatever part of our stack in the cloud.

Also, it servers to showcast the general architecture of the application, making it accesible
for future contributors and also, as a general reminder of what we're doing were!

In these initial commits, we will aim to set up this repo with very basic tooling and
some configurations to make it easy to develop in our local-dev environments as we are building the project.

As an initial guideline, we intend this repo to look something similar to this


```
app-summoner-sync/
├── .github/
│   ├── workflows/              # GitHub Actions for deployment automation and repositories management
│   │   └── deploy-chatbot.yml
│   │   └── deploy-pre.yml
│   │   └── deploy-pro.yml
├── submodules/                 # Includes microservice repositories
│   ├── auth-server/
│   ├── api-gateway/
│   └── spa-frontend/
│   └── mob-app/
│   └── ... <others>
├── infra/                      # Infrastructure management
│   ├── docker-compose-pre.yml
│   ├── docker-compose-pro.yml
│   └── configs/
│       ├── prometheus.yml
│       ├── grafana/
│       │   └── dashboards/
│       ├── postgres/
│       │   └── init.sql
│       └── mongo/ ...
├── scripts/                    # Utility scripts
│   ├── start-dev.sh            # Starts only dev services
│   ├── start-auth.sh           # Starts auth workflows
│   └── start-all.sh            # Starts everything
├── showcase/                   # Demo videos and general documentation
│   ├── README.md
│   ├── setup.mp4
│   └── architecture-diagram.png
└── README.md
```

>NOTE: This will be varing over time, so stay tunned to not miss a thing! 

## Code, code, code!

We now, we now. You've come up looking for some really good, performant and cutting-edge code.

Given our distributed architecture, you won't find anything here. But here's the list of our artifacts
and applications repositories, as well as it's configurations organized by categories

### Frontend

- [React SPA fronted](https://github.com/zerodaycode/spa-summoners-sync.git)

### Backend

- [Api Gateway](https://github.com/zerodaycode/ag-summoners-sync.git)
- [Auth server](https://github.com/zerodaycode/mic-summoners-sync-auth-server.git)

### Mobile

### Desktop

### Decoupled procedures

## The application architecture

### A quick overview of the design and components

...
