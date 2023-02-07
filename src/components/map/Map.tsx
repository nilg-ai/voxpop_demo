import { useEffect, useState } from 'react'
import { TileLayer, Marker, MapContainer } from "react-leaflet";
import marker from "../../assets/marker.svg";
import './Map.scss'
import 'leaflet/dist/leaflet.css';
import L, { LatLng } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster'
import { IMarker } from '../../interfaces/marker';

function LocationMarkers(props: any) {
  const customIcon = new L.Icon({
    iconUrl: marker
  })

  const [markers, setMarkers] = useState<IMarker[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

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
    if(markers.length === 0 && !isLoading) {
      getData();
    }
  }, [markers.length, isLoading]);

  return (
    <MarkerClusterGroup
      chunkedLoading
    >
      {markers.map((marker, i) => <Marker key={i} position={new LatLng(marker.lat, marker.long)} icon={customIcon} eventHandlers={{
        click: () => {
          props.onSelectMarker(marker)
        },
      }}>
      </Marker>)}
    </MarkerClusterGroup>
  );
}

function Map(props: any) {
  return (<>
    <MapContainer className='h-screen' center={[38.75, -9.15]} zoom={14}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarkers onSelectMarker={props.onSelectMarker}></LocationMarkers>
    </MapContainer>
  </>)
}

export default Map;