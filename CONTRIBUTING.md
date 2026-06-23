# Contributing to FinFlow

First off, thank you for considering contributing to FinFlow! It's people like you that make FinFlow such a great tool for tracking financial milestones and loans.

## Where do I go from here?

If you've noticed a bug or have a feature request, make sure to check our [Issues](../../issues) to see if someone else has already raised it. If not, feel free to open a new issue.

## Setting up your environment

1. Fork the repo and create your branch from `main`.
2. Run `npm install` or `pnpm install` to install dependencies.
3. Create a `.env` file based on `.env.local` or `.env.example` if available.
4. Setup your local database by running `npx prisma db push` or `npx prisma migrate dev`.
5. Run the development server with `npm run dev`.

## Making Changes

* Create a new branch for your feature or bug fix: `git checkout -b feature/your-feature-name`
* Write your code, ensuring it adheres to our existing code style (we use ESLint and Prettier).
* Test your changes thoroughly.
* Commit your changes with descriptive commit messages.

## Submitting a Pull Request

1. Push your branch to your fork.
2. Open a Pull Request against the `main` branch of the FinFlow repository.
3. Describe your changes in detail in the PR description.
4. A maintainer will review your code and may suggest some changes before merging.

## Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.
