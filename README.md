# Names

An Italian names lookup and filtering tool built with Svelte 5.

## Description

A web application that helps users find and filter Italian names based on various criteria. Users can search by gender, name length, and letter patterns (names containing, starting, or ending with specific letters). Each name displays ISTAT statistics showing the number of births registered in Italy with that name.

## Features

- Filter names by gender (maschile/femminile)
- Filter by name length
- Search names containing, starting, or ending with specific letters
- View ISTAT statistics for each name
- Dark/light mode support

## Tech Stack

- Svelte 5
- SvelteKit
- Tailwind CSS
- TypeScript
- Zod (validation)
- sveltekit-superforms

## Data Source

Name data is sourced from [ISTAT](https://www.istat.it/) - Istituto Nazionale di Statistica.

## Developing

```bash
npm install
npm run dev
```

## Building

```bash
npm run build
```

## Linting and Type Checking

```bash
npm run check
npm run lint
```
