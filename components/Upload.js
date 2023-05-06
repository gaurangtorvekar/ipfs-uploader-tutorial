import React, { useState } from "react";
import { Web3Storage } from "web3.storage";
import axios from "axios";

export default function Upload() {
	const [file, setFile] = useState(null);
	const [uploading, setUploading] = useState(false);
	const [ipfsUrl, setIpfsUrl] = useState("");

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
		<div className="container">
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label htmlFor="file" className="block text-sm font-medium text-gray-700">
						Upload a file to IPFS
					</label>
					<input id="file" type="file" className="mt-1 block w-full" onChange={handleChange} />
				</div>
				<button type="submit" className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${uploading ? "opacity-50 cursor-not-allowed" : ""}`} disabled={uploading}>
					{uploading ? "Uploading..." : "Upload"}
				</button>
				{ipfsUrl && (
					<div className="mt-4">
						<p className="text-sm text-gray-600">File uploaded to IPFS:</p>
						<a href={ipfsUrl} target="_blank" rel="noreferrer" className="text-blue-500 hover:text-blue-700 underline">
							{ipfsUrl}
						</a>
					</div>
				)}
			</form>
		</div>
	);
}
