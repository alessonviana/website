# Alesson Viana Blog
This is a simple website project that will be automatically deployed on a K3S cluster and made available through the [url](http://alessonviana.tech)

# Flow
The `Dockerfile` in the root of the project will copy the project's code into a Docker image.
This Docker image will in turn be built and pushed to DockerHub via GitHub Actions (You can see the pipelines file inside .github/workflows/).
The last step in the pipeline managed by GitHub Actions is to deploy this new image to our K3S cluster.

# Tools
- HTML
- CSS
- JS
- Docker
- K3S 
- GitHub Actions
- Oracle Cloud (OCI)


# Preparing:
- You must install docker in you local machine, if you are gpoing to run locally. 

# Running locally
1. clone this repo using this command: `$git clone https://github.com/alessonviana/website.git`
2. After cloning the repository enter the downloaded folder: `$cd website`
3. Now, you must build this Dockerfile, so, run this command: `$docker build -t <container_name> .`
4. After the image is built, you should run the container, so run this command: `$docker run -d -p 8080:80 <container_name>`
4. Now, access your browser and type in the search bar: `localhost:8080`