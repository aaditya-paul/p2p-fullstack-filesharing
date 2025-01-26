
# P2P File Sharing App

This project is a simple Peer-to-Peer (P2P) file sharing app built using **Next.js**, **Tailwind CSS**, and custom file upload logic. It allows users to upload files, which are then made available for download via a unique URL. The file upload and download logic is designed for simplicity, but it requires specific setup for local development.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Running Locally](#running-locally)
- [Port Forwarding](#port-forwarding)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## Features
- Simple file upload interface.
- Secure file uploads and downloads.
- Unique download URL for each uploaded file.

## Prerequisites
- **Node.js** (v16 or above)
- **npm** (or **yarn**)

## Setup

### Clone the repository

```bash
git clone <repository-url>
cd p2p-file-sharing
```

### Install dependencies

```bash
npm install
# or if you're using yarn
yarn install
```

### Environment Setup

If you're setting this up locally, ensure you have an **uploads** folder in the `public` directory where uploaded files will be stored:

```bash
mkdir public/uploads
```

## Running Locally

**NOTE : ONLY DEVELOPMENT BUILD IS GOING TO WORK. THE PRODUCTION BUILD OF NEXTJS WILL NOT WORK.**

### Port Forwarding

**Important**: To run this project locally, you will need to either:
1. **Forward ports** on your local machine.
2. **Deploy to a cloud server** that can publicly expose the app to the internet.

This is necessary because the app will try to access your uploaded files from a publicly available URL. You can do this by forwarding ports on your local machine or deploying it to a cloud service.

If you're running it locally and want to expose it to the internet, you can use tools like **ngrok**, **localtunnel**, or any other method of port forwarding to make the app publicly accessible.

#### To forward ports on your local machine:
1. Open a terminal or command prompt.
2. Run the following command to forward your local port (e.g., port 3000) to a public URL:

**Example using ngrok**:
```bash
ngrok http 3000
```

Once the command runs, it will give you a publicly accessible URL, e.g., `http://random-string.ngrok.io`. You can use this URL to access your local app.

#### Running the development server:

```bash
npm run dev
# or
yarn dev
```

Once the server starts, visit `http://localhost:3000` (or the forwarded URL) in your browser to access the app.

---

## Deployment

Currently, this project is set up to run locally. I was unable to deploy it to the cloud due to funding limitations, but you can follow these steps to deploy it to any cloud service that supports Node.js (e.g., Vercel, Netlify, AWS, etc.).

1. Push the code to a Git repository (GitHub, GitLab, etc.).
2. Follow the deployment instructions for your chosen cloud service.
3. Ensure that you properly set up any necessary environment variables and file storage locations for the uploaded files.

---

## Troubleshooting

### 1. "File upload error: req.pipe is not a function"

This error occurs when the request object doesn't support the expected methods, likely due to missing or incorrect middleware configuration. Make sure to follow the steps carefully for port forwarding, as it's critical that the request is passed properly from your local machine or cloud server to the app.

### 2. "TypeError: Cannot read properties of undefined (reading 'filename')"

This error typically happens when the file upload process fails or the file is not properly parsed. Double-check your file upload logic and ensure that the correct content type headers are passed from the frontend when uploading files.

### 3. "Internal Server Error (500)"

If you're receiving a 500 error, it typically means something went wrong on the server side (e.g., the file system could not save the uploaded file). Make sure your **uploads** directory is properly configured and accessible.

---

## Final Notes

This project is a work in progress. Due to budget constraints, I was unable to deploy it to the cloud at the moment, but you can run it locally with port forwarding or on your own cloud instance.

Feel free to fork this repository, contribute, and make improvements. Contributions are welcome!
