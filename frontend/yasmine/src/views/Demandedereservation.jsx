import React from "react";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUserCircle,
  FaEye,
  FaTrashAlt,
} from "react-icons/fa";

const BookingCards = () => {
  const bookings = [
    {
      clientName: "Maria D.",
      email: "maria.d@email.com",
      phone: "06 12 34 56 78",
      title: "Portrait Photography",
      date: "2024-12-15",
      location: "Château de Versailles / Wilaya",
    },
    {
      clientName: "Maria D.",
      email: "maria.d@email.com",
      phone: "06 12 34 56 78",
      title: "Event Photography",
      date: "2024-12-19",
      location: "Château de Versailles / Wilaya",
    },
  ];

  return (
    <div className="bg-gray-100 p-8">
      {bookings.map((booking, index) => (
        <div
          key={index}
          className="bg-[#FEF5E2] shadow-md rounded-lg p-6 mb-6 max-w-lg mx-auto relative"
        >
          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex space-x-2 items-center">
            <button className="text-[#A6725A] hover:text-[#75574A] flex items-center">
              <FaEye className="mr-1" />
            </button>
            <button className="bg-[#F44336] text-white px-2 py-2 rounded-lg shadow hover:bg-red-600">
              Refusé
            </button>
            <button className="bg-[#36BD2A] text-white px-2 py-2 rounded-lg shadow hover:bg-green-600">
              Accepté
            </button>
            <button className="text-[#A6725A] hover:text-[#75574A]">
              <FaTrashAlt />
            </button>
          </div>

          {/* Client Details */}
          <div className="flex items-start">
            <div className="w-12 h-12  flex items-center justify-center rounded-full text-[#75574A] mr-4">
              <FaUserCircle className="text-6xl" />
            </div>
            <div>
              <p className="text-sm text-[#75574A] font-medium">
                {booking.clientName}
              </p>
              <p className="text-sm text-[#D08E70]">{booking.email}</p>
              <p className="text-sm text-[#D08E70]">{booking.phone}</p>
            </div>
          </div>

          {/* Booking Details */}
          <h2 className="mt-4 text-lg font-semibold text-[#D08E70]">
            {booking.title}
          </h2>
          <p className="text-sm text-[#75574A] mt-2">
            <span className="flex items-center">
              <FaCalendarAlt className="text-[#75574A] mr-2" />
              {booking.date}
            </span>
            <span className="flex items-center mt-1">
              <FaMapMarkerAlt className="text-[#75574A] mr-2" />
              {booking.location}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default BookingCards;
