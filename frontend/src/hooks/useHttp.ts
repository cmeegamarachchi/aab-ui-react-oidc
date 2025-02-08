import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useAuth } from "react-oidc-context";

import { useConfiguration } from "@/providers/ConfigurationProvider";

interface HttpOptions {
  url: string;
  method: string;
  data?: unknown;
  headers?: Record<string, string>;
}

const useHttp = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { configuration } = useConfiguration();
  const auth = useAuth();

  const axiosInstance = useMemo(() => axios.create({ 
    baseURL: configuration.apiBaseUrl, headers: {
    Authorization: `Bearer ${auth.user?.id_token}`,
  } }),[configuration.apiBaseUrl, auth.user?.id_token]);

  let controller = new AbortController();
  useEffect(() => {
    return () => controller?.abort();
  }, []);

  const sendRequest = async ({ url, method, data = {}, headers = {} }: HttpOptions) => {
    setLoading(true);

    controller?.abort();
    controller = new AbortController();

    try {
      const response = await axiosInstance.request({
        url,
        method,
        data,
        headers,
        signal: controller.signal,
      });
      setResponse(response.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        if (axios.isAxiosError(error)) {
          setError(error.response ? error.response.data : error.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    response,
    error,
    loading,
    sendRequest,
  };
};

export default useHttp;
