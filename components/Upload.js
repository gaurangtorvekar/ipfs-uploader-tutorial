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
		<div className="max-w-lg mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
			<form onSubmit={handleSubmit}>
				<div>
					<label className="text-gray-700 font-bold mb-2" htmlFor="file">
						Choose a file to upload
					</label>
					<div className="relative border-dashed border-2 border-gray-400 rounded-lg h-64 flex justify-center items-center">
						<div className="absolute">
							<div className="flex flex-col items-center">
								<svg className="w-10 h-10 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
								</svg>
								<span className="text-gray-400 group-hover:text-gray-600 mt-2">{file ? file.name : "Select a file"}</span>
							</div>
						</div>
						<input type="file" className="h-full w-full opacity-0" id="file" onChange={handleChange} />
					</div>
				</div>
				<button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled={!file || uploading}>
					{uploading ? "Uploading..." : "Upload"}
				</button>
			</form>
			{ipfsUrl && (
				<div className="mt-8">
					<p className="text-gray-700 font-bold">File uploaded to IPFS:</p>
					<a href={ipfsUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 break-all">
						{ipfsUrl}
					</a>
				</div>
			)}
		</div>
	);
}
