import { HiCurrencyDollar, HiMiniUserGroup, HiMiniUserPlus } from "react-icons/hi2";
import { RiCalendarCheckLine } from "react-icons/ri";
import SummaryCard from "../components/SummaryCard";
import Calendar from "./Calendar";

export default function Home() {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pb-5 bg-">
                <SummaryCard Icon={RiCalendarCheckLine} name='Total Booking' bgcolor='bg-green-600' price='1.507' />
                <SummaryCard Icon={HiMiniUserPlus} name='Total New Customers'  bgcolor='bg-pink-600' price='195.5' />
                <SummaryCard Icon={HiCurrencyDollar} name='Total Earnings' bgcolor='bg-orange-600'  price='S/25.500' />
                <SummaryCard Icon={HiMiniUserGroup} name='Total' bgcolor='bg-yellow-500'  price='700' />
            </div>
            <Calendar/>
           
        </>
    );
}
