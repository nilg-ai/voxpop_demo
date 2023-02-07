import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { IMarker } from "../../interfaces/marker";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";


const MarkerDetail = ({ selectedMarker, onCloseDetails }: { selectedMarker: IMarker | undefined, onCloseDetails: () => void }) => {
  const [selectedMarkerDetail, setMarkerDetail] = useState<IMarker | undefined>(undefined);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isLikeLoading, setLikeLoading] = useState<boolean>(false);
  const [alreadyVoted, setVote] = useState<boolean>(false);

  useEffect(() => {
    if (selectedMarker) {
      getMarkerDetails(selectedMarker.lat, selectedMarker.long)
    }
  }, [selectedMarker]);

  const getMarkerDetails = (lat: number, long: number) => {
    setLoading(true);
    setVote(false);
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
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error:', error);
      });
  }

  const onAction = (lat?: number, long?: number, like: boolean = true) => {
    setLikeLoading(true);
    fetch(`https://iazscc3pr4.execute-api.us-east-1.amazonaws.com/prod/point-feedback?lat=${lat}&longt=${long}&is_like=${like}`, {
      method: 'POST',
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
          });
          setVote(true);
        }
        setLikeLoading(false);
      })
      .catch((error) => {
        setLikeLoading(false);
        console.error('Error:', error);
      });
  }

  return (
    <div className="flex flex-col bg-slate-400 h-full">
      {isLoading ? <>
        <div className="self-center mt-3">
          <Spinner
            size="xl"
          />
        </div>
      </> :
        <>
          <div className="absolute top-0 right-0">
            <Button className="bg-transparent hover:bg-transparent active:bg-transparent focus:ring-transparent" onClick={onCloseDetails}>
              <AiOutlineClose />
            </Button>
          </div>
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
          {alreadyVoted ? <div className="flex flex-col bg-blue-700 text-white items-center p-3 ">
            <div className="font-bold text-2xl text-center">Thank you for your vote</div></div> : isLikeLoading ? <div className="self-center mt-3">
              <Spinner
                size="xl"
              />
            </div> : <div className="flex flex-col bg-blue-700 text-white items-center p-3 ">
            <div className="font-bold text-2xl text-center">Do you agree with the classification?</div>
            <div className="flex mt-3 gap-3">
              <div className="text-center">
                <Button onClick={() => onAction(selectedMarkerDetail?.lat, selectedMarkerDetail?.long)} className="rounded-full !h-20 w-20 !bg-white "><FaThumbsUp className="text-3xl text-green-500" /></Button>
                <div className="text-base mt-1">Yes</div>
              </div>
              <div className="text-center">
                <Button onClick={() => onAction(selectedMarkerDetail?.lat, selectedMarkerDetail?.long, false)} className="rounded-full !h-20 w-20 !bg-white "><FaThumbsDown className="text-3xl text-red-500" /></Button>
                <div className="text-base mt-1">No</div>
              </div>
            </div>
          </div>}
        </>}
    </div>
  );
};

export default MarkerDetail;