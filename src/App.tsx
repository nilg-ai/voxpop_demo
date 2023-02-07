import React from 'react';
import Header from './components/header/Header';
import Map from './components/map/Map';
import MarkerDetail from './components/marker-detail/MarkerDetail';

function App() {
  const [isShow, setIsShow] = React.useState(false);

  function showDetails() {
    setIsShow(!isShow);
  }

  return (
    <>
      <Header></Header>
      <button onClick={showDetails}>Show details</button>
      <div className='relative'>
        <div className='absolute h-full sm:w-full md:w-1/3 lg:w-1/4 w-full z-20'>
          {isShow ? <MarkerDetail></MarkerDetail> : <></>}
        </div>
        <div className='relative z-10'>
          <Map></Map>
        </div>
      </div>
    </>
  );
}

export default App;
