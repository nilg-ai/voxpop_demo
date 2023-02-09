import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import CookieConsent from "react-cookie-consent";
import Header from './components/header/Header';
import Map from './components/map/Map';
import MarkerDetail from './components/marker-detail/MarkerDetail';
import { IMarker } from './interfaces/IMarker';

function App() {
  const [isShowingDetail, showDetail] = React.useState(false);
  const [selectedMarker, setSelectedMarker] = useState<IMarker | undefined>(undefined);

  function closeDetails() {
    showDetail(false);
  }

  function onSelectMarker(marker: IMarker) {
    showDetail(true);
    setSelectedMarker(marker);
  }

  return (
    <>
      <Header></Header>
      <div className="relative">
        {isShowingDetail ? (
          <div className="absolute h-full sm:w-full md:w-1/3 lg:w-1/4 w-full z-20">
            <MarkerDetail selectedMarker={selectedMarker} onCloseDetails={closeDetails}></MarkerDetail>
          </div>
        ) : (
          <></>
        )}
        <div className="relative z-10">
          <Map onSelectMarker={onSelectMarker}></Map>
        </div>
      </div>
      <CookieConsent
        location="bottom"
        buttonText="Ok"
        cookieName="userId"
        cookieValue={uuid()}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </>
  );
}
export default App;
