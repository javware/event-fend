type SummaryCardProps = {
    Icon: React.ElementType
    name: String
    price: String
}

export default function SummaryCard({ Icon, name, price }: SummaryCardProps) {
    return (
        <div className="flex items-center  bg-white rounded-lg p-2 gap-2">
            <div className="rounded-full bg-cyan-500/10">
                <Icon className="text-2xl m-3 text-gray-600"/>
            </div>
            <div className="w-full">
                <h4 className="text-gray-600 text-sm font-medium">{name}</h4>
                <div className="flex items-end justify-between">
                    <div className="font-semibold text-2xl ">{price}</div>
                    <div className="text-xs font-medium bg-cyan-500/15 rounded-lg py-0.5 px-1">+2.98%</div>
                </div>
            </div>
        </div>
    )
}
