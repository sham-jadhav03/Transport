import React from 'react'

const LocationSearchPanel = ({ suggestions, setPanelOpen, setVehiclePanel, setPickup, setDestination, activeField }) => {

  const handlesuggestionClick = (suggestions) => {
    if (activeField === 'pickup') {
      setPickup(suggestions)
    }
    else if (activeField === 'destination') {
      setDestination(suggestions)
    }
    // setVehiclePanel(true)
    // setPanelOpen(false)
  }
  return (
    <div>
      {/* Display fetched suggestions */}
      {suggestions.map((elem, idx) => (
        <div key={idx} onClick={() => {
          handlesuggestionClick(elem)
        }} className='flex gap-4 border-2 p-3 border-gray-100 active:border-black rounded-xl items-start my-2 justify-start'>
          <h2 className='bg-white mt-4 h-8 flext items-center justify-center w-12 rounded-full'>
            <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className='font-medium right-6'>{elem}</h4>
        </div>
      ))
      }
    </div>
  );
}

export default LocationSearchPanel
