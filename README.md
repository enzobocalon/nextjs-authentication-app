### NextJS with NextAuth Authentication App
This is my first authentication project, and therefore my first project using NextAuth!
You can clone the repo and install the dependencies using

```txt

$ yarn install

$ yarn dev

```
Set a .env file on the root of the project, and set a ID of "MONGODB_URI" with the MONGODB url that you're going to use.
With this setup you should be able to fully access the features of the project: login, register and update your data.

I look forward to learn more about authentication and NextJS/NextAuth with other projects. You can login using credentials or with Google.
To avoid conflict data in profile image, users logged in with Google can see their Google account image, but credentials user can't upload their pfp yet.
Github's, Twitter's and Facebook's providers aren't configured yet.
