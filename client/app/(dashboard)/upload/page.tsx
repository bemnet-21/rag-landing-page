"use client";

import React, { useState, useEffect } from 'react'; // Added useEffect
import { deleteDocument, getDocuments, uploadDocument } from '@/services/document.service';
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2, Trash2, Calendar } from 'lucide-react'; // Added Trash2, Calendar
import { Document } from '@/interface';
import { FaTrash } from 'react-icons/fa';

const AdminDashboard = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: ''
  });

  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadStatus({ type: null, message: '' });
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadStatus({ type: null, message: '' });

    try {
      await uploadDocument(file);
      setUploadStatus({ 
        type: 'success', 
        message: `${file.name} successfully indexed into knowledge base.` 
      });
      setFile(null); 
      fetchDocuments();
    } catch (err) {
      setUploadStatus({ 
        type: 'error', 
        message: 'Failed to upload document. Please try again.' 
      });
      console.error('Upload failed:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const fetchDocuments = async () => {
    try {
      const res = await getDocuments();
      const data = res.data.data;
      setDocuments(data);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  const handleDelete = async (docId: string) => {
    try {
      await deleteDocument(docId);
      fetchDocuments();
    } catch(err) {
      console.log('Delete Failed', err)
    }
  }


  return (
    <div className="min-h-screen bg-[#F9F7F2] text-[#1A1A1A] p-4 md:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <header className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#2C423F] mb-2">
            Knowledge Base
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Upload PDFs or Text files to train your AI assistant.
          </p>
        </header>

        <main className="grid gap-8">
          {/* Upload Section */}
          <section className="bg-white border border-[#E5E1D8] rounded-xl p-6 md:p-8 shadow-sm">
            <div 
              className={`relative border-2 border-dashed rounded-lg p-8 md:p-12 transition-colors flex flex-col items-center justify-center text-center
                ${file ? 'border-[#D4A373] bg-[#FDFBF7]' : 'border-[#D1D1D1] hover:border-[#D4A373]'}`}
            >
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
                accept=".pdf,.txt,.doc,.docx"
              />
              
              <div className="bg-[#F9F7F2] p-4 rounded-full mb-4">
                <Upload className="w-8 h-8 text-[#2C423F]" />
              </div>

              {file ? (
                <div className="space-y-2">
                  <p className="font-medium text-[#2C423F]">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="text-lg font-medium text-[#2C423F]">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500">PDF, TXT, or DOC (Max 10MB)</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-end gap-4">
              {file && (
                <button 
                  onClick={() => setFile(null)}
                  className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
                >
                  Cancel
                </button>
              )}
              <button
                disabled={!file || isUploading}
                onClick={handleUpload}
                className={`w-full sm:w-auto px-8 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2
                  ${!file || isUploading 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-[#2C423F] text-white hover:bg-[#1e2d2b] active:scale-95 shadow-md'}`}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Train AI with Document'
                )}
              </button>
            </div>

            {/* Status Messages */}
            {uploadStatus.type && (
              <div className={`mt-6 p-4 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-2
                ${uploadStatus.type === 'success' ? 'bg-green-50 border border-green-100 text-green-800' : 'bg-red-50 border border-red-100 text-red-800'}`}
              >
                {uploadStatus.type === 'success' ? <CheckCircle2 className="w-5 h-5 mt-0.5" /> : <AlertCircle className="w-5 h-5 mt-0.5" />}
                <p className="text-sm font-medium">{uploadStatus.message}</p>
              </div>
            )}
          </section>

          <section className="bg-white border border-[#E5E1D8] rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E5E1D8] bg-[#FDFBF7]">
              <h2 className="font-serif font-bold text-[#2C423F]">Indexed Documents</h2>
            </div>
            <div className="divide-y divide-[#E5E1D8]">
              {documents.length > 0 ? (
                documents.map((doc) => (
                  <div key={doc.id} className="p-4 flex items-center justify-between hover:bg-[#F9F7F2] transition-colors group">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 bg-[#F0EEE6] rounded text-[#2C423F]">
                        <FileText size={20} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[#1A1A1A] truncate">{doc.filename}</p>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">{doc.file_type.split('/')[1] || doc.file_type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <FaTrash className="text-3xl rounded font-bold text-red-700 bg-red-50 px-2 py-0.5 border border-red-100 " 
                        onClick={() => handleDelete(doc.id)}
                      />
                        
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center">
                  <p className="text-sm text-gray-500">No documents indexed yet.</p>
                </div>
              )}
            </div>
          </section>

          {/* Guidelines / Help Section */}
          <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="p-4 bg-white border border-[#E5E1D8] rounded-lg">
              <h3 className="text-sm font-bold text-[#2C423F] mb-1">Vector Indexing</h3>
              <p className="text-xs text-gray-500">Documents are automatically chunked and embedded using Gemini for high-precision retrieval.</p>
            </div>
            <div className="p-4 bg-white border border-[#E5E1D8] rounded-lg">
              <h3 className="text-sm font-bold text-[#2C423F] mb-1">Privacy First</h3>
              <p className="text-xs text-gray-500">Your data is stored in your private vector instance and never used to train public models.</p>
            </div>
            <div className="p-4 bg-white border border-[#E5E1D8] rounded-lg sm:col-span-2 lg:col-span-1">
              <h3 className="text-sm font-bold text-[#2C423F] mb-1">Citation Support</h3>
              <p className="text-xs text-gray-500">The AI will automatically cite these documents when answering user queries.</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;