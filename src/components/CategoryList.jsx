import { Pencil, Tag } from "lucide-react";

const CategoryList = ({ categories, onEditCategory }) => {
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold">Category Sources</h4>
      </div>

      {/* Category list */}
      {categories.length === 0 ? (
        <p className="text-gray-500">
          No categories added yet. Add some to get started!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100/60"
            >
              {/* Icon */}
              <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
                {category.icon ? (
                  <img
                    src={category.icon}
                    alt={category.name}
                    className="w-5 h-5"
                  />
                ) : (
                  <Tag className="text-primary" size={24} />
                )}
              </div>

              {/* Details */}
              <div className="flex-1 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-700 font-medium">
                    {category.name}
                  </p>
                  <p className="text-sm text-gray-400 font-medium mt-1 capitalize">
                    {category.type}
                  </p>
                </div>

                {/* Edit button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // 🔥 VERY IMPORTANT (mobile fix)
                    onEditCategory(category);
                  }}
                  className="
                    text-gray-400 hover:text-blue-500 cursor-pointer
                    opacity-100 md:opacity-0 md:group-hover:opacity-100
                    transition-opacity
                  "
                >
                  <Pencil size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryList;
