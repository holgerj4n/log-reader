# Log Reader

This service provides a REST API to retrieve log entries. The following features are supported:

- List the names of all available log files
- Retrieve the most recent events for a given file

The project is implemented using TypeScript, Node.js and Express.

## Setup

To install and run the application you will need Node.js and NPM. If you do not have those tools installed, I recommend using [Node Version Manager](https://github.com/nvm-sh/nvm).

```bash
# Install the dependencies
$ npm install

# Compile the code
$ npm run compile

# Start the service
$ npm run start
```

By default the service will read log files from the `/var/log` directory. This can be changed by providing a command-line argument or environment variable.

```bash
$ npm run start /my/log/dir

$ LOG_DIR=/my/log/dir npm run start
```

## Usage

1. List all available log files

```bash
$ curl -i 'http://localhost:3000/files'
```

2. Retrieve the most recent log events

```bash
$ curl -i 'http://localhost:3000/logs/<filename>'

# Specify the number of entries to retrieve
$ curl -i 'http://localhost:3000/logs/<filename>?limit=50'

# Filter entries based on a keyword
$ curl -i 'http://localhost:3000/logs/<filename>?search=keyword'
```

## Tests

```bash
$ npm test
```
