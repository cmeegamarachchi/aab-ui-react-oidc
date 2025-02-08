# Use a base image with common tools installed
FROM mcr.microsoft.com/devcontainers/typescript-node:22-bullseye

# Install Prettier, Black, and Yarn
RUN npm install --global prettier && \
    npm install --global yarn && \
    npm upgrade --global yarn

# Set the default shell
CMD [ "bash" ]
