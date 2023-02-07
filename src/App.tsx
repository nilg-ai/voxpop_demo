import React, { useState } from 'react';
import Header from './components/header/Header';
import Map from './components/map/Map';
import MarkerDetail from './components/marker-detail/MarkerDetail';
import { IMarker } from './interfaces/marker';

function App() {
  const [isShow, setIsShow] = React.useState(false);
  const [selectedMarker, setSelectedMarker] = useState<IMarker | undefined>(undefined);

  function closeDetails() {
    setIsShow(false);
  }

  function onSelectMarker(marker: IMarker) {
    setIsShow(true);
    setSelectedMarker(marker);
  }

  return (
    <>
      <Header></Header>
      <div className="relative">
        <div className="absolute h-full sm:w-full md:w-1/3 lg:w-1/4 w-full z-20">
          {isShow ? (
            <MarkerDetail selectedMarker={selectedMarker} onCloseDetails={closeDetails}></MarkerDetail>
          ) : (
            <></>
          )}
        </div>
        <div className="relative z-10">
          <Map onSelectMarker={onSelectMarker}></Map>
        </div>
      </div>
    </>
  );
}
export default App;
