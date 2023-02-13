import { useEffect, useState } from 'react'
import { TileLayer, Marker, MapContainer, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L, { LatLng } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster'
import { Button, Spinner } from 'flowbite-react';
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { BsArrow90DegRight } from "react-icons/bs";
import { FaRegMap } from "react-icons/fa";

import marker from "../../assets/marker.svg";
import { IMarker } from '../../interfaces/IMarker';
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
            color: el.point_color_code,
            likes: el.likes,
            dislikes: el.dislikes,
            address: el.img_name,
            directionsUrl: el.GOOGLE_MAPS_URL
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
        click: (event) => {
          setSelectedMarker(marker);
          onSelectMarker(marker);
          event.target.closePopup();
        },
        mouseover: (event) => { if (marker.lat !== selectedMarker?.lat || marker.long !== selectedMarker.long) { event.target.openPopup() } },
      }}>
        <Popup>
          <div className="flex flex-col">
            <div className='flex justify-content items-center'>
              <div className='whitespace-normal w-3/5'>{marker.address}</div>
              <div className='flex w-2/5 gap-1 justify-end'>
                <Button onClick={() => { }} className="!rounded-full !h-8 w-8 !bg-blue-700">
                  <BsArrow90DegRight className="text-sm font-semibold" />
                </Button>
                <a href={marker.directionsUrl} target="_blank" rel="noreferrer">
                  <Button className="!rounded-full !h-8 w-8 !bg-white !border-slate-500/25">
                    <FaRegMap className="text-sm font-semibold text-blue-700" />
                  </Button>
                </a>
              </div>
            </div>
            <div className="flex text-slate-300 items-center mt-2">
              <FaThumbsUp /> <span className="ml-1">{marker.likes}</span>
              <FaThumbsDown className="ml-5" /> <span className="ml-1">{marker.dislikes}</span>
            </div>
          </div>
        </Popup>
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