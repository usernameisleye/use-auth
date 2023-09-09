# USE_AUTH API Documaentation

## API Base

```
...
```
All API Methods support only POST Requests.

## Authentication
This API doesn't require any Authentication.

## Usage

### Sign Up
```
/signup
```
Use this route to create/sign up a user

#### Example Response
```
{
    "response": "User signed up",
    "success": true,
    "data": {
        "email": "usernmail@gmail.com",
        "username": "the_dev"
    }
}
```

### Sign In
```
/signin
```
Use this route to authenticate/sign in a user

#### Example Response
```
{
    "response": "User signed in",
    "success": true,
    "data": {
        "email": "usernmail@gmail.com",
        "username": "the_dev"
    }
}
```

### Sign In
```
/signin
```
Use this route to authenticate/sign in a user

#### Example Response
```
{
    "response": "User signed in",
    "success": true,
    "data": {
        "email": "usernmail@gmail.com",
        "username": "the_dev"
    }
}
```

### Forgot Password
```
/forgot-password
```
Route send a OTL(One Time Link) to users email to reset password

#### Example Response
```
{
    "response": "Success",
    "success": true,
    "data": {
        "msg": "Password Reset Link has been sent to your email",
        "OTL": "localhost:5050/api/user/reset-password?id=646d5aeba2c90b634b46f1ed&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDZkNWFlYmEyYzkwYjYzNGI0NmYxZWQiLCJpYXQiOjE2OTQyNjQxMzksImV4cCI6MTY5NDI2NDczOX0.ydCzR4JvmVWFQkl8T6RbBp2L0FrqD5GIdZdnu3t9DpA"
    }
}
```

### Reset Password
```
/reset-password
```
Redirected route for users to finally reset thier passwords

#### Example Response
```
{
    "response": "Success",
    "success": true,
    "data": {
        "msg": "Password reset successfully"
    }
}
```

## Contact
If you need help using this API, have feature request or want to have extended functionality, feel free to contact via email:
```
adeleyeadesida@gmail.com
```
