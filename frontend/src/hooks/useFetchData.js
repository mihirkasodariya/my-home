import axios from "axios";
import { useEffect, useState } from "react";

export const useFetchData = (url) => {
  const [data, setData] = useState([]); // Default to an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      if (response.data.success) {
        setData(response.data || []); // Set data as an array or default to []
      } else {
        console.log(response);
        setError("Failed to fetch data");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, refetch: fetchData };
};
