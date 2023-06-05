import { useParams } from "react-router";
import Asteroid from "../Asteroid";

const Details: React.FC = () => {
  let params = useParams();
  
  if (!params.id) return null;

  return (
    <Asteroid id={params.id} />
  );
};

export default Details;
