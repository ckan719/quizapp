# Use the official image as a parent image.
FROM python:3.6-slim

# Run the command inside your image filesystem.
RUN apt-get update
RUN apt-get install -y libpq-dev python3-dev build-essential postgresql-server-dev-all

# Set the working directory.
WORKDIR /app

COPY requirements.txt /app

#install any needed
RUN pip install --trusted-host pypi.python.org -r requirements.txt


#Copy the current directory contents into the container at /app
COPY . /app

# Add metadata to the image to describe which port the container is listening on at runtime.
EXPOSE 5000

# Run the specified command within the container.
CMD [ "python", "app.py" ]
