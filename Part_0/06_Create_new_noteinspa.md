# New Note in Single Page App (SPA)

```mermaid
sequenceDiagram
    autonumber
    participant User as 👤 User
    participant Browser as 🌐 Browser (JS Runtime)
    participant Server as 🖥️ Server

    Note over User,Browser: User is on SPA page and types a note

    User->>Browser: Submits the note form
    Note right of Browser: JS intercepts using e.preventDefault()

    Browser->>Browser: Create note object (content + date)
    Browser->>Browser: Add note to local note array
    Browser->>Browser: Call redrawNotes() to update DOM

    Note right of Browser: Page updates instantly (no reload)

    Browser->>Server: POST /new_note_spa with JSON
    activate Server
    Server-->>Browser: 201 Created
    deactivate Server

    Note over Browser: Nothing else happens — browser remains on same page
    Note over User,Browser: New note appears instantly on screen
