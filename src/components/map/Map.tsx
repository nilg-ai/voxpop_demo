import { useEffect, useState } from 'react'
import { TileLayer, Marker, MapContainer } from "react-leaflet";
import marker from "../../assets/marker.svg";
import './Map.scss'
import 'leaflet/dist/leaflet.css';
import L, { LatLng } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster'
import { IMarker } from '../../interfaces/marker';
import { Spinner } from 'flowbite-react';

function LocationMarkers({ onSelectMarker, setLoading, isLoading }: { onSelectMarker: (marker: IMarker) => void, setLoading: (state: boolean) => void, isLoading: boolean }) {
  const customIcon = new L.Icon({
    iconUrl: marker
  })

  const [markers, setMarkers] = useState<IMarker[]>([]);

  const getData = () => {
    setLoading(true);
    fetch('https://iazscc3pr4.execute-api.us-east-1.amazonaws.com/prod/list-all-points')
      .then((res) => res.json())
      .then((res) => {
        if (res.STATUS === 'SUCCESS') {
          setMarkers(res.DATA.map((el: any) => ({
            id: el.idx,
            lat: el.lat,
            long: el.long,
          })))
        }
        setLoading(false);
      })
  }

  useEffect(() => {
    if (markers.length === 0 && !isLoading) {
      getData();
    }
  });

  return (
    <MarkerClusterGroup
      chunkedLoading
    >
      {markers.map((marker, i) => <Marker key={i} position={new LatLng(marker.lat, marker.long)} icon={customIcon} eventHandlers={{
        click: () => {
          onSelectMarker(marker)
        },
      }}>
      </Marker>)}
    </MarkerClusterGroup>
  );
}

function Map({ onSelectMarker }: { onSelectMarker: (marker: IMarker) => void }) {
  const [isLoading, setLoading] = useState<boolean>(false);

  return (
    <div className='relative'>
      {isLoading ? <div className='absolute h-full w-full z-20 bg-slate-400 opacity-70 flex justify-center items-center'><Spinner size="xl" /></div> : <></>}
      <MapContainer className='relative h-screen z-10' center={[38.75, -9.15]} zoom={14}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarkers onSelectMarker={onSelectMarker} setLoading={setLoading} isLoading={isLoading}></LocationMarkers>
      </MapContainer>
    </ div>)
}

export default Map;