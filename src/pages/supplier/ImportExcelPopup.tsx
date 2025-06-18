// src/components/supplier/ImportExcelPopup.tsx
import React, { useState } from 'react';
import { X, Upload, FileUp } from 'lucide-react';
import * as XLSX from 'xlsx'; // Import all from xlsx

interface ImportExcelPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (products: any[]) => void; // Callback to pass parsed products
}

const ImportExcelPopup: React.FC<ImportExcelPopupProps> = ({ isOpen, onClose, onImport }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null); // Clear previous errors
    } else {
      setFile(null);
    }
  };

  const handleImport = () => {
    if (!file) {
      setError('Please select an Excel file to import.');
      return;
    }

    setLoading(true);
    setError(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = event.target?.result;
        if (!data) {
          setError('Failed to read file data.');
          setLoading(false);
          return;
        }

        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0]; // Get the first sheet
        const worksheet = workbook.Sheets[sheetName];

        // Convert sheet to JSON array
        const json = XLSX.utils.sheet_to_json(worksheet, {
          header: 1, // Get data as an array of arrays
          raw: false, // Keep formatted values
        }) as string[][];

        if (json.length === 0) {
            setError('The selected file is empty or contains no data.');
            setLoading(false);
            return;
        }

        // Assuming the first row is headers: id, name, sku, category, tags, price, stock, deliveryTime, status, image
        // And `tags` is comma-separated string
        const headers = json[0].map(h => h.trim());
        const productsData = json.slice(1).map(row => {
          const product: any = {};
          headers.forEach((header, index) => {
            let value = row[index];
            if (value === undefined || value === null) value = ''; // Handle undefined/null values

            switch (header.toLowerCase()) {
                case 'id':
                case 'sku':
                case 'name':
                case 'category':
                case 'deliverytime':
                case 'image':
                    product[header.toLowerCase()] = String(value);
                    break;
                case 'tags':
                    product.tags = String(value).split(',').map(tag => tag.trim()).filter(tag => tag !== '');
                    break;
                case 'price':
                    product.price = parseFloat(String(value));
                    if (isNaN(product.price)) product.price = 0;
                    break;
                case 'stock':
                    product.stock = parseInt(String(value));
                    if (isNaN(product.stock)) product.stock = 0;
                    break;
                case 'status':
                    product.status = (String(value).toLowerCase() === 'active' ? 'Active' : 'Inactive');
                    break;
                default:
                    // Ignore unknown headers or add them dynamically if needed
                    break;
            }
          });
            // Determine stockStatus based on parsed stock
            if (typeof product.stock === 'number') {
                if (product.stock > 10) {
                    product.stockStatus = 'In Stock';
                } else if (product.stock > 0) {
                    product.stockStatus = 'Low Stock';
                } else {
                    product.stockStatus = 'Out of Stock';
                }
            } else {
                product.stockStatus = 'Out of Stock'; // Default if stock is not a valid number
            }
          // Ensure mandatory fields exist for a valid Product structure
          if (!product.id || !product.name || !product.sku || !product.category || isNaN(product.price) || isNaN(product.stock)) {
              console.warn("Skipping invalid product row:", row, "Parsed:", product);
              return null; // Skip invalid rows
          }
          return product;
        }).filter(Boolean); // Filter out any null products

        if (productsData.length === 0) {
            setError('No valid product data found after parsing. Please check your Excel format.');
            setLoading(false);
            return;
        }

        onImport(productsData); // Pass the parsed data up to the parent component
        setFile(null); // Clear file input
        onClose(); // Close the popup
      } catch (e: any) {
        setError(`Error parsing file: ${e.message}. Please ensure it's a valid Excel file with correct headers.`);
        console.error('Error parsing Excel file:', e);
      } finally {
        setLoading(false);
      }
    };
    reader.onerror = (error) => {
      setError('Error reading file.');
      setLoading(false);
      console.error('FileReader error:', error);
    };

    reader.readAsBinaryString(file); // Read file as binary string
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Import Products from Excel</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <FileUp className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="excel-file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
                  <span>Upload an Excel file</span>
                  <input
                    id="excel-file-upload"
                    name="excelFile"
                    type="file"
                    className="sr-only"
                    accept=".xlsx, .xls, .csv" // Accept Excel and CSV formats
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                {file ? file.name : 'Max file size 10MB (.xlsx, .xls, .csv)'}
              </p>
              {file && (
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="mt-2 text-xs text-red-600 hover:text-red-800"
                >
                  Remove selected file
                </button>
              )}
            </div>
          </div>
          
          {error && <p className="text-red-600 text-sm">{error}</p>}
          {loading && <p className="text-blue-600 text-sm">Importing... Please wait.</p>}

          <p className="text-sm text-gray-600">
            Make sure your Excel file has headers like: "id", "name", "sku", "category", "tags", "price", "stock", "deliveryTime", "status", "image". Tags should be comma-separated.
          </p>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-200 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleImport}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            disabled={!file || loading}
          >
            Import
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportExcelPopup;