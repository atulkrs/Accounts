import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reports = () => {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUploads = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/mis/all-upload-mis"
      );
      setFiles(res.data);
    };

    fetchUploads();
  }, []);

  return (
    <div className='p-8 bg-gray-100 min-h-screen'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-bold'>Uploaded CSV/Excel Files</h2>
        <button
          onClick={() => navigate(-1)} // ← Go back to previous page
          className='bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md shadow'
        >
          ← Back
        </button>
      </div>

      <table className='min-w-full bg-white rounded shadow'>
        <thead>
          <tr className='bg-gray-200 text-left text-sm font-semibold'>
            <th className='p-4'>Original Name</th>
            <th className='p-4'>Stored Name</th>
            <th className='p-4'>Uploaded At</th>
            <th className='p-4'>Uploaded By</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <tr key={index} className='border-b text-sm'>
              <td className='p-4'>{file.originalName}</td>
              <td className='p-4'>{file.storedName}</td>
              <td className='p-4'>
                {new Date(file.uploadDate).toLocaleString()}
              </td>
              <td className='p-4'>{file.uploadedBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
