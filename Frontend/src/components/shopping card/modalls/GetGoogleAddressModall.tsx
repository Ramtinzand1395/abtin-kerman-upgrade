import { useEffect, useRef, useState } from "react";
import "@neshan-maps-platform/mapbox-gl-react/dist/style.css";
import mapboxgl from "@neshan-maps-platform/mapbox-gl";
import axios from "axios";
import { toast } from "react-toastify";
import { User } from "../../../types";
import BtnTow from "../../utils/BtnTow";
import Spiner from "../../utils/Spiner";

interface GetGoogleAddressModallProps {
  setOpenInfo: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  setUserInfo: React.Dispatch<React.SetStateAction<User>>;
}

const GetGoogleAddressModall: React.FC<GetGoogleAddressModallProps> = ({
  setOpenInfo,
  setOpenChange,
  setUserInfo,
}) => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [currentPosition, setCurrentPosition] = useState<[number, number] | null>(null);
  const [altitude, setAltitude] = useState<mapboxgl.LngLat | null>(null);
  const [loading, setLoading] = useState(true); // Loading state for the map

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition([longitude, latitude]);
        setLoading(false); // Stop loading when position is retrieved
      },
      (error) => {
        console.error("Error getting location", error);
        setCurrentPosition([51.392173, 35.730954]); // Default location
        setLoading(false); // Stop loading even if using default location
      }
    );
  }, []);

  useEffect(() => {
    if (mapContainerRef.current && currentPosition) {
      if (!mapRef.current) {
        mapRef.current = new mapboxgl.Map({
          mapType: mapboxgl.Map.mapTypes.neshanVector,
          container: mapContainerRef.current,
          zoom: 12,
          pitch: 0,
          center: currentPosition,
          minZoom: 2,
          maxZoom: 21,
          trackResize: true,
          mapKey: "web.9769f65e037047f18e87ed818a5e7e68",
          poi: false,
          traffic: false,
        }) as unknown as mapboxgl.Map;

        mapRef.current.on("load", () => {
          drawMarkerOnMap(currentPosition);
        });
      } else {
        mapRef.current.setCenter(currentPosition);
      }
    }
  }, [currentPosition]);

  function drawMarkerOnMap(position: [number, number]) {
    const map = mapRef.current;

    if (map) {
      const popup = new mapboxgl.Popup({ offset: 25 }).setText(
        " (مختصات فعلی شما) با نگه داشتن مارکر می‌توانید آن را روی نقشه جابه‌جا کنید "
      );
      const marker = new mapboxgl.Marker({ color: "#00F975", draggable: true })
        .setPopup(popup)
        .setLngLat(position)
        .addTo(map)
        .togglePopup();

      marker.on("dragend", () => {
        const markerLngLat = marker.getLngLat();
        setAltitude(markerLngLat);
      });
    }
  }

  const fetchAddress = (lat: number, lng: number) => {
    axios
      .get(`https://api.neshan.org/v4/reverse?lat=${lat}&lng=${lng}`, {
        headers: {
          "Api-Key": "service.b787c6b591dd463b8c081245d75a2d36",
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.status === "OK") {
          setUserInfo((prev) => ({
            ...prev,
            address: {
              ...prev.address,
              address: data.formatted_address,
              city: data.city,
              provider: data.state,
            },
          }));
          setOpenInfo(true);
          setOpenChange(false);
        } else {
          toast.error("آدرس پیدا نشد.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("خطا در گرفتن آدرس");
      });
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-60vh">
          <div className="loader">
            <Spiner />
          </div>
        </div>
      ) : (
        <div ref={mapContainerRef} id="map" style={{ width: "100%", height: "60vh" }} />
      )}
      <div className="flex items-center justify-end">
        <BtnTow
          ButtonColor="bg-green-500 hover:from-green-500 hover:to-green-400 hover:ring-green-400 mt-5"
         

        ButtonText=" ثبت آدرس"
        onClick={() => altitude && fetchAddress(altitude.lat, altitude.lng)}
      />
      </div>
    </>
  );
};

export default GetGoogleAddressModall;
