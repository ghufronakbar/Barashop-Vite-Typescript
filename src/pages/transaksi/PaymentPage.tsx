import { api } from "@/config/api";
import { makeToast } from "@/helper/makeToast";
import { Api } from "@/model/Api";
import { Pesanan } from "@/model/Pesanan";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PaymentPage = () => {
  const { data } = usePayment();
  const navigate = useNavigate();

  if (!data) {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!data.transaksi.url_redirect) {
    navigate("/pesanan");
    return null;
  }

  return (
    <iframe
      src={data?.transaksi?.url_redirect}
      className="w-full"
      onLoad={(e) => {
        console.log(e.currentTarget.src);
        if (e.currentTarget.src.includes("example")) {
          navigate("/pesanan");
        }
      }}
    />
  );
};

const usePayment = () => {
  const [data, setData] = useState<Pesanan | null>(null);
  const navigate = useNavigate();
  const id = useParams().id || "";

  const fetchData = async () => {
    try {
      const res = await api.get<Api<Pesanan>>(`/pesanan/${id}`);
      setData(res.data.data);
    } catch (error) {
      makeToast("error", error);
      navigate("/pesanan");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data };
};

export default PaymentPage;
