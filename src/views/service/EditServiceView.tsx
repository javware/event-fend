import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import Spinner from "../../components/Spinner"
import { getServiceById } from "../../api/ServiceAPI"
import EditServiceForm from "../../components/service/EditServiceForm"

export default function EditServiceView() {
    const params = useParams()
    const serviceId = params.serviceId!

    const { data, isLoading } = useQuery({
        queryKey: ['editService', serviceId],
        queryFn: () => getServiceById(serviceId),
        retry: false
    })

    if (isLoading) return <Spinner />
    if (data) return <EditServiceForm data={data} serviceId={serviceId} />
}
