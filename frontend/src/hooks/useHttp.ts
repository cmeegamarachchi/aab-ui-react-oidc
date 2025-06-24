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

  const authEnabled = import.meta.env.VITE_AUTH_ENABLED !== "false";

  const axiosInstance = useMemo(() => axios.create({ 
    baseURL: configuration.apiBaseUrl, headers: {
    ...(authEnabled && auth.user?.id_token ? { Authorization: `Bearer ${auth.user?.id_token}` } : {}),
  } }),[configuration.apiBaseUrl, auth?.user?.id_token, authEnabled]);

  let controller = new AbortController();
  useEffect(() => {
    return () => controller?.abort();
  }, []);

  const sendRequest = async ({ url, method, data = {}, headers = {} }: HttpOptions) => {
    setLoading(true);

    controller?.abort();
    controller = new AbortController();

    try {
      setError("");
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
        throw error;
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