# SPA (Single Page App) Diagram

```mermaid
sequenceDiagram
    participant Browser
    participant Server

    Browser->>Server: GET /spa
    activate Server
    Server-->>Browser: HTML document (SPA shell)
    deactivate Server

    Browser->>Server: GET /main.css
    activate Server
    Server-->>Browser: CSS file
    deactivate Server

    Browser->>Server: GET /main.js
    activate Server
    Server-->>Browser: JavaScript file
    deactivate Server

    Note left of Browser: The browser parses and executes main.js

    Note right of Browser: JavaScript starts running React app

    Browser->>Server: GET /data.json
    activate Server
    Server-->>Browser: JSON data of all existing notes
    deactivate Server

    Note right of Browser: JavaScript renders the note list in the DOM without reloading the page

    Note over Browser: User sees the notes on the page instantly — it's a true single-page experience.
