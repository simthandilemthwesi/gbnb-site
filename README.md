<!--
  George Bakhanyiselwa Nguwe Bawo NPC — Community Website
  Please keep this README public-facing. Never commit secrets, credentials, or private donor information.
-->

<p align="center">
  <img src="public/bakhanyiselwa_logo.png" alt="George Bakhanyiselwa Nguwe Bawo NPC logo" width="190" />
</p>

<h1 align="center">George Bakhanyiselwa Nguwe Bawo NPC Web App</h1>

<p align="center">
  <strong>Yizani Sakhe Udonga Lwe Jerusalem</strong><br />
  Guided by Faith, United in Purpose.
</p>

<p align="center">
  <a href="https://bakhanyiselwa.web.app">Visit the live website</a> ·
  <a href="https://github.com/simthandilemthwesi/gbnb-site/issues">Report a bug or request a feature</a> ·
  <a href="https://github.com/simthandilemthwesi/gbnb-site/pulls">Contribute code</a>
</p>

---

## About the project

The **George Bakhanyiselwa Nguwe Bawo NPC Web App** is the digital platform for a faith-based, community-focused nonprofit organisation. It helps visitors learn about the organisation, explore its programmes, find updates and events, and get involved through volunteering, donations, and partnerships.

The project is being shared publicly to make it easier for developers, designers, accessibility advocates, community members, and other contributors to help improve the website.

**Live website:** https://bakhanyiselwa.web.app

## What the website includes

- **Home** — organisation introduction, impact information, announcements, programmes, and testimonials.
- **About** — background, mission, vision, and organisational story.
- **Programmes** — faith and worship, coding and robotics, AI learning, digital literacy, web development, psycho-social support, and community development.
- **Gallery** — community photos, category filtering, photo submissions, and testimonials.
- **Calendar** — event and calendar information.
- **Get Involved** — volunteer, donation, and partnership pathways.
- **Contact** — contact form, contact information, map, and social links.
- **Simbot AI assistant** — a website chat assistant with guided responses and fallback behaviour.
- **Admin dashboard** — protected tools for authorised users to manage selected site content and submissions.
- **Accessibility and discovery** — responsive layouts, language translation support, and search-engine metadata.

Features that depend on external services, account configuration, Firebase rules, or a paid service tier may require additional setup before they work in a new environment.

## Technology stack

| Area | Technology |
|---|---|
| Front end | React 18, TypeScript |
| Styling | Tailwind CSS |
| Navigation | React Router |
| Backend and data | Firebase, Cloud Firestore |
| Authentication and media | Firebase Authentication and Storage |
| Hosting | Firebase Hosting |
| Additional services | Form/email integrations, Google Translate, and an AI assistant integration |

See `package.json`, `firebase.json`, `.env.example`, and the deployment guide for the current implementation details.

## Getting started

### Requirements

- Node.js and npm compatible with the dependencies in `package.json`
- Git
- A Firebase project if you need to test Firebase-backed features
- Relevant third-party accounts and configuration for integrations you want to run locally

### 1. Clone the repository

```bash
git clone https://github.com/simthandilemthwesi/gbnb-site.git
cd gbnb-site
```

If the repository has been renamed, GitHub will normally redirect the old repository URL. You can also copy the updated clone URL from the repository's **Code** menu.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy `.env.example` to a local `.env` file and fill in the values required for the services you intend to test.

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

On macOS or Linux:

```bash
cp .env.example .env
```

**Never commit your `.env` file, API keys, passwords, Firebase service-account files, private donor information, or production credentials.** Use placeholders in documentation and GitHub issues. Check the example environment file and the relevant service dashboards for configuration requirements.

### 4. Start the development server

```bash
npm start
```

The React development server is usually available at http://localhost:3000.

### 5. Build for production

```bash
npm run build
```

### Firebase deployment

The live site is hosted on Firebase. Before deploying, confirm that you have permission to access the correct Firebase project, review the current Firebase configuration and security rules, and test the production build.

The existing deployment notes are in [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md). Do not deploy changes to the organisation's production site unless you are authorised to do so.

## Project structure

```text
public/       Static assets, organisation logo, icons, SEO files
src/
  components/ Reusable UI components
  pages/      Website pages and routes
  services/   Firebase, forms, and other service integrations
  contexts/   Shared application state and authentication
  data/       Local content and data
functions/    Firebase Cloud Functions and assistant integration
.github/      GitHub project and funding configuration
```

Some folders may evolve as the project develops. Follow the existing patterns in the relevant area before introducing a new architecture.

## Contributing

Community contributions are welcome. You do not need to be an expert in every part of the stack to help.

### Ways to contribute

- Fix bugs and improve reliability.
- Improve mobile responsiveness, accessibility, and usability.
- Refine layouts, visual consistency, and content presentation.
- Improve documentation and developer onboarding.
- Add tests and improve error handling.
- Review translations and language support.
- Improve performance, SEO, and privacy-conscious analytics.
- Help identify and document issues affecting community members.

### Recommended workflow

1. **Check existing issues** before starting, to avoid duplicating work.
2. **Open an issue** for a substantial feature or major change. Describe the problem, the proposed solution, and any user impact.
3. **Fork the repository** and create a focused branch from `main`.
4. **Make a small, clearly scoped change** that follows the existing coding style.
5. **Test your work** with `npm start` and `npm run build` where possible. Include steps to reproduce a bug or screenshots for UI changes.
6. **Commit with a clear message**, such as `fix: improve mobile navigation` or `docs: clarify local setup`.
7. **Open a pull request** explaining what changed, why it is needed, how it was tested, and whether any configuration changes are required.

Pull requests may be reviewed before merging. Please be respectful, explain trade-offs, and be open to feedback.

### Before submitting a pull request

- [ ] The change is focused and clearly described.
- [ ] No secrets or private personal information are included.
- [ ] Existing behaviour has been preserved unless a change is intentional.
- [ ] The app builds successfully, or any failure is explained.
- [ ] Documentation and environment examples are updated when needed.
- [ ] UI changes have been checked on mobile and desktop where practical.

## Security and privacy

This website may process contact requests, volunteer submissions, donation-related information, photographs, and other community data.

- Never publish real credentials, access tokens, donor details, or personal information in issues, pull requests, screenshots, or commits.
- Do not weaken Firebase Authentication, Firestore rules, or Storage rules to make local testing easier.
- Do not share or commit production data.
- For a suspected security issue, avoid posting exploit details publicly. Contact the project maintainer privately through an appropriate channel.

## Reporting issues and requesting features

Use [GitHub Issues](https://github.com/simthandilemthwesi/gbnb-site/issues) to report reproducible bugs or propose improvements. Please include:

- A concise title and description
- Steps to reproduce the issue
- Expected behaviour and actual behaviour
- Browser/device details, if relevant
- Screenshots or logs with all sensitive data removed

For general questions about the organisation, use the contact details on the [live website](https://bakhanyiselwa.web.app).

## Support the project

If you find this work useful, you can help by contributing code, improving documentation, reporting issues, sharing the website, or supporting the organisation through the official channels listed on its website.

Funding links, where available, are listed in [GitHub's funding configuration](.github/FUNDING.yml). Please use official channels and verify details before making a contribution.

## Maintainer and acknowledgements

Website development: **Simthandile Mthwesi**.

Thank you to everyone who contributes time, knowledge, feedback, and care to the project and the community it serves.

## Licence

See the repository's [LICENSE](LICENSE) file for the applicable licence and conditions. Please review it before reusing or redistributing the code, branding, images, or other assets. The organisation's logo and identity should not be presented as belonging to another organisation.

---

<p align="center">
  <strong>George Bakhanyiselwa Nguwe Bawo NPC</strong><br />
  <em>Yizani Sakhe Udonga Lwe Jerusalem</em>
</p>
