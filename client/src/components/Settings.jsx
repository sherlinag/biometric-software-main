import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  FaCheckCircle,
  FaClock,
  FaNetworkWired,
  FaKey,
} from "react-icons/fa";

export default function Settings() {
  const [syncInterval, setSyncInterval] = useState("");
  const [networkIP, setNetworkIP] = useState("");
  const [gatewayIP, setGatewayIP] = useState("");
  const [password, setPassword] = useState("");
  const [resetPin, setResetPin] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const validateIP = (ip) => {
    const ipRegex =
      /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
    return ipRegex.test(ip);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !syncInterval.trim() ||
      !networkIP.trim() ||
      !gatewayIP.trim() ||
      !password.trim() ||
      !resetPin.trim()
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill in all fields.",
      });
      return;
    }

    if (isNaN(syncInterval) || Number(syncInterval) <= 0) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Sync Interval must be a positive number.",
      });
      return;
    }

    if (!validateIP(networkIP)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Network IP",
        text: "Please enter a valid IPv4 address for Network IP.",
      });
      return;
    }

    if (!validateIP(gatewayIP)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Gateway IP",
        text: "Please enter a valid IPv4 address for Gateway IP.",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Settings verified successfully!",
    }).then(() => {
      setIsVerified(true);
    });
  };

  return (
    <div className="max-w-md mx-auto my-5 p-8 bg-white rounded-xl shadow-lg border border-indigo-100 font-sans">
      <h2
        className="text-3xl font-bold mb-8 text-center text-indigo-700"
        style={{ fontFamily: "'STIX Two Math', 'Cambria Math', Georgia, serif" }}
      >
        Settings
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Sync & Network */}
        <div>
          <h3 className="text-xl font-semibold text-indigo-700 mb-4 flex items-center gap-2">
            Sync & Network
          </h3>

          <label className="flex flex-col font-medium text-gray-700 mb-4">
            <span className="flex items-center gap-2 mb-1">
              <FaClock /> Sync Interval (minutes)
            </span>
            <input
              type="number"
              min="1"
              value={syncInterval}
              onChange={(e) => setSyncInterval(e.target.value)}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter sync interval"
            />
          </label>

          <label className="flex flex-col font-medium text-gray-700">
            <span className="flex items-center gap-2 mb-1">
              <FaNetworkWired /> Gateway IP
            </span>
            <input
              type="text"
              value={gatewayIP}
              onChange={(e) => setGatewayIP(e.target.value)}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter gateway IP (e.g., 192.168.1.254)"
            />
          </label>
        </div>

        {/* Change Password */}
        <div>
          <h3 className="text-xl font-semibold text-indigo-700 mb-4 flex items-center gap-2">
   Change Password
          </h3>

          <label className="flex flex-col font-medium text-gray-700">
            <span className="flex items-center gap-2 mb-1">
              <FaKey /> Reset PIN
            </span>
            <input
              type="password"
              value={resetPin}
              onChange={(e) => setResetPin(e.target.value)}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter reset PIN"
            />
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 bg-indigo-600 text-white font-semibold py-3 rounded hover:bg-indigo-700 transition shadow w-1/2 mx-auto"
        >
          Verify
        </button>
      </form>

      {/* Verified Status */}
      {isVerified && (
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-3 font-semibold text-green-800 bg-green-100 rounded-full shadow-sm">
            <FaCheckCircle className="text-green-600" />
            Settings Status: <span className="text-green-700">Verified</span>
          </div>
        </div>
      )}
    </div>
  );
}
