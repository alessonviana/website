# Alesson Viana Blog

Static personal website built with HTML, CSS and JavaScript.

## Deploy on Render

This project is prepared for Render as a Static Site through the `render.yaml` Blueprint.

Render settings:

- Service type: Static Site
- Build command: `bash scripts/build-static.sh`
- Publish directory: `dist`
- Auto deploy: enabled on each commit to the linked branch

### Deploy steps

1. Push this repository to GitHub.
2. In Render, create a new Blueprint from the repository, or create a Static Site manually.
3. If creating the Static Site manually, use:
   - Build command: `bash scripts/build-static.sh`
   - Publish directory: `dist`
4. After the first deploy, Render will serve the site from its `onrender.com` URL.

The build script copies only the public website assets into `dist/`, so repository metadata, Kubernetes manifests and source SCSS files are not published.

## Running locally

You can open `index.html` directly in a browser, or run a local static server:

```sh
python3 -m http.server 8080
```

Then access:

```text
http://localhost:8080
```

## Optional Docker workflow

The existing Docker workflow is still supported for local container testing:

```sh
docker build -t alesson-viana-site .
docker run --rm -p 8080:80 alesson-viana-site
```

Then access:

```text
http://localhost:8080
```

## Legacy infrastructure

The `Kubernetes/` manifests and GitHub Actions workflow are legacy files for the previous K3S/DockerHub deployment flow. They are not required for the Render Static Site deployment.
