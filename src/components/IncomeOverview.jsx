import { useEffect, useState } from "react"
import { prepareIncomeLineChartData } from "../util/util"
import CustomLineChart from "./CustomLineChart"
import { Plus } from "lucide-react"

const IncomeOverview = ({transactions, onAddIncome}) => {

    const [chartData, setChartData] = useState([])

    useEffect(()=>{
        const result = prepareIncomeLineChartData(transactions)
        setChartData(result)
    },[transactions])

  return (
    <div className="mt-5 card">
        <div className="flex items-center justify-between">
            <div>
                <h5 className="text-lg">Income Overview</h5>
                <p className="text-xs text-gray-400 mt-0.5">
                    Track your earnings over time and analyse your income trends.
                </p>
            </div>
            <button className='add-btn' onClick={onAddIncome}>
                <Plus size={15}/> Add Income
            </button>
        </div>
        <div className="mt-10">
            {/* Create the line chart */}
            <CustomLineChart data={chartData}/>

        </div>
    </div>
  )
}

export default IncomeOverview
