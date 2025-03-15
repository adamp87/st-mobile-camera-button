FROM python:3.10 AS base

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV APP_HOME=/app

# Set the working directory
WORKDIR $APP_HOME

# Install Streamlit and other dependencies
RUN pip install --upgrade pip && \
    pip install streamlit


FROM base AS dev


ARG USERNAME=user
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Create the user
RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME \
    #
    # [Optional] Add sudo support. Omit if you don't need to install software after connecting.
    && apt-get update \
    && apt-get install -y sudo \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# ********************************************************
# * Anything else you want to do like clean up goes here *
# ********************************************************

# [Optional] Set the default user. Omit if you want to keep the default as root.
USER $USERNAME


FROM base AS deploy

# Copy the app files into the container
COPY . .

RUN pip install .

# Expose port 80 for Streamlit
EXPOSE 80

# Run the Streamlit application
CMD ["streamlit", "run", "example.py", "--server.port=80", "--server.address=0.0.0.0", "--browser.gatherUsageStats=false"]