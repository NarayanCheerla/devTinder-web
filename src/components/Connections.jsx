import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BASE_URL } from "../utils/constants";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0)
    return <h1 className="text-center">No Connections found!</h1>;

  return (
    <div className="flex flex-col items-center justify-center my-2">
      <h1 className="font-bold text-2xl">Connections</h1>
      {connections?.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, about, gender } =
          connection;
        return (
          <div
            key={_id}
            className="m-4 p-4 border rounded flex items-center gap-2"
          >
            <img
              className="w-20 h-20 rounded-full"
              src={photoUrl}
              alt="photo"
            />
            <div className="flex flex-col gap-1">
              <h2 className="font-bold">{`${firstName} ${lastName}`}</h2>
              {age && gender && (
                <h4 className="font-semibold text-sm">{`${age ?? ""}, ${gender}`}</h4>
              )}
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
