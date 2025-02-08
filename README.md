# aab-ui-react-oidc
appsolve application framework react starter kit with open-id-connect authentication support

## Getting Started
`aab-ui-react-oidc` offers Visual Studio DevContainer support, enabling seamless setup in containerized environments. To get started:
1. Clone the repository using a DevContainer or directly to your working directory.
2. Configure your IDP paramaters via environment variables. Following environment variables are to be set as a minimum
    * `VITE_OIDC_AUTHORITY` : Sets authority. 
        * For Entra, `"https://login.microsoftonline.com/[TENENT_ID]/v2.0"`. 
        * For cognito `"https://cognito-idp.ap-southeast-2.amazonaws.com/[USER_POOL_ID]"`
    * `VITE_OIDC_CLIENT_ID`
        * For Entra, `"[APP_CLIENT_ID]"`. 
        * For cognito `"[APP_CLIENT_ID]"`    
    * `VITE_OIDC_REDIRECT_URI`: Apps redirect url. Generally this would be something like `"http://localhost:8000"`    
    * `VITE_OIDC_SCOPE`: Define a list of application scopes. For entra, remember to add `"[APP_CLIENT_ID]/.default"`
        * For Entra, `"openid profile email fa966437-8284-4257-b497-4d30a7e7e1f1/.default`. 
        * For cognito `"email openid phone"`    
3. Run following commands:  
    * `npm run dev` to start the application in development mode
    * `npm run build` to create a production-ready build of the application

## Layouts
`aab-ui-react` includes the following layout:

### SideNavLayout
A customizable layout featuring single-level navigation. Navigation is configured using a JSON structure, offering flexibility and ease of use.
To explore layouts in detail, run the Storybook tool provided with the project.

## Providers
The `ConfigurationProvider` enables efficient application-wide configuration management. It works seamlessly with the useConfiguration hook, ensuring updated configurations are automatically persisted to local storage for a smooth user experience.

## Hooks
`useHttp` provides various methods and props to interact with http endpoints. This hook can be direcly used in components or in other hooks  
