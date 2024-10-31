import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getAddressById } from "../../api/AddressAPI"
import Spinner from "../../components/Spinner"
import EditAddressForm from "../../components/address/EditAddressForm"

export default function EditAddressView() {
    const params = useParams()
    const addressId = params.addressId!

    const { data, isLoading } = useQuery({
        queryKey: ['editAddress', addressId],
        queryFn: () => getAddressById(addressId),
        retry: false
    })

    if (isLoading) return <Spinner />
    if (data) return <EditAddressForm data={data} addressId={addressId} />
}
