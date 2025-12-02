
# Recording


Code and Api documentation walkthough
https://www.loom.com/share/33cac7b13a364afa9a490f8467c7da66


Api testing recording
https://www.loom.com/share/8557df6675444089929e540a3dc656b8

----
----


### deployed URL
```
droolm-production.up.railway.app
```
-----
-----

### Postman API documentation
```
https://documenter.getpostman.com/view/14572323/2sB3dMwqts
```
----
----

### Flow
- register/login
- update preference
- update user
- get suggested users
- like/dislike
- get matched users
- chat

----
----

### NOTE
- After registering we will need to verify phone number.The default otp is 123456.We directly generate the otp. Hoewever i have also added an endpoint to generate otp.

- Inorder to upload profile image , we will first need to generate signed url from `generate-url-profile-img` endpoint and then upload the image to that url usig PUT method and then call `profile-img-success` endpoint to update the profile picture url in the database.

- We need to seed the travel categories first by calling `seed-travel` endpoint.