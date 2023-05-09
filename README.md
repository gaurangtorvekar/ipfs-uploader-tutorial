# Tutorial: Building an IPFS File Uploader with NextJS and web3.storage

## Step-by-step guide to building a decentralized file uploader with NextJS and IPFS

**Overview:**
In this tutorial, you will learn how to build a simple web application using NextJS and Tailwind CSS, allowing users to upload files to IPFS (InterPlanetary File System) using web3.storage.

**Introduction:**
As web3 technology continues to evolve and gain popularity, there has been a growing need for tools and platforms to make it easier for developers to build decentralized applications (DApps). Next.js and web3.storage can significantly simplify building web3 DApps.
By combining Next.js and Tailwind CSS, developers can quickly build web applications that are both performant and beautiful. In this tutorial, we'll build a simple file uploader using these technologies.

**Code:**
If you don't want to follow along, you can find the whole code for this tutorial in this Github repo.

**Requirements:**

- Basic knowledge of JavaScript, React, and NextJS
- Node.js and npm installed on your computer
- A web3.storage account and API key

**Steps:**

1. Set up the NextJS project and Tailwind CSS
2. Install the necessary packages
3. Configure web3.storage
4. Create an Upload component
5. Implement the upload functionality
6. Display the uploaded file's IPFS URL

### Step 1: Set up the NextJS project and Tailwind CSS

First, create a new NextJS project by running the following command:

```
npx create-next-app ipfs-uploader
cd ipfs-uploader
```

Next, set up Tailwind CSS by following the official installation guide.

### Step 2: Install the necessary packages

Install the required packages for this tutorial:

```
npm install web3.storage
npm install axios
```

### Step 3: Configure web3.storage

This tutorial will use web3.storage to upload your files to IPFS. Go to https://web3.storage/, create an account there, and get an API key.

Create a .env.local file in the root of your project and add your web3.storage API key:

```
NEXT_PUBLIC_WEB3_STORAGE_API_KEY=your_api_key_here
```

### Step 4: Create an Upload component

Create a new folder at the root of our project called components.

Create a new file called Upload.js in the components folder and add the following code:

```
import React, { useState } from 'react';
import { Web3Storage } from 'web3.storage';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [ipfsUrl, setIpfsUrl] = useState('');

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      return;
    }

    setUploading(true);

    const client = new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3_STORAGE_API_KEY });
    const cid = await client.put([file]);
    const url = `https://dweb.link/ipfs/${cid}`;

    setIpfsUrl(url);
    setUploading(false);
  };

  return (
    <div className="max-w-lg mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit}>
        <div>
          <label className="text-gray-700 font-bold mb-2" htmlFor="file">
            Choose a file to upload
          </label>
          <div className="relative border-dashed border-2 border-gray-400 rounded-lg h-64 flex justify-center items-center">
            <div className="absolute">
              <div className="flex flex-col items-center">
                <svg
                  className="w-10 h-10 text-gray-400 group-hover:text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  ></path>
                </svg>
                <span className="text-gray-400 group-hover:text-gray-600 mt-2">
                  {file ? file.name : 'Select a file'}
                </span>
              </div>
            </div>
            <input
              type="file"
              className="h-full w-full opacity-0"
              id="file"
              onChange={handleChange}
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={!file || uploading}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      {ipfsUrl && (
        <div className="mt-8">
          <p className="text-gray-700 font-bold">File uploaded to IPFS:</p>
          <a
            href={ipfsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
          >
            {ipfsUrl}
          </a>
        </div>
      )}
    </div>
  );
}
```

### Step 6: Display the uploaded file's IPFS URL

After the Upload button, add the following code to display the uploaded file's IPFS URL:

```
{ipfsUrl && (
  <div className="mt-4">
    <p className="text-sm text-gray-600">File uploaded to IPFS:</p>
    <a
      href={ipfsUrl}
      target="_blank"
      rel="noreferrer"
      className="text-blue-500 hover:text-blue-700 underline"
    >
      {ipfsUrl}
    </a>
  </div>
)}
```

### Step 7: Add the Upload component to the homepage

Now that you have created the Upload component, import it and use it in your pages/index.js file:

```
import Head from 'next/head';
import Upload from '../components/Upload';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>IPFS File Uploader</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-2xl text-center font-semibold mb-4">
          IPFS File Uploader using NextJS, Tailwind CSS, and web3.storage
        </h1>
        <Upload />
      </main>
    </div>
  );
}
```

### Run the application

Start your development server by running the following command:

```
npm run dev
```

Open your browser and go to http://localhost:3000. You should now see the file upload form. Select a file, click "Upload," and the file will be uploaded to IPFS using web3.storage. Once the upload is complete, the IPFS URL will be displayed.

That's it! You have successfully built a NextJS application with Tailwind CSS for uploading files to IPFS using web3.storage. You can customize the application, add more features, or deploy it to a hosting provider such as Vercel.
