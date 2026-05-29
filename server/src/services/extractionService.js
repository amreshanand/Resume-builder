const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

/**
 * Extracts raw text from a PDF or DOCX buffer
 * @param {Buffer} buffer - The file buffer
 * @param {String} mimetype - The MIME type of the file
 * @returns {Promise<String>} The extracted text
 */
exports.extractText = async (buffer, mimetype) => {
    try {
        if (mimetype === 'application/pdf') {
            const data = await pdfParse(buffer);
            return data.text;
        } else if (
            mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
            mimetype === 'application/msword'
        ) {
            const result = await mammoth.extractRawText({ buffer });
            return result.value;
        } else {
            throw new Error('Unsupported file type for extraction. Please upload a PDF or DOCX file.');
        }
    } catch (error) {
        console.error('Text Extraction Error:', error);
        throw new Error('Failed to extract text from document: ' + error.message);
    }
};
