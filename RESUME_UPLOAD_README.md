# Resume Upload Functionality

This document describes the resume upload functionality implemented for job seekers in the Head Hunter application.

## Overview

Job seekers can now upload their resume files in PDF, DOC, or DOCX format. The files are stored in the `assets/resumes` directory and are accessible via the `/assets/resumes/` endpoint.

## Features

- **File Types Supported**: PDF (.pdf), DOC (.doc), DOCX (.docx)
- **File Size Limit**: 10MB maximum
- **Automatic File Management**: Old resume files are automatically deleted when a new one is uploaded
- **Secure Access**: Only authenticated job seekers can upload/delete resumes
- **Unique Naming**: Files are saved with UUID-based names to prevent conflicts

## API Endpoints

### Upload Resume

```
POST /api/job-seekers/upload-resume
Content-Type: multipart/form-data
Authorization: Bearer <token>
```

**Request Body:**

- `file`: Resume file (PDF, DOC, or DOCX)
- `description` (optional): Description of the resume

**Response:**

```json
{
  "message": "Resume uploaded successfully!",
  "data": {
    "filename": "uuid_filename.pdf",
    "originalName": "my_resume.pdf",
    "fileUrl": "/assets/resumes/uuid_filename.pdf",
    "description": "Updated resume with latest experience"
  },
  "success": true
}
```

### Delete Resume

```
DELETE /api/job-seekers/delete-resume
Authorization: Bearer <token>
```

**Response:**

```json
{
  "message": "Resume deleted successfully!",
  "data": { "affected": 1 },
  "success": true
}
```

## Database Changes

The `job-seekers` table now includes:

- `resumeFilename`: Stores the actual filename of the uploaded resume
- `resumeUrl`: Stores the URL path to access the resume file

## File Storage

- **Directory**: `assets/resumes/`
- **Naming Convention**: UUID + original file extension
- **Access URL**: `/assets/resumes/<filename>`

## Security

- Only users with `jobseeker` role can upload/delete resumes
- File type validation ensures only allowed formats are accepted
- File size limits prevent abuse
- Authentication required for all operations

## Usage Example

### Frontend (JavaScript)

```javascript
const formData = new FormData();
formData.append("file", resumeFile);
formData.append("description", "Updated resume");

const response = await fetch("/api/job-seekers/upload-resume", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
  },
  body: formData,
});

const result = await response.json();
console.log("Resume uploaded:", result.data.fileUrl);
```

### Frontend (React)

```jsx
import { useState } from "react";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);

    try {
      const response = await fetch("/api/job-seekers/upload-resume", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        console.log("Resume uploaded successfully!");
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <input
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleUpload}>Upload Resume</button>
    </div>
  );
};
```

## Error Handling

Common error responses:

- **400 Bad Request**: Invalid file type or no file uploaded
- **401 Unauthorized**: Missing or invalid authentication token
- **403 Forbidden**: User is not a job seeker
- **404 Not Found**: Job seeker profile not found
- **413 Payload Too Large**: File size exceeds 10MB limit

## Notes

- The system automatically creates the `assets/resumes` directory if it doesn't exist
- Old resume files are automatically cleaned up when a new one is uploaded
- File URLs are relative paths that work with the existing static file serving configuration
