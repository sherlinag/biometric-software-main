import React from "react";
import { FaCircle, FaClipboardList } from "react-icons/fa";

export default function Devices() {
  const deviceData = [
    {
      serialNo: "SN-00123",
      name: "Device 01",
    
      personLog: "Last log: 2025-05-29 10:15 AM",
      status: "online",
      events: "12 Events",
    },
    {
      serialNo: "SN-00456",
      name: "Device 02",

      personLog: "Last log: 2025-05-29 9:05 AM",
      status: "offline",
      events: "0 Events",
    },
    {
      serialNo: "SN-00789",
      name: "Device 03",

      personLog: "Last log: 2025-05-28 5:45 PM",
      status: "online",
      events: "5 Events",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto mt-24 px-6 font-sans antialiased">
      <h1
        className="text-4xl font-extrabold text-gray-900 mb-10 border-b-4 border-indigo-700 pb-3 text-center tracking-wide"
        style={{
          fontFamily: "'STIX Two Math', 'Cambria Math', Georgia, serif",
        }}
      >
        Devices
      </h1>

      <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-300 bg-white">
        <table className="min-w-full border-collapse">
          <thead className="bg-indigo-100 sticky top-0 shadow-sm z-20">
            <tr>
              <th className="text-left font-semibold text-indigo-900 px-8 py-4 border-b border-gray-300">
                SI No
              </th>
              <th className="text-left font-semibold text-indigo-900 px-8 py-4 border-b border-gray-300">
                Device Serial No.
              </th>
              <th className="text-left font-semibold text-indigo-900 px-8 py-4 border-b border-gray-300">
                Device Name
              </th>
              <th className="text-left font-semibold text-indigo-900 px-8 py-4 border-b border-gray-300">
                Persons
              </th>
              <th className="text-left font-semibold text-indigo-900 px-8 py-4 border-b border-gray-300">
                Status
              </th>
              <th className="text-left font-semibold text-indigo-900 px-8 py-4 border-b border-gray-300">
                Events
              </th>
            </tr>
          </thead>
          <tbody>
            {deviceData.map((device, index) => (
              <tr
                key={index}
                className="even:bg-gray-50 odd:bg-white hover:bg-indigo-50 transition-colors cursor-default"
              >
                <td className="px-8 py-5 text-gray-700 font-medium whitespace-nowrap">
                  {index + 1}
                </td>
                <td className="px-8 py-5 text-gray-800 font-semibold whitespace-nowrap">
                  {device.serialNo || "\u00A0"}
                </td>
                <td className="px-8 py-5 text-gray-900 font-semibold whitespace-nowrap">
                  {device.name || "\u00A0"}
                </td>
                <td className="px-8 py-5 whitespace-normal text-gray-700">
                  <div className="font-semibold">{device.person || "\u00A0"}</div>
                  <div className="text-xs text-gray-500 mt-1">{device.personLog || "\u00A0"}</div>
                </td>
                <td className="px-8 py-5 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center gap-2 px-4 py-1 rounded-full text-sm font-semibold shadow-sm ${
                      device.status === "online"
                        ? "bg-green-200 text-green-900"
                        : "bg-red-200 text-red-900"
                    }`}
                  >
                    <FaCircle
                      className={
                        device.status === "online"
                          ? "text-green-700"
                          : "text-red-700"
                      }
                      size={12}
                    />
                    {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
                  </span>
                </td>
                <td className="px-8 py-5 text-indigo-700 font-medium whitespace-nowrap flex items-center gap-2">
                  <FaClipboardList className="text-indigo-500" />
                  {device.events}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
