import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUserCircle,
  FaEye,
  FaTrashAlt,
} from "react-icons/fa";

const BookingCards = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("/api/reservations");
        setBookings(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des réservations :", error);
      }
    };

    fetchBookings();
  }, []);

  const accepterReservation = async (id) => {
    try {
      const response = await axios.patch(`/api/reservations/${id}`, {
        reservation_status: "accepté",
      });
      console.log(response.data.message);
      fetchBookings();
    } catch (error) {
      console.error("Erreur lors de l'acceptation de la réservation :", error);
    }
  };

  const refuserReservation = async (id) => {
    try {
      const response = await axios.patch(`/api/reservations/${id}`, {
        reservation_status: "refusé",
      });
      console.log(response.data.message);
      fetchBookings();
    } catch (error) {
      console.error("Erreur lors du refus de la réservation :", error);
    }
  };

  return (
    <div className="bg-gray-100 p-8">
      {bookings.map((booking, index) => (
        <div
          key={index}
          className="bg-[#FEF5E2] shadow-md rounded-lg p-6 mb-6 max-w-lg mx-auto relative"
        >
          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex space-x-2 items-center">
            <button
              className="bg-[#36BD2A] text-white px-2 py-2 rounded-lg shadow hover:bg-green-600"
              onClick={() => accepterReservation(booking.id)}
            >
              Accepté
            </button>
            <button
              className="bg-[#F44336] text-white px-2 py-2 rounded-lg shadow hover:bg-red-600"
              onClick={() => refuserReservation(booking.id)}
            >
              Refusé
            </button>
          </div>

          {/* Client Details */}
          <div className="flex items-start">
            <div className="w-12 h-12 flex items-center justify-center rounded-full text-[#75574A] mr-4">
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
