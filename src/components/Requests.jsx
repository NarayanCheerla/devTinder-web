import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  const handleReveiw = async (_id, status) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequest(_id));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return <h1 className="text-center">No Requests found!</h1>;

  return (
    <div className="flex flex-col items-center justify-center my-2">
      <h1 className="font-bold text-2xl">Connection Requests</h1>
      {requests?.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, about, gender } =
          request.fromUserId;
        console.log({ firstName });
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
                <h4 className="font-semibold text-sm">{`${
                  age ?? ""
                }, ${gender}`}</h4>
              )}
              <p>{about}</p>
            </div>
            <div className="flex gap-2">
              <button
                className="btn btn-sm btn-primary"
                onClick={() => handleReveiw(request._id, "rejected")}
              >
                Reject
              </button>
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => handleReveiw(request._id, "accepted")}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
