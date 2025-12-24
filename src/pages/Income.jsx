import React, { useEffect, useState } from 'react'
import Dashboard from '../components/Dashboard'
import { API_ENDPOINTS } from '../util/apiEndPoints'
import axiosConfig from '../util/axiosConfig'
import toast from 'react-hot-toast'
import IncomeList from '../components/IncomeList'
import Modal from '../components/Modal'
import AddIncomeForm from '../components/AddIncomeForm'
import DeleteAlert from '../components/DeleteAlert'
import IncomeOverview from '../components/IncomeOverview'

const Income = () => {

    const [incomeData, setIncomeData] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false)
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show:false,
        data:null,
    })

    const fetchIncomeDetails = async () =>{
        try {
          const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES)
          if(response.status === 200) {
            setIncomeData(response.data)
          }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch income details")
        }
    }

    const fetchIncomeCategories = async () =>{
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("income"))
            if(response.status ===200) {
                setCategories(response.data)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch income categories')
        }
    }

    const handleAddIncome = async (income) => {
        const {name, amount, date, icon, categoryId} = income

        if(!name.trim()) return toast.error("Name is required")
        if(!amount || isNaN(amount) || Number(amount)<=0) return toast.error("Amount should be valid")
        if(!date) return toast.error("Please select a date")
        if(!categoryId) return toast.error("Please select a category")

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME,{
                name,
                amount:Number(amount),
                date,
                icon,
                categoryId,
            })

            if (response.status === 201) {
                setOpenAddIncomeModal(false)
                toast.success("Income added successfully")
                fetchIncomeDetails()
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add income')
        }
    }

    useEffect(()=>{
        fetchIncomeDetails()
        fetchIncomeCategories()
    }, [])

    const deleteIncome = async(id) =>{
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id))
            setOpenDeleteAlert({show:false, data:null})
            toast.success("Income deleted successfully")
            fetchIncomeDetails()
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete income')
        } 
    }

    const handleDownloadIncomeDetails = async() => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD, 
                {responseType:"blob"})
            let fileName = "Income_Details.xlsx"
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute("download", fileName)
            document.body.appendChild(link)
            link.click()
            link.parentNode.removeChild(link)
            window.URL.revokeObjectURL(url)
            toast.success("Downloaded income details successfully")
        } catch(e) {
            console.error('Error downloading icnome details: ', e)
            toast.error(e.response?.data?.message || "Failed to download income")
        }
    }

    const handleEmailIncomeDetails = async() => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_INCOME)
            if(response.status === 200) {
                toast.success("Income details emailed successfully")
            }
        } catch (e) {
            console.error("Error emailing income details: ", e)
            toast.error(e.response?.data?.message|| "Failed to email income")
        }
    }

    return (
        <Dashboard activeMenu="Income">
            <div className='my-5 mx-auto grid grid-cols-1 gap-6'>
                <div>
                    {/* Overview for income with line chart */}
                    <IncomeOverview transactions={incomeData} onAddIncome={()=>setOpenAddIncomeModal(true)}/>
                </div>

                <IncomeList 
                    transactions={incomeData}
                    onDelete={(id)=>setOpenDeleteAlert({show:true, data:id})}
                    onDownload={handleDownloadIncomeDetails}
                    onEmail={handleEmailIncomeDetails}
                />

                {/* Add income Modal */}
                <Modal
                    isOpen={openAddIncomeModal}
                    onClose={()=>setOpenAddIncomeModal(false)}
                    title="Add Income"
                >
                    <AddIncomeForm
                        onAddIncome={handleAddIncome}
                        categories={categories}
                    />
                </Modal>

                {/* Delete income Modal */}
                <Modal
                    isOpen={openDeleteAlert.show}
                    onClose={()=>setOpenDeleteAlert({show:false, data:null})}
                    title="Delete Income"
                >
                    <DeleteAlert
                        content={"Are you sure that you want to delete this income details?"}
                        onDelete={()=>deleteIncome(openDeleteAlert.data)}
                    />
                </Modal>
            </div>
        </Dashboard>
    )
}

export default Income
