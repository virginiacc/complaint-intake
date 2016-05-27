# Complaint Intake

This project improves the online forms used by consumers to submit complaints about the financial marketplace. It is currently in the initial discovery phase of development.

- **Status**:  Alpha [CHANGELOG](/CHANGELOG.md)


----

## Dependencies

- [Node](http://nodejs.org) and [npm (Node Package Manager)](https://www.npmjs.com): Used for downloading and managing front-end dependencies and assets.
- [Python](https://www.python.org/): Used to run a simple web server.

## Installation

Using the console, navigate to your project directory (`cd ~/Projects` or equivalent). Clone this project’s repository and switch to its directory with:

```bash
git clone git@github.com:cfpb/complaint-intake.git
cd complaint-intake
```
Then, run the setup script:

```bash
./setup.sh
```

## Development

Once the setup finishes, you can start developing.

First, open a **server** tab in your terminal and run:

```bash
python -m SimpleHTTPServer
```

Open a **gulp** tab in your terminal and run:

```bash
gulp watch
```

That should open a tab in your browser that points to `http://localhost:3000/dist/`. Go to the `v0/` directory there to see the current iteration.

Do all your development on the files in `/src/`. Your browser should automatically refresh the page as you make changes to anything in `/src/`.

Currently, the code lives in `/src/` and references legacy assets in `/src/v0/`. All the pages in there are being iteratively refactored to be more standard Capital Framework pages. Refactored JS and CSS will get moved to `/src/static/`.

## Open source licensing info
1. [TERMS](TERMS.md)
2. [LICENSE](LICENSE)
3. [CFPB Source Code Policy](https://github.com/cfpb/source-code-policy/)

