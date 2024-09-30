import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { addFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      if (!feed) {
        const res = await axios.get(`${BASE_URL}/user/feed`, {
          withCredentials: true,
        });
        dispatch(addFeed(res.data));
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    feed && (
      <div className="flex justify-center my-1">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
