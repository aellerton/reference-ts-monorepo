# Infra

## Local development

Local development (e.g. in WSL2):

    caddy run --config local/Caddyfile

In another shell, run:

    pnpm dev

Then go to:

    https://mydemo.localhost/                 # to apps/webapp
    https://mydemo.localhost/time             # served from the Caddyfile directly
    https://mydemo.localhost/api/             # to svcs/apisvc
    https://mydemo.localhost/api/add?a=2&b=2
    https://mydemo.localhost/api/hello
    https://mydemo.localhost/api/hello?name=world

## WIP: Containers - does not yet work, do not use.

in one shell:

    docker compose up

separate window:

    cd /c/temp  # or anywhere
    docker cp local-proxy:/data/caddy/pki/authorities/local/root.crt .

Double-click the certificate file to open the Windows Certificate Import Wizard.
Click "Install Certificate" and select "Local Machine".
Choose "Place all certificates in the following store" and click "Browse".
Select the "Trusted Root Certification Authorities" store and click "OK".

A Gemini-generated diagram that may not be 100% correct:

```mermaid
flowchart TD
    subgraph WindowsHost [WINDOWS HOST - The Metal]
        direction TB

        Browser[Your Browser]
        WinNet[Windows Network Bridge<br/>Routes host.docker.internal]

        subgraph WSL2 [WSL2 Linux VM]
            direction TB
            WSL_IP[WSL2 Network Interface<br/>External IP: 172.x.x.x]

            subgraph DevEnv [Your Dev Environment]
                API[Hono Service<br/>Listening on 127.0.0.1]:::fail
                WEB[SolidJS App<br/>Listening on 127.0.0.1]:::fail
            end

            NativeCaddy[Native Caddy Process]:::success
        end

        subgraph DockerDesktop [DOCKER DESKTOP VM]
            subgraph Container
                DockerCaddy[Caddy Container]
            end
        end

        %% Happy Path (Native)
        Browser -- "https://mydemo.localhost" --> NativeCaddy
        NativeCaddy -- "localhost:3000 (Inside VM)" --> API

        %% Sad Path (Docker)
        Browser -.-> DockerCaddy
        DockerCaddy -- "host.docker.internal" --> WinNet
        WinNet -- "Forward to WSL IP" --> WSL_IP
        WSL_IP -- "BLOCKED<br/>(Process bound to 127.0.0.1 ignores external traffic)" --> API
    end

%% Styles
    classDef fail fill:#ffcccc,stroke:#cc0000,stroke-width:2px,color:black;
    classDef success fill:#ccffcc,stroke:#009900,stroke-width:2px,color:black;
```
