import React from 'react';
import Header from './components/header/Header';
import Map from './components/map/Map';
import MarkerDetail from './components/marker-detail/MarkerDetail';

function App() {
  const [isShow, setIsShow] = React.useState(true);

  function showDetails() {
    setIsShow(!isShow);
  }

  return (
    <>
      <Header></Header>
      <button onClick={showDetails}>Show details</button>
      <div className='flex'>
        {isShow ? <MarkerDetail></MarkerDetail> : <></>}
      </div>
      <Map></Map>
    </>
  );
}

export default App;
