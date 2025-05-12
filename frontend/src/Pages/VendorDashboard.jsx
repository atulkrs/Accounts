import React from "react";

function VendorDashboard() {
  return (
    <div className='flex h-screen bg-gray-100'>
      {/* Sidebar */}
      <aside className='w-64 bg-[#1b2a49] text-white flex flex-col p-6'>
        <h2 className='text-2xl font-bold text-[#00c98d] mb-10'>AdminPanel</h2>
        <nav className='flex flex-col space-y-4 text-gray-300'>
          <a href='#' className='hover:text-white'>
            Dashboard
          </a>
          <a href='#' className='hover:text-white'>
            Users
          </a>
          <a href='#' className='hover:text-white'>
            Reports
          </a>
          <a href='#' className='hover:text-white'>
            Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className='flex-1 flex flex-col'>
        {/* Topbar */}
        <header className='bg-[#1b2a49] text-white flex justify-between items-center px-6 py-4'>
          <h3 className='text-xl font-semibold'>Welcome, Admin</h3>
          <button className='bg-[#00c98d] hover:bg-[#00b57c] text-white px-4 py-2 rounded'>
            Logout
          </button>
        </header>

        {/* Dashboard Content */}
        <main className='p-6 bg-gray-100 flex flex-col gap-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <div className='bg-white p-6 rounded shadow'>
              <h4 className='text-lg font-medium text-[#1b2a49] mb-2'>
                Total Users
              </h4>
              <p className='text-2xl font-bold text-[#00c98d]'>1,024</p>
            </div>
            <div className='bg-white p-6 rounded shadow'>
              <h4 className='text-lg font-medium text-[#1b2a49] mb-2'>
                Active Sessions
              </h4>
              <p className='text-2xl font-bold text-[#00c98d]'>240</p>
            </div>
            <div className='bg-white p-6 rounded shadow'>
              <h4 className='text-lg font-medium text-[#1b2a49] mb-2'>
                New Signups
              </h4>
              <p className='text-2xl font-bold text-[#00c98d]'>84</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default VendorDashboard;
