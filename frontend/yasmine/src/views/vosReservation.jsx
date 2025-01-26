import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faCalendar,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

const Reservations = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center p-6">
      {/* Title */}
      <h1 className="text-xl font-semibold text-[#A6725A] my-8">
        Vos Réservations :
      </h1>

      {/* Card 1 */}
      <div className="bg-[#FEF5E2] shadow-md rounded-lg p-6 mb-4 max-w-lg w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 flex items-center justify-center rounded-full text-[#75574A] mr-4">
              <FontAwesomeIcon icon={faUserCircle} size="2x" />
            </div>
            <div>
              <p className="text-sm text-[#75574A] font-medium">
                Prestataire Name
              </p>
              <span className="text-xs bg-[#D08E70] text-[#F0E5CF] px-2 py-1 rounded-md">
                PHOTOGRAPHIE
              </span>
            </div>
          </div>
          <span className="text-sm bg-[#4285F4] text-white px-3 py-1 rounded-full">
            En attente
          </span>
        </div>

        {/* Booking Details */}
        <h2 className="text-lg font-semibold text-[#D08E70]">
          Portrait photography
        </h2>
        <p className="text-sm text-[#75574A] mt-2">
          <span className="flex items-center">
            <FontAwesomeIcon
              icon={faCalendar}
              className="text-[#75574A] mr-2"
            />
            2024-12-19
          </span>
          <span className="flex items-center mt-1">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="text-[#75574A] mr-2"
            />
            Château de Versailles / Wilaya
          </span>
        </p>
      </div>

      {/* Card 2 */}
      <div className="bg-[#FEF5E2] shadow-md rounded-lg p-6 mb-4 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12  flex items-center justify-center rounded-full text-[#75574A] mr-4">
              <FontAwesomeIcon icon={faUserCircle} size="2x" />
            </div>
            <div>
              <p className="text-sm text-[#75574A] font-medium">
                Prestataire Name
              </p>
              <span className="text-xs bg-[#D08E70] text-[#F0E5CF] px-2 py-1 rounded-md">
                Décorateur
              </span>
            </div>
          </div>
          <div className="text-center">
            <span className="text-sm bg-[#36BD2A] text-white px-3 py-1 rounded-full">
              Accepté
            </span>
            <p className="text-xs text-[#36BD2A] mt-1">Keep your phone on</p>
          </div>
        </div>
        <h2 className="text-lg font-semibold text-[#D08E70]">
          Big Event Decoration
        </h2>
        <p className="text-sm text-[#75574A] mt-2">
          <span className="flex items-center">
            <FontAwesomeIcon
              icon={faCalendar}
              className="text-[#75574A] mr-2"
            />
            2024-12-19
          </span>
          <span className="flex items-center mt-1">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="text-[#75574A] mr-2"
            />
            Château de Versailles / Wilaya
          </span>
        </p>
      </div>

      {/* Card 3 */}
      <div className="bg-[#FEF5E2] shadow-md rounded-lg p-6 mb-4 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12   flex items-center justify-center rounded-full text-[#75574A] mr-4">
              <FontAwesomeIcon icon={faUserCircle} size="2x" />
            </div>
            <div>
              <p className="text-sm text-[#75574A] font-medium">
                Prestataire Name
              </p>
              <span className="text-xs bg-[#D08E70] text-[#F0E5CF] px-2 py-1 rounded-md">
                Décorateur
              </span>
            </div>
          </div>
          <span className="text-sm bg-[#F44336] text-white px-3 py-1 rounded-full">
            Refusé
          </span>
        </div>
        <h2 className="text-lg font-semibold text-[#D08E70]">
          Big Event Decoration
        </h2>
        <p className="text-sm text-[#75574A] mt-2">
          <span className="flex items-center">
            <FontAwesomeIcon
              icon={faCalendar}
              className="text-[#75574A] mr-2"
            />
            2024-12-19
          </span>
          <span className="flex items-center mt-1">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="text-[#75574A] mr-2"
            />
            Château de Versailles / Wilaya
          </span>
        </p>
      </div>
    </div>
  );
};

export default Reservations;
