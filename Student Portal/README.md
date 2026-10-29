# Campus Connect — Student Portal

Campus Connect is a responsive student portal frontend concept designed to bring campus announcements, events, study resources, lost-and-found listings, student profile details, and support into one place.

## Features

- Responsive dashboard layout with sidebar navigation
- Announcements and campus event cards
- Mid-term examinations starting on 2 November 2026
- Student Week starting on 9 November 2026
- Three switchable colour themes: Ice Blue, Graphite & Gold, and Burgundy & White
- Study resource cards with a demo add-resource interaction
- Lost & Found board with a demo post-item interaction
- Editable demo student profile
- Support form with browser-side confirmation
- Separate login and signup pages with demo login/logout navigation
- HTML, CSS, and JavaScript organised into separate files

## Project structure

```text
Campus-Connect/
├── index.html
├── login.html
├── signup.html
├── css/
│   └── style.css
├── js/
│   ├── script.js
│   └── auth.js
├── assets/
│   └── images/
└── README.md
```

## Run locally

1. Download or clone the project.
2. Open the `Campus-Connect` folder in Visual Studio Code.
3. Open `index.html` in a browser, or use the VS Code Live Server extension.
4. Use the theme menu in the top-right corner to switch themes.

## Notes

This is a frontend prototype. Login and signup only store a demo display name in the browser; they do not authenticate a real account. Password recovery and support submission do not connect to a server. Demo interactions run in the browser and are not permanent database records. The event dates are based on the project brief and should be checked against official university notices before production use.

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript


### Demo Login
Open `login.html` first. Use username `student` and password `CUI@2026` to access the dashboard. The dashboard redirects unauthenticated visitors to the login page, and Logout ends the demo session. This is front-end-only demo authentication; do not use real passwords.
