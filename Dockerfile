#
# ldap-pass Dockerfile based on Ubuntu.
#

# Pull base image.
FROM trenpixster/elixir:latest

MAINTAINER TADOKORO Saneyuki saneyan@seginus.jp

# Bundle ldap-pass source code inside the Docker image.
ADD . /src

# Define working directory.
WORKDIR /src

# Set environment variables.
ENV HOME /root

# Expose ports.
EXPOSE 80

# Start HTTPS server with NodeJS.
CMD ["bash"]
