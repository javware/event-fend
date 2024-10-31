type SummaryCardProps = {
    Icon: React.ElementType
    name: String
    price: String
    bgcolor: string
}

export default function SummaryCard({ Icon, name, price, bgcolor }: SummaryCardProps) {

    return (
        <div className="flex items-center bg-white rounded-lg p-2 gap-2">
            <div className="rounded-full bg-sky-600">
                <Icon className="text-2xl m-3 text-white" />
            </div>
            <div className="w-full">
                <h4 className="text-primary text-sm font-medium">{name}</h4>
                <div className="flex items-end justify-between">
                    <div className="text-gray-700 font-semibold text-2xl ">{price}</div>
                    <div className={`text-xs font-medium ${bgcolor} text-white rounded-lg py-0.5 px-1`}>+2.98%</div>
                </div>
            </div>
        </div>
    )
}
