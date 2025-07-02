# 0.4 - Diagram

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: User writes a new note and clicks 'Save'

    browser->>server: POST /new_note with note content
    activate server
    server-->>browser: 302 Redirect to /notes
    deactivate server

    Note right of browser: Browser reloads the page

    browser->>server: GET /notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET /main.css
    server-->>browser: CSS file

    browser->>server: GET /main.js
    server-->>browser: JavaScript file

    browser->>server: GET /data.json
    server-->>browser: JSON with updated notes

    Note right of browser: JavaScript renders updated note list
