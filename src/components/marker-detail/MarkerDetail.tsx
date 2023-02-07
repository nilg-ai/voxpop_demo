import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { IMarker } from "../../interfaces/marker";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";


const MarkerDetail = ({ selectedMarker }: { selectedMarker: IMarker | undefined }) => {
  const [selectedMarkerDetail, setMarkerDetail] = useState<IMarker | undefined>(undefined);

  useEffect(() => {
    if (selectedMarker) {
      getMarkerDetails(selectedMarker.lat, selectedMarker.long)
    }
  }, [selectedMarker]);

  const getMarkerDetails = (lat: number, long: number) => {
    fetch(`https://iazscc3pr4.execute-api.us-east-1.amazonaws.com/prod/get-point-metadata?lat=${lat}&longt=${long}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.STATUS === 'SUCCESS') {
          const marker = res.DATA[0];
          setMarkerDetail({
            lat: marker.lat,
            long: marker.long,
            likes: marker.likes,
            dislikes: marker.dislikes
          })
        }
      })
  }

  const onAction = (lat?: number, long?: number, like: boolean = true) => {
    fetch(`https://iazscc3pr4.execute-api.us-east-1.amazonaws.com/prod/point-feedback?lat=${lat}&longt=${long}&is_like=${like}`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.STATUS === 'SUCCESS') {
          const marker = res.DATA[0];
          setMarkerDetail({
            lat: marker.lat,
            long: marker.long,
            likes: marker.likes,
            dislikes: marker.dislikes
          })
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div className="flex flex-col bg-slate-400 h-full">
      <div>Street name</div>
      <div className="flex">
        <FaThumbsUp /> {selectedMarkerDetail?.likes}
        <FaThumbsDown /> {selectedMarkerDetail?.dislikes}
      </div>
      <hr />
      <div className="flex">
        Directions and view region
      </div>
      <hr />
      <div className="flex">
        icons
      </div>
      <div className="flex flex-col bg-blue-700 text-white items-center p-3 ">
        <div className="font-bold text-2xl text-center">Do you agree with the classification?</div>
        <div className="flex mt-3 gap-3">
          <div className="text-center">
            <Button onClick={() => onAction(selectedMarkerDetail?.lat, selectedMarkerDetail?.long)} className="rounded-full !h-20 w-20 !bg-white "><FaThumbsUp className="text-3xl text-green-500" /></Button>
            <div className="text-base">Yes</div>
          </div>
          <div className="text-center">
            <Button onClick={() => onAction(selectedMarkerDetail?.lat, selectedMarkerDetail?.long, false)} className="rounded-full !h-20 w-20 !bg-white "><FaThumbsDown className="text-3xl text-red-500" /></Button>
            <div className="text-base">No</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkerDetail;