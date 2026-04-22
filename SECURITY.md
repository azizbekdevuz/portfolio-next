# Security policy

## Scope

This policy applies to the **portfolio-next** codebase as published in this repository: the **Next.js** app, **API routes** under `src/app/api/`, **middleware**, and **client-exposed** configuration (e.g. public env keys used in the browser).

**Out of scope** for this policy (report them to the relevant vendor instead):

- Vulnerabilities in **hosting** (Vercel, DNS, certificates) unless they stem from a misconfiguration **documented in this repo**.
- **npm** dependency issues—use `npm audit` and Dependabot; critical supply-chain issues may still be worth a private heads-up.
- **Third-party** services (EmailJS, external sites embedded in iframes) under their own security programs.

## How to report

- **Public GitHub repository**: use **[GitHub Security advisories / private reporting](https://docs.github.com/en/code-security/security-advisories)** if the feature is enabled for this repo, **or** email the maintainer at **azizbek.dev.uz@gmail.com** with subject line containing `[security]`.
- **Do not** open a public issue for undisclosed exploitable details. A short, non-technical “there may be an issue in X” is OK to triage; technical details go in a private channel.

## What to include

- Affected area (e.g. route, component, or dependency).
- Steps to reproduce, or a proof-of-concept, if safe to share.
- Suggested fix (optional).

## What to expect

This is a **side-project** portfolio, not a staffed product team. The maintainer will make a **best-effort** read of valid reports, but there are **no guaranteed** response or fix timelines. Severe, easy-to-ship issues will be prioritized.

## Safe harbor

If you make a good-faith effort to avoid privacy violations, data destruction, and service disruption, the maintainer will not pursue legal action for research that follows this process.
