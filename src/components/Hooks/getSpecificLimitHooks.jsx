import axios from "axios";
import { useEffect, useState } from "react";

export function useLimitHooks(url, limit) {
  let [limits, setlimits] = useState([]);
  async function getTrending() {
    try {
     let { data } = await axios.get(url);
      setlimits(data.results.slice(0,limit));
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getTrending();
  });
  return limits;
}
