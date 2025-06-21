import { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Tag, Calendar, ChevronDown, ChevronRight, Folder, FolderOpen } from 'lucide-react';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([
    { 
      id: 1, 
      name: 'Electronics', 
      description: 'Electronic devices and accessories', 
      itemCount: 45, 
      dateAdded: '2024-01-15',
      subcategories: [
        { id: 11, name: 'Smartphones', description: 'Mobile phones and accessories', itemCount: 15, dateAdded: '2024-01-16' },
        { id: 12, name: 'Laptops', description: 'Portable computers', itemCount: 8, dateAdded: '2024-01-17' },
        { id: 13, name: 'Accessories', description: 'Electronic accessories', itemCount: 22, dateAdded: '2024-01-18' }
      ]
    },
    { 
      id: 2, 
      name: 'Clothing', 
      description: 'Apparel and fashion items', 
      itemCount: 78, 
      dateAdded: '2024-01-20',
      subcategories: [
        { id: 21, name: 'Men\'s Wear', description: 'Men\'s clothing items', itemCount: 35, dateAdded: '2024-01-21' },
        { id: 22, name: 'Women\'s Wear', description: 'Women\'s clothing items', itemCount: 43, dateAdded: '2024-01-22' }
      ]
    },
    { 
      id: 3, 
      name: 'Books', 
      description: 'Educational and recreational reading materials', 
      itemCount: 32, 
      dateAdded: '2024-02-05',
      subcategories: [
        { id: 31, name: 'Fiction', description: 'Novels and stories', itemCount: 18, dateAdded: '2024-02-06' },
        { id: 32, name: 'Non-Fiction', description: 'Educational and reference books', itemCount: 14, dateAdded: '2024-02-07' }
      ]
    },
    { 
      id: 4, 
      name: 'Home & Garden', 
      description: 'Home improvement and gardening supplies', 
      itemCount: 56, 
      dateAdded: '2024-02-10',
      subcategories: []
    }
  ]);
  
  const [newCategory, setNewCategory] = useState({ name: '', description: '', isSubcategory: false, parentId: null });
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState(new Set([1, 2, 3]));
  const [selectedParent, setSelectedParent] = useState('');

  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      if (newCategory.isSubcategory && selectedParent) {
        // Add subcategory
        const subcategory = {
          id: Date.now(),
          name: newCategory.name,
          description: newCategory.description,
          itemCount: 0,
          dateAdded: new Date().toISOString().split('T')[0]
        };
        
        setCategories(categories.map(cat => 
          cat.id === parseInt(selectedParent)
            ? { ...cat, subcategories: [...cat.subcategories, subcategory] }
            : cat
        ));
      } else {
        // Add main category
        const category = {
          id: Date.now(),
          name: newCategory.name,
          description: newCategory.description,
          itemCount: 0,
          dateAdded: new Date().toISOString().split('T')[0],
          subcategories: []
        };
        setCategories([...categories, category]);
      }
      
      setNewCategory({ name: '', description: '', isSubcategory: false, parentId: null });
      setSelectedParent('');
    }
  };

  const handleEditCategory = (category, parentId = null) => {
    setEditingCategory({ ...category, parentId });
    setNewCategory({ 
      name: category.name, 
      description: category.description, 
      isSubcategory: !!parentId,
      parentId 
    });
    setSelectedParent(parentId ? parentId.toString() : '');
  };

  const handleUpdateCategory = () => {
    if (newCategory.name.trim()) {
      if (editingCategory.parentId) {
        // Update subcategory
        setCategories(categories.map(cat => 
          cat.id === editingCategory.parentId
            ? {
                ...cat,
                subcategories: cat.subcategories.map(sub => 
                  sub.id === editingCategory.id 
                    ? { ...sub, name: newCategory.name, description: newCategory.description }
                    : sub
                )
              }
            : cat
        ));
      } else {
        // Update main category
        setCategories(categories.map(cat => 
          cat.id === editingCategory.id 
            ? { ...cat, name: newCategory.name, description: newCategory.description }
            : cat
        ));
      }
      
      setEditingCategory(null);
      setNewCategory({ name: '', description: '', isSubcategory: false, parentId: null });
      setSelectedParent('');
    }
  };

  const handleDeleteCategory = (id, parentId = null) => {
    if (parentId) {
      // Delete subcategory
      setCategories(categories.map(cat => 
        cat.id === parentId
          ? { ...cat, subcategories: cat.subcategories.filter(sub => sub.id !== id) }
          : cat
      ));
    } else {
      // Delete main category
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  const toggleCategory = (categoryId) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.subcategories.some(sub => 
      sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalSubcategories = categories.reduce((sum, cat) => sum + cat.subcategories.length, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add/Edit Category Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f] transform hover:scale-[1.02] transition-transform duration-200">
          <h3 className="text-lg font-semibold text-[#1f3b73] mb-4 flex items-center gap-2">
            <Tag className="h-5 w-5 text-[#e1a95f]" />
            {editingCategory ? 'Edit Category' : 'Add New Category'}
          </h3>
          
          <div className="space-y-4">
            {/* Category Type Toggle */}
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="categoryType"
                  checked={!newCategory.isSubcategory}
                  onChange={() => {
                    setNewCategory({ ...newCategory, isSubcategory: false });
                    setSelectedParent('');
                  }}
                  className="text-[#1f3b73] focus:ring-[#e1a95f]"
                />
                <span className="text-sm text-[#1f3b73]">Main Category</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="categoryType"
                  checked={newCategory.isSubcategory}
                  onChange={() => setNewCategory({ ...newCategory, isSubcategory: true })}
                  className="text-[#1f3b73] focus:ring-[#e1a95f]"
                />
                <span className="text-sm text-[#1f3b73]">Subcategory</span>
              </label>
            </div>

            {/* Parent Category Selection */}
            {newCategory.isSubcategory && (
              <div>
                <label className="block text-sm font-medium text-[#1f3b73] mb-2">
                  Parent Category
                </label>
                <select
                  value={selectedParent}
                  onChange={(e) => setSelectedParent(e.target.value)}
                  className="w-full px-4 py-2 border border-[#e1a95f] rounded-lg focus:ring-2 focus:ring-[#e1a95f] focus:border-transparent transition-colors"
                >
                  <option value="">Select parent category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-[#1f3b73] mb-2">
                Category Name
              </label>
              <input
                type="text"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                className="w-full px-4 py-2 border border-[#e1a95f] rounded-lg focus:ring-2 focus:ring-[#e1a95f] focus:border-transparent transition-colors"
                placeholder="Enter category name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#1f3b73] mb-2">
                Description
              </label>
              <textarea
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                className="w-full px-4 py-2 border border-[#e1a95f] rounded-lg focus:ring-2 focus:ring-[#e1a95f] focus:border-transparent transition-colors resize-none"
                rows="3"
                placeholder="Enter category description"
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={editingCategory ? handleUpdateCategory : handleAddCategory}
                disabled={newCategory.isSubcategory && !selectedParent}
                className="flex items-center gap-2 px-4 py-2 bg-[#1f3b73] text-white rounded-lg hover:bg-[#2d4a8a] transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="h-4 w-4" />
                {editingCategory ? 'Update Category' : 'Add Category'}
              </button>
              
              {editingCategory && (
                <button
                  onClick={() => {
                    setEditingCategory(null);
                    setNewCategory({ name: '', description: '', isSubcategory: false, parentId: null });
                    setSelectedParent('');
                  }}
                  className="px-4 py-2 border border-[#e1a95f] text-[#1f3b73] rounded-lg hover:bg-[#e1a95f] hover:text-white transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Statistics */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
          <h3 className="text-lg font-semibold text-[#1f3b73] mb-4">Category Overview</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-gradient-to-br from-[#1f3b73] to-[#2d4a8a] p-4 rounded-lg text-white">
              <div className="text-2xl font-bold">{categories.length}</div>
              <div className="text-sm opacity-90">Main Categories</div>
            </div>
            
            <div className="bg-gradient-to-br from-[#e1a95f] to-[#d4964f] p-4 rounded-lg text-white">
              <div className="text-2xl font-bold">{totalSubcategories}</div>
              <div className="text-sm opacity-90">Subcategories</div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-3 rounded-lg">
              <div className="text-lg font-bold text-[#1f3b73]">
                {categories.reduce((sum, cat) => sum + cat.itemCount, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Items</div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-[#1f3b73] font-medium mb-2">Recent Activity</div>
            <div className="text-xs text-gray-600">
              Last category added: {categories.length > 0 ? categories[categories.length - 1]?.name : 'None'}
            </div>
          </div>
        </div>
      </div>

      {/* Category List */}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-[#e1a95f]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h3 className="text-lg font-semibold text-[#1f3b73] flex items-center gap-2">
            <Folder className="h-5 w-5 text-[#e1a95f]" />
            Categories & Subcategories ({filteredCategories.length})
          </h3>
          
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#e1a95f] rounded-lg focus:ring-2 focus:ring-[#e1a95f] focus:border-transparent transition-colors"
              placeholder="Search categories and subcategories..."
            />
          </div>
        </div>

        {filteredCategories.length === 0 ? (
          <div className="text-center py-12">
            <Folder className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              {searchTerm ? 'No categories found matching your search.' : 'No categories added yet.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCategories.map((category) => (
              <div key={category.id} className="border border-[#e1a95f] rounded-lg overflow-hidden">
                {/* Main Category */}
                <div className="bg-gradient-to-r from-[#1f3b73] to-[#2d4a8a] text-white p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleCategory(category.id)}
                        className="p-1 hover:bg-white/20 rounded transition-colors"
                      >
                        {expandedCategories.has(category.id) ? 
                          <ChevronDown className="h-4 w-4" /> : 
                          <ChevronRight className="h-4 w-4" />
                        }
                      </button>
                      <div className="flex items-center gap-2">
                        {expandedCategories.has(category.id) ? 
                          <FolderOpen className="h-5 w-5" /> : 
                          <Folder className="h-5 w-5" />
                        }
                        <div>
                          <h4 className="font-semibold text-lg">{category.name}</h4>
                          <p className="text-sm opacity-90">{category.description}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right text-sm">
                        <div className="font-medium">{category.itemCount} items</div>
                        <div className="opacity-75">{category.subcategories.length} subcategories</div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditCategory(category)}
                          className="p-2 hover:bg-white/20 rounded transition-colors"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
                          className="p-2 hover:bg-red-500/20 rounded transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subcategories */}
                {expandedCategories.has(category.id) && (
                  <div className="bg-gray-50">
                    {category.subcategories.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">
                        <Tag className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                        <p>No subcategories yet. Add one using the form above.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
                        {category.subcategories.map((subcategory) => (
                          <div
                            key={subcategory.id}
                            className="bg-white border border-[#e1a95f]/50 rounded-lg p-4 hover:shadow-md transition-shadow"
                          >
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <Tag className="h-4 w-4 text-[#e1a95f]" />
                                  <h5 className="font-medium text-[#1f3b73]">{subcategory.name}</h5>
                                </div>
                                <p className="text-gray-600 text-sm">{subcategory.description}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                              <span>{subcategory.itemCount} items</span>
                              <span>{subcategory.dateAdded}</span>
                            </div>
                            
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditCategory(subcategory, category.id)}
                                className="flex-1 flex items-center justify-center gap-1 px-2 py-1 text-[#1f3b73] border border-[#1f3b73] rounded hover:bg-[#1f3b73] hover:text-white transition-colors text-xs"
                              >
                                <Edit2 className="h-3 w-3" />
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteCategory(subcategory.id, category.id)}
                                className="flex-1 flex items-center justify-center gap-1 px-2 py-1 text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white transition-colors text-xs"
                              >
                                <Trash2 className="h-3 w-3" />
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryManagement;