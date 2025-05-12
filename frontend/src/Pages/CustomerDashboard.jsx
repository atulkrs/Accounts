import React from "react";
import {
  FaHome,
  FaBoxOpen,
  FaTruck,
  FaFileInvoiceDollar,
  FaPlusSquare,
  FaHistory,
  FaChartBar,
  FaQuestionCircle,
  FaBell,
  FaUser,
} from "react-icons/fa";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const menuItems = [
  { icon: <FaHome />, label: "Dashboard" },
  { icon: <FaBoxOpen />, label: "My Orders" },
  { icon: <FaTruck />, label: "Track Deliveries" },
  { icon: <FaFileInvoiceDollar />, label: "Invoices & Payments" },
  { icon: <FaPlusSquare />, label: "Create Order" },
  { icon: <FaHistory />, label: "Reorder History" },
  { icon: <FaChartBar />, label: "Reports & Analytics" },
  { icon: <FaQuestionCircle />, label: "Support / Help Center" },
  { icon: <FaBell />, label: "Notifications" },
  { icon: <FaUser />, label: "My Account" },
];

const stats = [
  { label: "Total Orders", value: 18 },
  { label: "Pending Orders", value: 5 },
  { label: "Shipped Orders", value: 7 },
  { label: "Delivered Orders", value: 6 },
];

const chartData = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "Orders",
      data: [5, 8, 6, 10, 7],
      backgroundColor: "#15803d", // Dark Green
      borderRadius: 4,
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#0f172a", // Dark Blue
      },
    },
    title: {
      display: true,
      text: "Monthly Orders",
      color: "#0f172a",
      font: {
        size: 18,
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: "#334155", // Slate (dark) for better contrast
      },
      grid: {
        display: false,
      },
    },
    y: {
      ticks: {
        color: "#334155",
      },
      grid: {
        color: "#e2e8f0", // Light grid
      },
    },
  },
};

const CustomerDashboard = () => {
  return (
    <div className='flex h-screen bg-gray-100'>
      {/* Sidebar */}
      <div className='bg-blue-950 text-white w-64 p-5 shadow-lg flex flex-col fixed top-0 left-0 h-full'>
        <h1 className='text-2xl font-bold mb-8 text-green-700'>CUSTOMER</h1>
        <ul className='space-y-4'>
          {menuItems.map(({ icon, label }, index) => (
            <li
              key={index}
              className='flex items-center gap-3 hover:bg-green-700 hover:text-white px-3 py-2 rounded-md cursor-pointer transition'
            >
              <span className='text-lg'>{icon}</span>
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className='flex-1 ml-64 overflow-y-auto'>
        {/* Topbar */}
        <div className='bg-blue-950 text-white px-6 py-4 mb-8 flex justify-between items-center shadow fixed top-0 left-64 w-[calc(100%-16rem)] z-10'>
          <h2 className='text-2xl font-semibold text-green-700'>
            Welcome Back!
          </h2>
          <div className='flex items-center gap-4'>
            <button className='text-green-700 hover:text-white transition'>
              <FaBell className='text-xl' />
            </button>
            <div className='w-10 h-10 rounded-full bg-green-700 flex items-center justify-center text-white font-bold'>
              U
            </div>
          </div>
        </div>

        {/* Content */}
        <div className='pt-32 px-6 pb-10'>
          {/* Stats Grid */}
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10'>
            {stats.map(({ label, value }, index) => (
              <div
                key={index}
                className='bg-white p-6 rounded-lg shadow text-center'
              >
                <p className='text-gray-600 text-sm font-medium mb-2'>
                  {label}
                </p>
                <p className='text-3xl font-bold text-blue-950'>{value}</p>
              </div>
            ))}
          </div>

          {/* Bar Chart */}
          <div className='bg-white p-6 rounded-lg shadow'>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
