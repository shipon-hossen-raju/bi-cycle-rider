import { useParams } from "react-router"

export default function ProductDetails() {

   const params = useParams()
   console.log('params ', params);

  return (
    <div>
      product details
    </div>
  )
}
