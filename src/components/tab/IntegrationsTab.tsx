import React, { useState } from 'react';
import { 
  Plug, 
  Key, 
  Shield, 
  Book, 
  Webhook, 
  Copy, 
  Eye, 
  EyeOff, 
  Plus,
  Settings,
  AlertTriangle,
  CheckCircle,
  Code,
  ExternalLink,
  RefreshCw
} from 'lucide-react';
import { ToggleSwitch } from '../ToggleSwitch';

export const IntegrationsSection: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState('overview');
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKey] = useState('sk_live_51H7ashJH1A75LMv1A');

  const subTabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'authentication', label: 'Authentication' },
    { id: 'products', label: 'Products' },
    { id: 'orders', label: 'Orders' },
    { id: 'shipping', label: 'Shipping' },
    { id: 'invoices', label: 'Invoices' },
    { id: 'webhooks', label: 'Webhooks' }
  ];

  const apiPermissions = [
    {
      name: 'Products',
      description: 'Upload, update, and manage product information',
      icon: '📦',
      enabled: true
    },
    {
      name: 'Orders',
      description: 'Receive and update purchase order statuses',
      icon: '📋',
      enabled: true
    },
    {
      name: 'Shipping',
      description: 'Manage shipping details and tracking information',
      icon: '🚚',
      enabled: true
    },
    {
      name: 'Invoices',
      description: 'Submit and manage invoice information',
      icon: '📄',
      enabled: true
    }
  ];

  const webhookEvents = [
    {
      name: 'New Purchase Order',
      description: 'Triggered when a new PO is created',
      enabled: true
    },
    {
      name: 'Order Status Change',
      description: 'Triggered when an order status is updated',
      enabled: true
    },
    {
      name: 'Inventory Alert',
      description: 'Triggered when inventory falls below threshold',
      enabled: true
    },
    {
      name: 'Payment Processed',
      description: 'Triggered when a payment is processed',
      enabled: false
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Plug className="w-6 h-6 text-blue-500" />
          <h1 className="text-2xl font-bold text-gray-900">API Integration</h1>
        </div>
        <p className="text-gray-600">
          Connect your systems with our platform using our comprehensive API.
        </p>

        {/* Sub Navigation */}
        <div className="flex space-x-6 mt-6 border-b border-gray-200">
          {subTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeSubTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeSubTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* API Key Management */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Key className="w-5 h-5 text-blue-500" />
                <h2 className="text-lg font-semibold text-gray-900">API Key Management</h2>
              </div>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm transition-colors">
                Regenerate API Key
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🔑 Your API Key
                </label>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md font-mono text-sm">
                    {showApiKey ? apiKey : '••••••••••••••••••••••••••••••••••••••••••••••••'}
                  </div>
                  <button
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => copyToClipboard(apiKey)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <p className="text-xs text-amber-600">
                    Keep your API key secret. Do not share it in public repositories or client-side code.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* API Access Permissions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Shield className="w-5 h-5 text-blue-500" />
              <h2 className="text-lg font-semibold text-gray-900">API Access Permissions</h2>
            </div>

            <div className="space-y-4">
              {apiPermissions.map((permission, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{permission.icon}</span>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{permission.name}</div>
                      <div className="text-xs text-gray-500">{permission.description}</div>
                    </div>
                  </div>
                  <ToggleSwitch enabled={permission.enabled} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* API Reference */}
      {(activeSubTab === 'products' || activeSubTab === 'orders') && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Book className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-900">API Reference</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Comprehensive documentation for all available endpoints.
          </p>

          {activeSubTab === 'products' && (
            <div className="space-y-6">
              {/* Product Endpoints */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <h3 className="text-lg font-semibold text-gray-900">Product Endpoints</h3>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">POST</span>
                        <code className="text-sm font-mono text-gray-700">/api/v1/products</code>
                      </div>
                      <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                        Upload a new product
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Request Parameters</h4>
                        <div className="bg-gray-50 p-3 rounded-md">
                          <code className="text-xs text-gray-700">
                            {`{ "name": "Dental Brush Pro", "sku": "DB-PRO-001", "description": "Professional dental brush for clinical use", "price": 24.99, "category": "dental-tools", "inventory": 100, "attributes": { "color": "blue", "material": "nylon", "sterilizable": true } }`}
                          </code>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Response</h4>
                        <div className="bg-gray-50 p-3 rounded-md">
                          <code className="text-xs text-gray-700">
                            {`{ "id": "prod_12345", "name": "Dental Brush Pro", "sku": "DB-PRO-001", "description": "Professional dental brush for clinical use", "price": 24.99, "category": "dental-tools", "inventory": 100, "attributes": { "color": "blue", "material": "nylon", "sterilizable": true }, "created_at": "2022-12-01T09:41:00Z" }`}
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">GET</span>
                        <code className="text-sm font-mono text-gray-700">/api/v1/products/:id</code>
                      </div>
                      <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                        Get product details
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Path Parameters</h4>
                        <div className="bg-gray-50 p-3 rounded-md">
                          <code className="text-xs text-gray-700">
                            {`{ "id": "prod_12345" // Required: Product ID }`}
                          </code>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Response</h4>
                        <div className="bg-gray-50 p-3 rounded-md">
                          <code className="text-xs text-gray-700">
                            {`{ "id": "prod_12345", "name": "Dental Brush Pro", "sku": "DB-PRO-001", "description": "Professional dental brush for clinical use", "price": 24.99, "category": "dental-tools", "inventory": 100, "attributes": { "color": "blue", "material": "nylon", "sterilizable": true }, "created_at": "2022-12-01T09:41:00Z", "updated_at": "2022-12-01T09:41:00Z" }`}
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'orders' && (
            <div className="space-y-6">
              {/* Order Endpoints */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <h3 className="text-lg font-semibold text-gray-900">Order Endpoints</h3>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">PUT</span>
                        <code className="text-sm font-mono text-gray-700">/api/v1/orders/:id/status</code>
                      </div>
                      <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                        Update order status
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Path Parameters</h4>
                        <div className="bg-gray-50 p-3 rounded-md">
                          <code className="text-xs text-gray-700">
                            {`{ "id": "order_7890" // Required: Order ID }`}
                          </code>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Request Body</h4>
                        <div className="bg-gray-50 p-3 rounded-md">
                          <code className="text-xs text-gray-700">
                            {`{ "status": "confirmed" // Required: New status ("pending", "confirmed", "shipped", "delivered") }`}
                          </code>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Response</h4>
                        <div className="bg-gray-50 p-3 rounded-md">
                          <code className="text-xs text-gray-700">
                            {`{ "id": "order_7890", "status": "confirmed", "notes": "Order confirmed and being processed", "estimated_ship_date": "2022-12-10", "updated_at": "2022-12-05T10:15:30Z" }`}
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Webhooks Tab */}
      {activeSubTab === 'webhooks' && (
        <div className="space-y-8">
          {/* Webhook Configuration */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <h2 className="text-lg font-semibold text-gray-900">Webhook Configuration</h2>
              </div>
              <button className="text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center space-x-1">
                <Plus className="w-4 h-4" />
                <span>Add New Webhook</span>
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Configure webhooks to receive real-time notifications when events occur in your account.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Webhook URL
                </label>
                <input
                  type="url"
                  defaultValue="https://your-domain.com/webhook/dental-one"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Event Subscriptions
                </label>
                <div className="space-y-3">
                  {webhookEvents.map((event, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          defaultChecked={event.enabled}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{event.name}</div>
                          <div className="text-xs text-gray-500">{event.description}</div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">
                        {event.enabled ? 'Triggered when a new PO is created' : 'Triggered when a payment is processed'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Webhook Payload Example */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <h3 className="text-lg font-semibold text-gray-900">Webhook Payload Example</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Here's an example of the payload that will be sent to your webhook URL:
            </p>

            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm">
                {`{
  "event": "order.status_changed",
  "timestamp": "2022-12-05T10:15:30Z",
  "data": {
    "order_id": "order_7890",
    "previous_status": "pending",
    "new_status": "confirmed",
    "updated_by": "supplier_123",
    "notes": "Order confirmed and being processed"
  }
}`}
              </code>
            </div>
          </div>

          {/* Code Examples */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Code className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-900">Code Examples</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Sample code to help you integrate with our API.
            </p>

            <div className="space-y-6">
              {/* Authentication Example */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Authentication Example</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code className="text-sm">
                    {`// JavaScript Example
const apiKey = 'your_api_key_here';
fetch('https://api.dentalOne.com/v1/products', {
  method: 'GET',
  headers: {
    'Authorization': \`Bearer \${apiKey}\`,
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data));`}
                  </code>
                </div>
              </div>

              {/* Webhook Verification */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Webhook Verification</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code className="text-sm">
                    {`// Node.js Example
const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(payload, 'utf8').digest('hex');
  const computedSignature = \`sha256=\${digest}\`;
  
  return crypto.timingSafeEqual(
    Buffer.from(signature, 'utf8'),
    Buffer.from(computedSignature, 'utf8')
  );
}

// Process the webhook event
app.post('/webhook', (req, res) => {
  const signature = req.headers['x-webhook-signature'];
  const payload = JSON.stringify(req.body);
  
  if (!verifyWebhookSignature(payload, signature, process.env.WEBHOOK_SECRET)) {
    return res.status(401).send('Invalid signature');
  }
  
  // Process webhook event
  console.log('Received event:', req.body.event);
  res.status(200).send('OK');
});`}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Authentication Tab */}
      {activeSubTab === 'authentication' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Shield className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-900">Authentication</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">API Key Authentication</h3>
              <p className="text-gray-600 mb-4">
                Use your API key to authenticate requests. Include it in the Authorization header:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <code className="text-sm text-gray-700">
                  Authorization: Bearer your_api_key_here
                </code>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Rate Limiting</h3>
              <p className="text-gray-600 mb-4">
                API requests are limited to 1000 requests per hour per API key.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-blue-500" />
                  <span className="text-blue-800 font-medium">Current Usage: 45/1000 requests this hour</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Error Handling</h3>
              <p className="text-gray-600 mb-4">
                Our API uses conventional HTTP response codes to indicate success or failure:
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">200</span>
                  <span className="text-sm text-gray-700">Success</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">401</span>
                  <span className="text-sm text-gray-700">Unauthorized - Invalid API key</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">429</span>
                  <span className="text-sm text-gray-700">Too Many Requests - Rate limit exceeded</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Other tabs placeholder */}
      {(activeSubTab === 'shipping' || activeSubTab === 'invoices') && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">
              {activeSubTab === 'shipping' ? '🚚' : '📄'}
            </div>
            <div className="text-gray-400 text-lg">
              {activeSubTab === 'shipping' ? 'Shipping' : 'Invoices'} API documentation will be available here
            </div>
            <p className="text-gray-500 text-sm mt-2">
              This section is under development and will include comprehensive API endpoints for {activeSubTab}.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};