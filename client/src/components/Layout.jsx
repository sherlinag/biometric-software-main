import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Devices from "./Devices";
import Server from "./Server";
import Gateway from "./Gateway";
import Settings from "./Settings"; 
import backgroundImage from "/src/assets/grid_background.svg";


export default function Layout() {
  const [selectedSidebar, setSelectedSidebar] = useState("Authentication");
  const [selectedSubmenu, setSelectedSubmenu] = useState("Server Authentication");

  const handleSelectSidebar = (menu) => {
    setSelectedSidebar(menu);
    if (menu === "Authentication") {
      setSelectedSubmenu("Server Authentication");
    } else {
      setSelectedSubmenu(null);
    }
  };

  const handleSelectSubmenu = (submenu) => {
    setSelectedSubmenu(submenu);
  };

  const renderContent = () => {
    if (selectedSidebar === "Devices") {
      return <Devices />;
    }

    if (selectedSidebar === "Authentication") {
      if (selectedSubmenu === "Server Authentication") {
        return <Server />;
      } else if (selectedSubmenu === "Gateway Authentication") {
        return <Gateway />;
      }
    }

    if (selectedSidebar === "Settings") {
      return <Settings />; 
    }

    return <p className="text-center text-gray-600 mt-10">Please select a menu item.</p>;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        selectedSidebar={selectedSidebar}
        onSelectSidebar={handleSelectSidebar}
        selectedSubmenu={selectedSubmenu}
        onSelectSubmenu={handleSelectSubmenu}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          selected={selectedSidebar}
          selectedSubmenu={selectedSubmenu}
          onSelectSubmenu={handleSelectSubmenu}
        />
        {/* <main className="flex-1 p-6 bg-gray-50 overflow-auto">{renderContent()}</main> */}
<main
  className="flex-1 p-6 overflow-auto relative"
  style={{
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
  >
  <div className="absolute inset-0 bg-white opacity-60 pointer-events-none z-0" />
  <div className="relative z-10">
    {renderContent()}
  </div>
</main>

      </div>

      <Footer />
    </div>
  );
}
