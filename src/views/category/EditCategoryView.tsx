import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import Spinner from "../../components/Spinner"
import { getCategoryById } from "../../api/CategoryAPI"
import EditCategoryForm from "../../components/category/EditCategoryForm"

export default function EditCategoryView() {
    const params = useParams()
    const categoryId = params.categoryId!

    const { data, isLoading } = useQuery({
        queryKey: ['editCategory', categoryId],
        queryFn: () => getCategoryById(categoryId),
        retry: false
    })

    if (isLoading) return <Spinner />
    console.log(data)
    if (data) return <EditCategoryForm data={data} categoryId={categoryId} />
}
