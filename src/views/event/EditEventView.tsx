import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import Spinner from "../../components/Spinner"
import EditEventForm from "../../components/event/EditEventForm"
import { getEventById } from "../../api/EventAPI"

export default function EditEventView() {
    const params = useParams()
    const eventId = params.eventId!

    const { data, isLoading } = useQuery({
        queryKey: ['editEvent', eventId],
        queryFn: () => getEventById(eventId),
        retry: false
    })

    if (isLoading) return <Spinner />
    if (data) return <EditEventForm data={data} eventId={eventId} />
}
