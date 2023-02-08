import { useEffect, useState } from 'react'
import { TileLayer, Marker, MapContainer } from "react-leaflet";
import marker from "../../assets/marker.svg";
import 'leaflet/dist/leaflet.css';
import L, { LatLng } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster'
import { IMarker } from '../../interfaces/IMarker';
import { Spinner } from 'flowbite-react';
import './Map.scss';

function LocationMarkers({ onSelectMarker, setLoading, isLoading }: { onSelectMarker: (marker: IMarker) => void, setLoading: (state: boolean) => void, isLoading: boolean }) {
  const [selectedMarker, setSelectedMarker] = useState<IMarker | undefined>(undefined);
  const [markers, setMarkers] = useState<IMarker[]>([]);
  const [isError, setError] = useState<boolean>(false);

  const markerHtmlStyles = (color: string) => `
    background-color: ${color};
    width: 1rem;
    height: 1rem;
    left: -0.2rem;
    top: -0.2rem;
    position: relative;
    border-radius: 50%;`;
  const icon = (color: string) => L.divIcon({
    html: `<div style="${markerHtmlStyles(color)}" />`
  })


  const selectedMarkerHtmlStyles = `
    background-image: url(${marker});
    width: 2rem;
    height: 2rem;
    left: -0.45rem;
    top: -0.9rem;
    position: relative;
    border-radius: 50%;
    background-repeat: no-repeat;`;

  const selectedIcon = L.divIcon({
    html: `<div style="${selectedMarkerHtmlStyles}" />`
  })


  const getData = () => {
    setLoading(true);
    fetch('https://iazscc3pr4.execute-api.us-east-1.amazonaws.com/prod/list-all-points', {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer d7IYY9RbF"
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.STATUS === 'SUCCESS') {
          setMarkers(res.DATA.map((el: any) => ({
            id: el.idx,
            lat: el.lat,
            long: el.long,
            color: el.point_color_code
          })))
        } else {
          setError(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        console.error(err);
      })
  }

  useEffect(() => {
    if (markers.length === 0 && !isLoading && !isError) {
      getData();
    }
  });

  return (
    <MarkerClusterGroup
      chunkedLoading
    >
      {markers.map((marker, i) => <Marker key={i} position={new LatLng(marker.lat, marker.long)} icon={marker.lat === selectedMarker?.lat && marker.long === selectedMarker.long ? selectedIcon : icon(marker.color ?? '#FFFFFF')} eventHandlers={{
        click: () => {
          setSelectedMarker(marker);
          onSelectMarker(marker);
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
      <MapContainer className='relative h-screen z-10' center={[38.75, -9.15]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarkers onSelectMarker={onSelectMarker} setLoading={setLoading} isLoading={isLoading}></LocationMarkers>
      </MapContainer>
    </ div>)
}

export default Map;