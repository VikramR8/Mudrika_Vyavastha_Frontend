import { useEffect, useState } from "react"
import EmojiPickerPopup from "./EmojiPickerPopup"
import Input from "./Input"
import { LoaderCircle } from "lucide-react"

const AddIncomeForm = ({ onAddIncome, categories }) => {
  const [income, setIncome] = useState({
    name: "",
    amount: "",
    date: "",
    icon: "",
    categoryId: "",
  })
  const [loading, setLoading] = useState(false)

  const categoryOptions = categories.map(category => ({
    value: category.id,
    label: category.name,
  }))

  const handleChange = (key, value) => {
    setIncome(prev => ({ ...prev, [key]: value }))
  }

  const handleAddIncome = async () => {
    setLoading(true)
    try {
      await onAddIncome(income)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (categories.length > 0 && !income.categoryId) {
      setIncome(prev => ({ ...prev, categoryId: categories[0].id }))
    }
  }, [categories])

  return (
    <>
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(icon)=>handleChange("icon", icon)}
      />

      <Input
        value={income.name}
        onChange={({ target }) => handleChange("name", target.value)}
        label="Income Source"
      />

      <Input
        value={income.categoryId}
        onChange={({ target }) => handleChange("categoryId", Number(target.value))}
        isSelect
        options={categoryOptions}
        label="Category"
      />

      <Input
        value={income.amount}
        onChange={({ target }) => handleChange("amount", Number(target.value))}
        label="Amount"
        type="number"
      />

      <Input
        value={income.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button onClick={handleAddIncome} disabled={loading} className="add-btn add-btn-fill">
          {loading ? <><LoaderCircle className="animate-spin w-4 h-4"/> Adding...</> : "Add Income"}
        </button>
      </div>
    </>
  )
}

export default AddIncomeForm
