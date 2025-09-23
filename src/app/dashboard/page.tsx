// src/app/dashboard/page.jsx
"use client";

import { useState, useEffect } from "react";
import { databases } from "../../lib/appwrite";
import { Query } from "appwrite";
import Sidebar from "../../components/Dashboard/Sidebar";
import Header from "../../components/Dashboard/Header";
import StatsOverview from "../../components/Dashboard/StatsOverview";
import CollectionMonitor from "../../components/Dashboard/CollectionMonitor";
import RecentActivity from "../../components/Dashboard/RecentActivity";
import AnalyticsDashboard from "../../components/Dashboard/AnalyticsDashboard";
import SettingsPanel from "../../components/Dashboard/SettingsPanel";

const COLLECTIONS = {
  SERVICE_REQUESTS: process.env.NEXT_PUBLIC_APPWRITE_SERVICE_REQUESTS_COLLECTION_ID,
  CLIENTS: process.env.NEXT_PUBLIC_APPWRITE_CLIENTS_COLLECTION_ID,
  CONTACTS: process.env.NEXT_PUBLIC_APPWRITE_CONTACTS_COLLECTION_ID,
  FEED: process.env.NEXT_PUBLIC_APPWRITE_FEED_COLLECTION_ID,
  VENDORSHOWCASE: process.env.NEXT_PUBLIC_APPWRITE_VENDORSHOWCASE_COLLECTION_ID,
  PARTNERS: process.env.NEXT_PUBLIC_APPWRITE_PARTNERS_COLLECTION_ID,
  ADMIN: process.env.NEXT_PUBLIC_APPWRITE_ADMIN_COLLECTION_ID,
  ANALYSTS: process.env.NEXT_PUBLIC_APPWRITE_ANALYSTS_COLLECTION_ID
};

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState({
    totalServices: 0,
    totalClients: 0,
    totalContacts: 0,
    totalFeedPosts: 0,
    totalVendors: 0,
    pendingRequests: 0,
    completedRequests: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch data from all collections in parallel
      const [
        serviceRes, 
        clientsRes, 
        contactsRes, 
        feedRes, 
        vendorsRes
      ] = await Promise.all([
        databases.listDocuments(DATABASE_ID, COLLECTIONS.SERVICE_REQUESTS),
        databases.listDocuments(DATABASE_ID, COLLECTIONS.CLIENTS),
        databases.listDocuments(DATABASE_ID, COLLECTIONS.CONTACTS),
        databases.listDocuments(DATABASE_ID, COLLECTIONS.FEED),
        databases.listDocuments(DATABASE_ID, COLLECTIONS.VENDORSHOWCASE)
      ]);

      // Get recent activities (last 10 service requests)
      const recentServiceRes = await databases.listDocuments(
        DATABASE_ID, 
        COLLECTIONS.SERVICE_REQUESTS,
        [Query.limit(10), Query.orderDesc("$createdAt")]
      );

      const pendingRequests = serviceRes.documents.filter(r => r.status === "pending").length;
      const completedRequests = serviceRes.documents.filter(r => r.status === "completed").length;

      setStats({
        totalServices: serviceRes.total,
        totalClients: clientsRes.total,
        totalContacts: contactsRes.total,
        totalFeedPosts: feedRes.total,
        totalVendors: vendorsRes.total,
        pendingRequests,
        completedRequests
      });

      setRecentActivities(recentServiceRes.documents);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    setLoading(true);
    fetchDashboardData();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onRefresh={refreshData}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6">
          {activeTab === "overview" && (
            <>
              <StatsOverview stats={stats} />
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RecentActivity activities={recentActivities} />
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                  <div className="space-y-3">
                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
                      Create New Service Request
                    </button>
                    <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition">
                      Add New Client
                    </button>
                    <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition">
                      View Analytics Report
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {activeTab === "service_requests" && (
            <CollectionMonitor 
              collectionName="Service Requests"
              collectionId={COLLECTIONS.SERVICE_REQUESTS}
              attributes={[
                "name", "phone", "serviceType", "status", "amount", 
                "createdAt", "assignedProvider", "city"
              ]}
            />
          )}
          
          {activeTab === "clients" && (
            <CollectionMonitor 
              collectionName="Clients"
              collectionId={COLLECTIONS.CLIENTS}
              attributes={[
                "name", "company", "phone", "email", "city", 
                "createdAt", "isActive"
              ]}
            />
          )}
          
          {activeTab === "contacts" && (
            <CollectionMonitor 
              collectionName="Contacts"
              collectionId={COLLECTIONS.CONTACTS}
              attributes={[
                "name", "email", "subject", "status", "date", "createdAt"
              ]}
            />
          )}
          
          {activeTab === "feed" && (
            <CollectionMonitor 
              collectionName="Feed Posts"
              collectionId={COLLECTIONS.FEED}
              attributes={[
                "name", "contentType", "createdAt", "likes", "commentsCount", "isActive"
              ]}
            />
          )}
          
          {activeTab === "vendors" && (
            <CollectionMonitor 
              collectionName="Vendor Showcase"
              collectionId={COLLECTIONS.VENDORSHOWCASE}
              attributes={[
                "brand", "title", "isApproved", "views", "likes", "createdAt"
              ]}
            />
          )}
          {activeTab === "analytics" && (
            <AnalyticsDashboard />
          )}

          {activeTab === "settings" && (
            <SettingsPanel />
          )}
        </main>
      </div>
    </div>
  );
}