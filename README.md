# CRM

## Development

### Prerequisites

- [Node.js](https://nodejs.org/en)
- [pnpm](https://pnpm.io)

### Quickstart

```sh
# Clone the repository
git clone https://github.com/sanman1k98/crm.git

# Change directory into cloned repo
cd crm

# Install dependencies with pnpm
pnpm install
```

### Running commands

> [!NOTE]
> This project is structured as a monorepo using [pnpm workspaces](https://pnpm.io/workspaces), so you should **always run commands in the top-level directory**.

Most commands needed when developing this project are defined in the “scripts” field of the [root `package.json`](./package.json) and can be executed using `pnpm run`.

#### Start the MVP’s development server

```sh
pnpm run dev:mvp
```

