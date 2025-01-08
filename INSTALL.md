# Setup

## 🪟 Windows

To install and launch Nest API on Windows:

1. Download the [latest release](https://github.com/TheAihopGG/Nest-Mailbox-API/releases/latest) for windows.

2. Make sure that node js and npm have installed

3. Create, and append to `.env` file these parameters:

    ```typescript
    API_PASSWORD=12345 // password to admin panel 
    APP_SETTINGS_PATH=data/appSetting.json // path to app settings, make sure that it is existing
    ```

4. Install packages with

    ```bash
    npm install
    ```

5. Launch server

    ```bash
    npm run server
    ```
