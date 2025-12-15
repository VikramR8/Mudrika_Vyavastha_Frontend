import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { Plus } from "lucide-react";
import CategoryList from "../components/CategoryList";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndPoints";
import toast from "react-hot-toast";
import Modal from "../components/Modal";
import AddCategoryForm from "../components/AddCategoryForm";

const Category = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategoryDetails = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.GET_ALL_CATEGORIES
      );
      if (response.status === 200) {
        setCategoryData(response.data);
      }
    } catch (error) {
      toast.error("Failed to fetch categories");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryDetails();
  }, []);
  const handleAddCategory = async (category) => {
    const { name, type, icon } = category;

    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    const isDuplicate = categoryData.some(
      (c) => c.name.toLowerCase() === name.trim().toLowerCase()
    );

    if (isDuplicate) {
      toast.error("Category already exists");
      return;
    }

    try {
      const response = await axiosConfig.post(
        API_ENDPOINTS.ADD_CATEGORY,
        { name, type, icon }
      );

      if (response.status === 201) {
        toast.success("Category added successfully");
        setOpenAddCategoryModal(false);
        fetchCategoryDetails();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add category"
      );
    }
  };
  const handleEditCategory = (categoryToEdit) => {
    setSelectedCategory(categoryToEdit);   
    setOpenEditCategoryModal(true);
  };

  const handleUpdateCategory = async (updatedCategory) => {
    const {id, name, type, icon} = updatedCategory;
    if(!name.trim()) {
        toast.error("Category name is required")
        return
    }

    if(!id) {
        toast.error("Category ID is missing for update")
        return;
    }

    try {
        await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id), {name,type, icon})
        setOpenEditCategoryModal(false)
        setSelectedCategory(null)
        toast.success("Category updated successfully")
        fetchCategoryDetails()
    } catch(e){
        console.error("Error updating category", e.response?.data?.message || e.message)
        toast.error(e.response?.data?.message|| "Failed to update category.")
    }
  };

  return (
    <Dashboard activeMenu="Category">
      <div className="my-5 mx-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-semibold">All Categories</h2>
          <button
            onClick={() => setOpenAddCategoryModal(true)}
            className="add-btn flex items-center gap-1"
          >
            <Plus size={15} /> Add Category
          </button>
        </div>

        {/* LIST */}
        <CategoryList
          categories={categoryData}
          onEditCategory={handleEditCategory}
        />

        {/* ADD MODAL */}
        <Modal
          isOpen={openAddCategoryModal}
          onClose={() => setOpenAddCategoryModal(false)}
          title="Add Category"
        >
          <AddCategoryForm
            onSubmit={handleAddCategory}
          />
        </Modal>

        {/* EDIT MODAL */}
        <Modal
          isOpen={openEditCategoryModal}
          title="Update Category"
          onClose={() => {
            setOpenEditCategoryModal(false);
            setSelectedCategory(null);
          }}
        >
          {selectedCategory && (
            <AddCategoryForm
              isEditing={true}
              initialCategoryData={selectedCategory}
              onSubmit={handleUpdateCategory}
            />
          )}
        </Modal>
      </div>
    </Dashboard>
  );
};

export default Category;
