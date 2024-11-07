import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import Spinner from "../../components/Spinner"
import { getSubCategoryById } from "../../api/SubCategoryAPI"
import EditSubCategoryForm from "../../components/subcategory/EditSubCategoryForm"

export default function EditSubCategoryView() {
    const params = useParams()
    const subcategoryId = params.subcategoryId!
    
    const { data, isLoading } = useQuery({
        queryKey: ['editSubCategory', subcategoryId],
        queryFn: () => getSubCategoryById(subcategoryId),
        retry: false
    })

    if (isLoading) return <Spinner />
    if (data) return <EditSubCategoryForm data={data} subcategoryId={subcategoryId} />
}
