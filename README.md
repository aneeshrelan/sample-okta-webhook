# Sample Okta Webhook

## Setting up Okta

1. Login to the Okta console
2. Click on "Create App Integration"
3. Select "API Services"
4. Provide a relevant name to the app and click on "Save"
5. Copy the "Client ID" and the "Client Secret"
6. From the main navigation, go to Security > API
7. Edit the "default" authorization server
8. Navigate to "Scopes" and click on "Add Scope"
9. Add a scope with any name for testing. Keep the checkboxes at the default state

## Running the app

1. Export the following environment variables:
   1. OKTA_DOMAIN=<PUT_OKTA_DOMAIN_HERE> (Example: `dev-xxxx.okta.com`)
   2. OKTA_CLIENT_ID=<PUT_OKTA_CLIENT_ID_HERE>
2. Run the app using `yarn start`

## Testing the webhook

1. To test the webhook, we need to obtain a valid JWT first which can be received from the Okta Auth Server
2. Use the following command to obtain a JWT from Okta

```shell
curl --location 'https://<OKTA_DOMAIN_HERE>/oauth2/default/v1/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grant_type=client_credentials' \
--data-urlencode 'client_id=<CLIENT_ID_HERE>' \
--data-urlencode 'client_secret=<CLIENT_SECRET_HERE>' \
--data-urlencode 'scope=<SCOPE_ADDED_ABOVE>' \
--data-urlencode 'issuer=https://<OKTA_DOMAIN_HERE>/'
```

3. If the provided details are correct, the response should have an `access_token`
4. Copy this and invoke the webhook route, passing the `access_token` as a "Bearer Auth" as shown belo

```shell
curl --location 'http://localhost:3000/auth/webhook' \
--header 'Authorization: Bearer <ACCESS_TOKEN_HERE' \
--header 'Content-Type: application/json' \
--data '<ANY_JSON_PAYLOAD_HERE>'
```

5. If the token is correct, you should receive a successful response, else a 401
