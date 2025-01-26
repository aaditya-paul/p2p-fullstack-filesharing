import {extname, join} from "path";
import {stat, mkdir, writeFile} from "fs/promises";
import * as dateFn from "date-fns";
import {NextResponse} from "next/server";

// Helper function to sanitize filenames
function sanitizeFilename(filename) {
  return filename.replace(/[^a-zA-Z0-9_\u0600-\u06FF.]/g, "_");
}

export async function POST(request) {
  try {
    // Parse the form data
    const formData = await request.formData();

    // Get the file from the form data
    const file = formData.get("file");
    if (!file) {
      return NextResponse.json(
        {error: "File blob is required."},
        {status: 400}
      );
    }

    // Convert the file to a Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Define the upload directory
    const pathDist = join(process.cwd(), "/public/uploads");
    const relativeUploadDir = `${dateFn.format(Date.now(), "dd-MM-Y")}`;
    const uploadDir = join(pathDist, relativeUploadDir);

    // Create the upload directory if it doesn't exist
    try {
      await stat(uploadDir);
    } catch (e) {
      if (e.code === "ENOENT") {
        await mkdir(uploadDir, {recursive: true});
      } else {
        console.error(
          "Error while trying to create directory when uploading a file\n",
          e
        );
        return NextResponse.json(
          {error: "Something went wrong."},
          {status: 500}
        );
      }
    }

    // Generate a unique filename
    const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const fileExtension = extname(file.name);
    const originalFilename = file.name.replace(/\.[^/.]+$/, "");
    const sanitizedFilename = sanitizeFilename(originalFilename);
    const filename = `${sanitizedFilename}_${uniqueSuffix}${fileExtension}`;

    // Save the file to the upload directory
    await writeFile(`${uploadDir}/${filename}`, buffer);

    // Return the file URL
    const finalFilePath = `${request.headers.get(
      "origin"
    )}/uploads/${relativeUploadDir}/${filename}`;
    return NextResponse.json(
      {done: "ok", filename, httpfilepath: finalFilePath},
      {status: 200}
    );
  } catch (e) {
    console.error("Error while trying to upload a file\n", e);
    return NextResponse.json({error: "Something went wrong."}, {status: 500});
  }
}
