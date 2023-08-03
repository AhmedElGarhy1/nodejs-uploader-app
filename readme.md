# Uploader

- this application is built with nodejs specifically with the `net` module in nodejs that details with the lowest level that nodejs can reach
- The application is made with just built-in modules without any third-party lib
- You can send any file from your machine to another machine using this application

## How to install it

As I said the application isn't using any third-party library so the installation is straightforward process

```sh
    # Just clone the repo
    git clone https://github.com/AhmedElGarhy1/nodejs-uploader-app.git

    # Go to the directory
    cd nodejs-uploader-app
```

## How to start and use

- to start the application you will need at least `two` terminals
  - a server to send the files to
  - a client/clients to send the data from

**_Keep in mind you can you this application in two seprated machines/computers and it will just fine_**
**_all the uploaded files will go to the storage folder_**

1. Open the first terminal and run

```sh
    # It listen by default on port 8000
    node server.js
```

2. next open another terminal to make a client

```sh
    # It connects by default on port 8000
    # At the third argument you need to put the filepath there to send to the server
    node client.js [:filepath]
```

Now you are sending this file to the server and it will be stored in storage
