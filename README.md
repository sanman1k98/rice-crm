# Rice CRM

## Development

### Prerequisites

To run the Node.js MVP app you need the following installed on your system:
- [Node.js](https://nodejs.org/en)
- [pnpm](https://pnpm.io)

#### Installing prerequisites using Homebrew on macOS

If you have [Homebrew](https://brew.sh) installed on your Mac you can install the prerequisites with the following:

```sh
brew install node pnpm
```

### Quickstart

```sh
# Clone the repository
git clone https://github.com/sanman1k98/rice-crm.git

# Change directory into cloned repo
cd crm

# Install dependencies with pnpm
pnpm install
```

### Running commands

> [!IMPORTANT]
> This project is structured as a monorepo using [pnpm workspaces](https://pnpm.io/workspaces), so you should **always run commands in the top-level directory**.

Most commands needed when developing this project are defined in the “scripts” field of the [root `package.json`](./package.json) and can be executed using `pnpm run`.

#### Start the MVP’s development server

```sh
pnpm run dev
```
