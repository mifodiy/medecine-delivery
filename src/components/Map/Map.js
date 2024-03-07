import { GoogleMap, Marker, DirectionsRenderer} from '@react-google-maps/api'
import { useSelector } from "react-redux";

const Map = ({ directionResponse }) => {
  const { activeCoordinates } = useSelector(state => state.shops);

  const containerStyle = {
    width: '100%',
    height: '300px'
  };


  return (
    <GoogleMap
      center={activeCoordinates}
      zoom={15}
      mapContainerStyle={containerStyle}
      options={{
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false
      }}>
      <Marker position={activeCoordinates} />
      {directionResponse && <DirectionsRenderer directions={directionResponse} />}
    </GoogleMap>
  )
}

export default Map;