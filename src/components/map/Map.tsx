import { useEffect, useState } from 'react'
import { TileLayer, Marker, MapContainer, Popup } from "react-leaflet";
import marker from "../../assets/marker.svg";
import './Map.scss'
import 'leaflet/dist/leaflet.css';
import L, { LatLng } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster'

function LocationMarkers() {
  const customIcon = new L.Icon({
    iconUrl: marker
  })

  const [markers, setMarkers] = useState<any[]>([]);

  const getData = () => {
    fetch('https://iazscc3pr4.execute-api.us-east-1.amazonaws.com/prod/list-all-points')
      .then((res) => res.json())
      .then((res) => {
        if (res.STATUS === 'SUCCESS') {
          setMarkers(res.DATA.map((el: any) => ({
            id: el.idx,
            pos: new LatLng(el.lat, el.long),
          })))
        }
      })
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <MarkerClusterGroup
      chunkedLoading
    >
      {markers.map((marker, i) => <Marker key={i} position={marker.pos} icon={customIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>)}
    </MarkerClusterGroup>
  );
}

function Map() {
  return (<>
    <MapContainer className='h-screen' center={[38.75, -9.15]} zoom={14}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarkers></LocationMarkers>
    </MapContainer>
  </>)
}

export default Map;