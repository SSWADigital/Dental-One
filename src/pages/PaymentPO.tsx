import React, { useState } from 'react';
import { Search, Bell, Settings, ChevronDown, Filter, Upload, Eye, X, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import UploadPaymentProofPopup from '../components/UploadPaymentProofPopup';
import TopBar from '../components/TopBar';

interface PaymentProofData {
  referenceNumber: string;
  paymentDate: string;
  file: File | null;
  notes: string;
}

const PaymentPO: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('All Status');
  const [filterPeriod, setFilterPeriod] = useState('Last 30 days');
  const [showNotification, setShowNotification] = useState(true);
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  const [invoices, setInvoices] = useState([
    {
      id: 'INV-2023-0542',
      supplier: 'Dental Supplies Co.',
      supplierInitial: 'D',
      amount: 1245.00,
      issueDate: 'Nov 15, 2023',
      dueDate: 'Dec 15, 2023',
      status: 'Not Yet Validated',
      statusColor: 'bg-yellow-100 text-yellow-800',
      statusIcon: Clock,
      action: 'Upload Proof',
      actionColor: 'text-blue-600'
    },
    {
      id: 'INV-2023-0498',
      supplier: 'MedEquip Inc.',
      supplierInitial: 'M',
      amount: 3780.50,
      issueDate: 'Nov 10, 2023',
      dueDate: 'Dec 10, 2023',
      status: 'Rejected',
      statusColor: 'bg-red-100 text-red-800',
      statusIcon: AlertCircle,
      action: 'Resubmit',
      actionColor: 'text-blue-600'
    },
    {
      id: 'INV-2023-0521',
      supplier: 'Oral Care Products',
      supplierInitial: 'O',
      amount: 895.75,
      issueDate: 'Nov 12, 2023',
      dueDate: 'Dec 12, 2023',
      status: 'Validated',
      statusColor: 'bg-green-100 text-green-800',
      statusIcon: CheckCircle,
      action: 'View Details',
      actionColor: 'text-gray-600'
    },
    {
      id: 'INV-2023-0536',
      supplier: 'Dental Tech Solutions',
      supplierInitial: 'D',
      amount: 2150.00,
      issueDate: 'Nov 14, 2023',
      dueDate: 'Dec 14, 2023',
      status: 'Not Yet Validated',
      statusColor: 'bg-yellow-100 text-yellow-800',
      statusIcon: Clock,
      action: 'Upload Proof',
      actionColor: 'text-blue-600'
    },
    {
      id: 'INV-2023-0489',
      supplier: 'Healthcare Supplies Ltd.',
      supplierInitial: 'H',
      amount: 1875.25,
      issueDate: 'Nov 8, 2023',
      dueDate: 'Dec 8, 2023',
      status: 'Not Yet Validated',
      statusColor: 'bg-yellow-100 text-yellow-800',
      statusIcon: Clock,
      action: 'Upload Proof',
      actionColor: 'text-blue-600'
    }
  ]);

  const handleUploadClick = (invoice: any) => {
    setSelectedInvoice(invoice);
    setShowUploadPopup(true);
  };

  const handleUploadSubmit = (data: PaymentProofData) => {
    // Update invoice status to pending validation
    setInvoices(prev => prev.map(inv => 
      inv.id === selectedInvoice?.id 
        ? { 
            ...inv, 
            status: 'Pending Validation', 
            statusColor: 'bg-blue-100 text-blue-800',
            statusIcon: Clock,
            action: 'View Details',
            actionColor: 'text-gray-600'
          }
        : inv
    ));

    // Show success message
    alert(`Payment proof uploaded successfully for ${selectedInvoice?.id}`);
    
    setSelectedInvoice(null);
  };

  const getSupplierColor = (initial: string) => {
    const colors = {
      'D': 'bg-blue-500',
      'M': 'bg-green-500',
      'O': 'bg-purple-500',
      'H': 'bg-orange-500'
    };
    return colors[initial as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <>

      <TopBar Title='Payment PO' Text='Manage and validate supplier invoices' />
      
      <main className="flex-1 p-6 bg-gray-50">
        {/* Pending Invoices Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Pending Invoices</h2>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Filter by</span>
                <div className="relative">
                  <select 
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>All Status</option>
                    <option>Not Yet Validated</option>
                    <option>Validated</option>
                    <option>Rejected</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              <div className="relative">
                <select 
                  value={filterPeriod}
                  onChange={(e) => setFilterPeriod(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>Last 30 days</option>
                  <option>Last 7 days</option>
                  <option>Last 90 days</option>
                  <option>This year</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
                <span>More Filters</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 font-medium text-gray-700">Supplier</th>
                  <th className="text-left py-4 px-4 font-medium text-gray-700">Invoice #</th>
                  <th className="text-left py-4 px-4 font-medium text-gray-700">Amount</th>
                  <th className="text-left py-4 px-4 font-medium text-gray-700">Issue Date</th>
                  <th className="text-left py-4 px-4 font-medium text-gray-700">Due Date</th>
                  <th className="text-left py-4 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-4 px-4 font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${getSupplierColor(invoice.supplierInitial)}`}>
                          {invoice.supplierInitial}
                        </div>
                        <span className="font-medium text-gray-900">{invoice.supplier}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-blue-600 font-medium hover:underline cursor-pointer">
                        {invoice.id}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-gray-900">
                        ${invoice.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{invoice.issueDate}</td>
                    <td className="py-4 px-4 text-gray-600">{invoice.dueDate}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <invoice.statusIcon className="w-4 h-4" />
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${invoice.statusColor}`}>
                          {invoice.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        {(invoice.action === 'Upload Proof' || invoice.action === 'Resubmit') && (
                          <button 
                            onClick={() => handleUploadClick(invoice)}
                            className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <Upload className="w-4 h-4" />
                            <span className="font-medium">{invoice.action}</span>
                          </button>
                        )}
                        {invoice.action === 'View Details' && (
                          <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors">
                            <Eye className="w-4 h-4" />
                            <span className="font-medium">{invoice.action}</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
            <span className="text-sm text-gray-500">Showing 1 to 5 of 24 results</span>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-gray-600 hover:text-gray-800 disabled:opacity-50">
                Previous
              </button>
              <div className="flex space-x-1">
                <button className="w-8 h-8 rounded bg-blue-600 text-white text-sm font-medium">1</button>
                <button className="w-8 h-8 rounded text-gray-600 hover:bg-gray-100 text-sm">2</button>
                <button className="w-8 h-8 rounded text-gray-600 hover:bg-gray-100 text-sm">3</button>
              </div>
              <button className="px-3 py-1 text-gray-600 hover:text-gray-800">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Payment Proof Rejected Notification */}
        {showNotification && (
          <div className="fixed bottom-6 left-6 max-w-md bg-white border-l-4 border-red-500 rounded-lg shadow-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-red-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">Payment Proof Rejected</h4>
                  <button 
                    onClick={() => setShowNotification(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Your payment proof for invoice #INV-2023-0498 from MedEquip Inc. has been rejected.
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  <span className="font-medium">Reason:</span> Amount mismatch. Please verify payment details.
                </p>
                <div className="flex space-x-3">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View Details
                  </button>
                  <button 
                    onClick={() => handleUploadClick(invoices.find(inv => inv.id === 'INV-2023-0498'))}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Resubmit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Upload Payment Proof Popup */}
      <UploadPaymentProofPopup
        isOpen={showUploadPopup}
        onClose={() => {
          setShowUploadPopup(false);
          setSelectedInvoice(null);
        }}
        invoice={selectedInvoice}
        onSubmit={handleUploadSubmit}
      />
    </>
  );
};

export default PaymentPO;