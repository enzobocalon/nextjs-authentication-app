### NextJS with NextAuth Authentication App
This is my first authentication project, and therefore my first project using NextAuth!
The Vercel version doesn't have fully support to the project, since it requires a storage disk to
save images, but you can register and login using the version hosted on Vercel (just can't update your data).
You can, however, clone the repo and install the dependencies using

```txt

$ yarn install

$ yarn dev

```
Set a .env file on the root of the project, and set a ID of "MONGODB_URI" with the MONGODB url that you're going to use.
With this setup you should be able to fully access the features of the project: login, register and update your data (including your profile picture).

I look forward to learn more about authentication and NextJS/NextAuth with other projects. Hope to be able to get all providers working on the next one.
And, of course, a more concise logic and code structure.
