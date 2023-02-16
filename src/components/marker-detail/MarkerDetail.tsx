import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { IMarker } from "../../interfaces/IMarker";
import { FaThumbsUp, FaThumbsDown, FaRegMap } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { BsArrow90DegRight } from "react-icons/bs";
import Feature from "../feature/Feature";
import getCookie from "../../utils/get-cookie";


const MarkerDetail = ({ selectedMarker, onCloseDetails }: { selectedMarker: IMarker | undefined, onCloseDetails: () => void }) => {
  const [selectedMarkerDetail, setMarkerDetail] = useState<IMarker | undefined>(undefined);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isLikeLoading, setLikeLoading] = useState<boolean>(false);
  const [alreadyVoted, setVote] = useState<boolean>(false);
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    if (selectedMarker) {
      getMarkerDetails(selectedMarker.lat, selectedMarker.long)
    }
  }, [selectedMarker]);

  const getMarkerDetails = async (lat: number, long: number) => {
    setLoading(true);
    setVote(false);

    fetch(`${process.env.REACT_APP_API_URL}/get-point-metadata?lat=${lat}&longt=${long}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`
      },
    })
      .then((res) => res.json())
      .then((res) => {

        if (res.STATUS === 'SUCCESS') {
          const marker = res.DATA[0];
          setMarkerDetail({
            lat: marker.lat,
            long: marker.long,
            likes: marker.likes,
            dislikes: marker.dislikes,
            directionsUrl: marker.GOOGLE_MAPS_URL,
            features: marker.features.map((f: any) => ({
              label: f.label,
              prob: f.prob,
              icon: f.icon
            })),
            address: marker.address
          })
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err)
      })

  }

  const onAction = (lat?: number, long?: number, like: boolean = true) => {
    setLikeLoading(true);
    const cookie: string | undefined = getCookie('userId')
    fetch(`${process.env.REACT_APP_API_URL}/point-feedback?lat=${lat}&longt=${long}&is_like=${like}&cookie=${cookie ? cookie : ''}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`
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
            dislikes: marker.dislikes,
            directionsUrl: marker.GOOGLE_MAPS_URL,
            features: selectedMarkerDetail?.features?.map((f: any) => ({
              label: f.label,
              prob: f.prob,
              icon: f.icon
            })),
            address: selectedMarkerDetail?.address
          });
        }
        setMessage(res.MESSAGE);
        setVote(true);
        setLikeLoading(false);
      })
      .catch((error) => {
        setLikeLoading(false);
        console.error('Error:', error);
      });
  }

  return (
    <div className="flex flex-col bg-white h-full shadow-[0_0_12px_rgb(0,0,0,0.1)] overflow-auto">
      {isLoading ?
        <div className="self-center mt-3">
          <Spinner
            size="xl"
          />
        </div> :
        <>
          <div className="absolute top-0 right-0">
            <Button className="!bg-transparent !hover:bg-transparent !active:bg-transparent focus:!ring-0 !focus:ring-transparent !text-black" onClick={onCloseDetails}>
              <AiOutlineClose />
            </Button>
          </div>
          <div className="mt-5 p-3 font-medium text-base">{selectedMarkerDetail?.address}</div>
          <div className="flex p-3 text-slate-300 items-center">
            <FaThumbsUp /> <span className="ml-1">{selectedMarkerDetail?.likes}</span>
            <FaThumbsDown className="ml-5" /> <span className="ml-1">{selectedMarkerDetail?.dislikes}</span>
          </div>
          <hr className="my-3" />
          <div className="flex mt-3 gap-10 justify-center">
            <div className="flex flex-col items-center">
              <Button className="!rounded-full !h-14 w-14 !bg-nilg-blue">
                <BsArrow90DegRight className="text-2xl font-semibold" />
              </Button>
              <div className="mt-1 text-xs font-semibold">Directions</div>
            </div>
            <div className="flex flex-col items-center">
              <a href={selectedMarkerDetail?.directionsUrl} target="_blank" rel="noreferrer">
                <Button className="!rounded-full !h-14 w-14 !bg-white !border-slate-500/25">
                  <FaRegMap className="text-2xl font-semibold !text-nilg-blue" />
                </Button>
              </a>
              <div className="mt-1 text-xs font-semibold">View Region</div>
            </div>
          </div>
          <hr className="my-3" />
          <div className="grid grid-cols-3 p-3">
            {selectedMarkerDetail?.features?.map((f, i) => <Feature key={i} label={f.label} prob={f.prob} icon={f.icon} />)}
          </div>
          {alreadyVoted ?
            <div className="flex flex-col bg-nilg-blue text-white items-center p-3 mt-auto justify-center">
              <div className="font-bold text-2xl text-center">{message}</div>
            </div> :
            isLikeLoading ?
              <div className="self-center mt-auto p-3">
                <Spinner
                  size="xl"
                />
              </div> :
              <div className="flex flex-col bg-nilg-blue text-white items-center p-3 mt-auto justify-center mt-auto">
                <div className="font-bold text-2xl text-center">Do you agree with the classification?</div>
                <div className="flex mt-3 gap-3">
                  <div className="text-center">
                    <Button onClick={() => onAction(selectedMarkerDetail?.lat, selectedMarkerDetail?.long)} className="!rounded-full !h-20 w-20 !bg-white ">
                      <FaThumbsUp className="text-3xl text-nilg-green" />
                    </Button>
                    <div className="text-base mt-1">Yes</div>
                  </div>
                  <div className="text-center">
                    <Button onClick={() => onAction(selectedMarkerDetail?.lat, selectedMarkerDetail?.long, false)} className="!rounded-full !h-20 w-20 !bg-white ">
                      <FaThumbsDown className="text-3xl text-nilg-orange" />
                    </Button>
                    <div className="text-base mt-1">No</div>
                  </div>
                </div>
              </div>}
        </>}
    </div>
  );
};

export default MarkerDetail;