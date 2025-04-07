import { useParams } from "react-router-dom";

const DetailProductPage = () => {
  const { id } = useParams();
  return <div>DetailProduct {id}</div>;
};

export default DetailProductPage;
