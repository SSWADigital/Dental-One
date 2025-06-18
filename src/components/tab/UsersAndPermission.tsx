import React, { useState } from 'react';
import { Users, Plus, Trash2, Eye, Save, X } from 'lucide-react';

interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
}

interface Permission {
  module: string;
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  approve: boolean;
}

export const UsersAndPermission: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string>('staff');
  const [previewRole, setPreviewRole] = useState<string>('staff');

  const roles: Role[] = [
    {
      id: 'staff',
      name: 'Staff',
      description: 'Basic access to system features',
      userCount: 24
    },
    {
      id: 'manager',
      name: 'Manager',
      description: 'Extended access with approval rights',
      userCount: 8
    },
    {
      id: 'supplier',
      name: 'Supplier',
      description: 'External access to supplier portal',
      userCount: 36
    },
    {
      id: 'superadmin',
      name: 'Superadmin',
      description: 'Full system access and configuration',
      userCount: 3
    }
  ];

  const [permissions, setPermissions] = useState<Permission[]>([
    { module: 'Dashboard', view: true, create: false, edit: false, delete: false, approve: false },
    { module: 'Purchase Requests', view: true, create: true, edit: true, delete: false, approve: false },
    { module: 'Purchase Orders', view: true, create: false, edit: false, delete: false, approve: false },
    { module: 'Supplier Ratings', view: true, create: false, edit: false, delete: false, approve: false },
    { module: 'Product Catalog', view: true, create: false, edit: false, delete: false, approve: false },
    { module: 'Stock Levels', view: true, create: false, edit: false, delete: false, approve: false },
    { module: 'Forecasting', view: false, create: false, edit: false, delete: false, approve: false },
    { module: 'Landed Costs', view: false, create: false, edit: false, delete: false, approve: false },
    { module: 'Payment PO', view: false, create: false, edit: false, delete: false, approve: false },
    { module: 'Reports', view: true, create: false, edit: false, delete: false, approve: false },
    { module: 'Settings', view: false, create: false, edit: false, delete: false, approve: false }
  ]);

  const updatePermission = (moduleIndex: number, permissionType: keyof Omit<Permission, 'module'>, value: boolean) => {
    const newPermissions = [...permissions];
    newPermissions[moduleIndex][permissionType] = value;
    setPermissions(newPermissions);
  };

  const getRoleColor = (roleId: string) => {
    switch (roleId) {
      case 'staff': return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'manager': return 'bg-green-50 border-green-200 text-green-700';
      case 'supplier': return 'bg-purple-50 border-purple-200 text-purple-700';
      case 'superadmin': return 'bg-red-50 border-red-200 text-red-700';
      default: return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  return (
    <div className="mx-auto">
      {/* Role Management Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-900">Role Management</h2>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>New Role</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {roles.map((role) => (
            <div
              key={role.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedRole === role.id 
                  ? getRoleColor(role.id) 
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedRole(role.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{role.name}</h3>
                <span className="text-sm text-gray-500">{role.userCount} users</span>
              </div>
              <p className="text-sm text-gray-600">{role.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Permission Matrix Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <h2 className="text-lg font-semibold text-gray-900">
              Permission Matrix: {roles.find(r => r.id === selectedRole)?.name}
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <button className="text-red-500 hover:text-red-600 px-4 py-2 rounded-md transition-colors flex items-center space-x-2">
              <Trash2 className="w-4 h-4" />
              <span>Delete Role</span>
            </button>
            <button className="text-blue-500 hover:text-blue-600 px-4 py-2 rounded-md transition-colors flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors flex items-center space-x-2">
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Module / Feature</th>
                <th className="text-center py-3 px-4 font-medium text-gray-700">View</th>
                <th className="text-center py-3 px-4 font-medium text-gray-700">Create</th>
                <th className="text-center py-3 px-4 font-medium text-gray-700">Edit</th>
                <th className="text-center py-3 px-4 font-medium text-gray-700">Delete</th>
                <th className="text-center py-3 px-4 font-medium text-gray-700">Approve</th>
              </tr>
            </thead>
            <tbody>
              {permissions.map((permission, index) => (
                <tr key={permission.module} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{permission.module}</td>
                  <td className="py-3 px-4 text-center">
                    <input
                      type="checkbox"
                      checked={permission.view}
                      onChange={(e) => updatePermission(index, 'view', e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <input
                      type="checkbox"
                      checked={permission.create}
                      onChange={(e) => updatePermission(index, 'create', e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <input
                      type="checkbox"
                      checked={permission.edit}
                      onChange={(e) => updatePermission(index, 'edit', e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <input
                      type="checkbox"
                      checked={permission.delete}
                      onChange={(e) => updatePermission(index, 'delete', e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <input
                      type="checkbox"
                      checked={permission.approve}
                      onChange={(e) => updatePermission(index, 'approve', e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Preview Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Eye className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-900">Role Preview: Staff</h2>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Select role to preview:</span>
            <select 
              value={previewRole}
              onChange={(e) => setPreviewRole(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {roles.map((role) => (
                <option key={role.id} value={role.id}>{role.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Mock Dashboard Preview */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">D</span>
              </div>
              <span className="font-medium text-gray-900">DentalOne</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
              <span className="text-sm text-gray-600">John Smith</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-gray-200 p-4">
              <nav className="space-y-2">
                {[
                  { name: 'Dashboard', icon: '📊', enabled: true },
                  { name: 'Purchase Request', icon: '📝', enabled: true },
                  { name: 'Purchase Orders', icon: '📋', enabled: true },
                  { name: 'Supplier Ratings', icon: '⭐', enabled: true },
                  { name: 'Product Catalog', icon: '📦', enabled: true },
                  { name: 'Stock Levels', icon: '📈', enabled: true },
                  { name: 'Reports', icon: '📊', enabled: true }
                ].map((item) => (
                  <div
                    key={item.name}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm ${
                      item.enabled 
                        ? 'text-gray-700 hover:bg-gray-100' 
                        : 'text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </div>
                ))}
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600">Welcome back, John Smith</p>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Purchase Requests</div>
                  <div className="text-2xl font-bold text-blue-600">12</div>
                  <div className="text-xs text-gray-500">Pending</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Orders</div>
                  <div className="text-2xl font-bold text-green-600">24</div>
                  <div className="text-xs text-gray-500">Active</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Stock Alerts</div>
                  <div className="text-2xl font-bold text-orange-600">3</div>
                  <div className="text-xs text-gray-500">Low Stock</div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Purchase Requests</h3>
                <p className="text-sm text-gray-500 italic">
                  This user can view purchase requests but cannot approve them.
                </p>
              </div>
            </div>
          </div>

          {/* Preview Mode Notice */}
          <div className="bg-blue-50 border-t border-blue-200 px-4 py-3">
            <div className="flex items-start space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full mt-0.5 flex-shrink-0"></div>
              <div className="text-sm text-blue-800">
                <strong>Preview Mode:</strong> This is a simulation of what users with the "Staff" role will see when they log in. 
                The interface is customized based on their permissions. Staff members can view dashboards, create purchase requests, and view 
                product information, but cannot access financial data or system settings.
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 mt-6">
          <button className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
            Cancel
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Save All Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};