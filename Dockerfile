#
# ldap-pass Dockerfile based on Ubuntu
#

# Pull base image.
FROM ubuntu:14.04

MAINTAINER TADOKORO Saneyuki saneyan@seginus.jp

# Update and upgrade default packages.
RUN apt-get update
RUN apt-get upgrade -y

# Install needless components of ldap-pass.
RUN apt-get install -y nodejs npm

# Bundle ldap-pass source code inside the Docker image.
COPY . /src

# Define working directory.
WORKDIR /src

# Setup ldap-pass.
RUN npm install
RUN npm build

# Set environment variables.
ENV HOME /root

# Expose ports.
EXPOSE 3000

CMD ["npm", "start"]
