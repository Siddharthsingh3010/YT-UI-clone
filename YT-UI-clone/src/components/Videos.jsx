import React, { useEffect, useState } from "react";
import axios from "axios";
import { VIDEO_API, API_KEY } from "../constant/youtube";
import VideoCart from "./VideoCart";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setHomeVideo } from "../utils/appSlice";

const Videos = () => {

  // const [video, setVideo] = useState([]);
  const { video, category } = useSelector((store) => store.app)
  const dispatch = useDispatch();

  const fetchVideo = async () => {
    try {
      const res = await axios.get(`${VIDEO_API}`);
      // console.log(res?.data?.items)
      // setVideo(res?.data?.items);
      dispatch(setHomeVideo(res?.data?.items))

    } catch (error) {
      console.log(error);
    }
  };


  const fetchVideoByCategory = async () => {
    try {

      const res = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${category}&type=video&key=${API_KEY}`)
      dispatch(setHomeVideo(res?.data?.items))
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (category == "All") {
      fetchVideo();

    } else {

      fetchVideoByCategory();
    }

  }, [category]);

  return (
    <div className="grid grid-cols-1 object-cover  md:grid-cols-2 md:object-cover xl:grid-cols-3 xl:object-cover gap-4"
    >
      {
        video.map((item) => {
          return (
            <Link to={`/watch?v=${typeof item.id === 'object' ? item.id.videoId : item.id}`} key={typeof item.id === 'object' ? item.id.videoId : item.id}>
              <VideoCart item={item} />
            </Link>

          )
        })
      }
    </div>
  );
};

export default Videos;
