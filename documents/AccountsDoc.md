# Accounts
## Overall
Accounts are a foundational part of this project. Without accounts, there is nothing to share. Accounts give users a wide variety of customization options over not having an account. With an account, users can share, favorite, and upload text files. When a user signs in we they will be passed a JSON Web Tokens that will authenticate a user's actions. When a token expires, the user will be prompted to sign back in.

## JWT
- **What verification algoirthm should be used?**
    - Asymmetric to avoid sharing private keys 
- **What is the flow?**
    - User logs in
    - Server validates credentials
    - Server creates and signs a JWT and passes back token `Authorization: Bearer JWT`
    - Client stores the JWT 
        - Storing in Local/Session storage leaves it prone to XSS attack
        - Storing in Cookies leads to CSRF attack
            - We can mitigate this with `SameSite=Strict`
            - `SameSite=Strict` prevents a cookie from being used cross site
    - Client makes a request `/file Authorization: Bearer JWT` 
    - Server validates the signature
    - Server processes request and sends information back

## Signing up
Signing up is very easy, just click the signing up button, enter the sign up details, click sign up and bam! 

### Requirements
- Users must enter a username, password, and email
    - Emails and usernames are unique
- Entering a phone number is optional
- Users can close the sign up modal with either the escape key or close button
- After signing up, the user should be automatically logged in

## Signing in
Prior to signing in, users should have a view only mode of the page.

### Requirements
- Users must enter a username and password
- Users can close the sign in modal with either the escape key or close button
- If a user is signed in, the sign in and sign up options should be hidden