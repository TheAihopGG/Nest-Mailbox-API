# Setup

## Windows

To install and launch Nest API on Windows:

1. Make sure that node js and npm have installed

2. Create, and append to `.env` file these parameters:

    ```typescript
    API_PASSWORD=12345 // password to admin     panel 
    APP_SETTINGS_PATH=data/appSetting.json //   path to app settings, make sure that it is existing 
    ```

3. Install packages with

    ```bash
    npm install
    ```

4. Launch server

    ```bash
    npm run startServer
    ```
