import { useEffect, useState } from "react";
import Input from "./Input";
import EmojiPickerPopup from "./EmojiPickerPopup";
import { LoaderCircle } from "lucide-react";

const AddCategoryForm = ({
  onSubmit,
  initialCategoryData,
  isEditing = false,
}) => {
  const [category, setCategory] = useState({
    name: "",
    type: "income",
    icon: "",
  });

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (isEditing && initialCategoryData) {
      setCategory({
        id: initialCategoryData.id,         
        name: initialCategoryData.name || "",
        type: initialCategoryData.type || "income",
        icon: initialCategoryData.icon || "",
      });
    }

    // Reset only when switching to ADD mode
    if (!isEditing) {
      setCategory({
        name: "",
        type: "income",
        icon: "",
      });
    }
  }, [isEditing, initialCategoryData]);

  /**
   * INPUT CHANGE
   */
  const handleChange = (key, value) => {
    setCategory((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  /**
   * SUBMIT HANDLER
   */
  const handleSubmit = async () => {
    if (!category.name.trim()) return;

    setLoading(true);
    try {
      await onSubmit(category);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      {/* ICON PICKER */}
      <EmojiPickerPopup
        icon={category.icon}
        onSelect={(icon) => handleChange("icon", icon)}
      />

      {/* CATEGORY NAME */}
      <Input
        label="Category Name"
        value={category.name}
        onChange={(e) => handleChange("name", e.target.value)}
        placeholder="e.g. Salary, Groceries"
      />

      {/* CATEGORY TYPE */}
      <Input
        label="Category Type"
        value={category.type}
        onChange={(e) => handleChange("type", e.target.value)}
        isSelect
        options={[
          { label: "Income", value: "income" },
          { label: "Expense", value: "expense" },
        ]}
      />

      {/* SUBMIT */}
      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="add-btn-fill"
        >
          {loading ? (
            <>
              <LoaderCircle className="w-4 h-4 animate-spin" />
              {isEditing ? "Updating..." : "Adding..."}
            </>
          ) : (
            isEditing ? "Update Category" : "Add Category"
          )}
        </button>
      </div>
    </div>
  );
};

export default AddCategoryForm;
