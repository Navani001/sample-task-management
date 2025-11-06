# Product Dashboard - Frontend

A comprehensive product management dashboard built with React.js and Next.js using Hero UI (NextUI) for the user interface.

## Features

### ✨ Core Features
- **Product CRUD Operations**
  - ✅ Create new products
  - ✅ View all products in table or grid layout
  - ✅ Edit existing products (inline modal)
  - ✅ Delete products with confirmation popup

- **Search & Filter**
  - ✅ Real-time search by product name or category
  - ✅ Filter by category
  - ✅ Dynamic filtering with instant results

- **Dashboard Statistics**
  - ✅ Total products count
  - ✅ Total inventory value
  - ✅ Low stock alerts
  - ✅ Out of stock warnings

### 🎨 UI Features
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Dual View Modes** - Switch between table and grid layouts
- **Hero UI Components** - Clean, modern design system
- **Toast Notifications** - Success and error feedback
- **Loading States** - Smooth user experience with loading indicators
- **Confirmation Dialogs** - Safe delete operations

### 🛠 Technical Features
- **TypeScript** - Fully typed for better development experience
- **Mock Data Support** - Works with mock data when backend is unavailable
- **Custom Hooks** - Reusable state management with `useProducts`
- **Service Layer** - Clean API abstraction with error handling
- **Context API** - Global toast notification system

## Project Structure

```
src/
├── app/
│   ├── dashbord/
│   │   └── page.tsx           # Main dashboard page
│   └── layout.tsx             # Root layout with providers
├── components/
│   └── product/
│       ├── ProductsTable.tsx   # Main table component with view toggle
│       ├── ProductGrid.tsx     # Grid view component
│       ├── ProductForm.tsx     # Add/Edit product modal
│       ├── ProductStats.tsx    # Dashboard statistics
│       ├── DeleteConfirmation.tsx  # Delete confirmation modal
│       └── index.ts            # Component exports
├── hooks/
│   └── useProducts.ts         # Product state management hook
├── services/
│   └── productService.ts      # API service layer
├── contexts/
│   └── ToastContext.tsx       # Toast notification provider
├── types/
│   └── product.ts             # TypeScript type definitions
├── data/
│   └── mockData.ts            # Mock data for development
└── utils/
    └── axios/
        └── axios.ts           # HTTP client configuration
```

## Components Overview

### ProductsTable
The main dashboard component that provides:
- Product statistics overview
- Search and filter controls
- View mode toggle (table/grid)
- Product listing with actions

### ProductForm
Modal form for creating and editing products:
- Input validation
- Category selection
- Price and stock management
- Real-time form updates

### ProductGrid
Alternative grid view for products:
- Card-based layout
- Product image placeholders
- Quick action buttons
- Responsive grid system

### ProductStats
Dashboard statistics component showing:
- Total products count
- Total inventory value
- Low stock alerts (< 10 items)
- Out of stock products

## Data Flow

1. **useProducts Hook** manages all product state
2. **productService** handles API calls with fallback to mock data
3. **Toast notifications** provide user feedback
4. **Real-time filtering** updates display based on search/filter criteria

## Mock Data

The application includes comprehensive mock data with 8 sample products across different categories:
- Electronics (iPhone, MacBook)
- Clothing (Nike shoes, Winter jacket)
- Books (The Great Gatsby)
- Home & Garden (Garden shovel)
- Sports (Basketball)
- Toys (LEGO sets)

## Usage

### Running the Dashboard

1. Navigate to the dashboard:
   ```
   http://localhost:3000/dashbord
   ```

2. The dashboard will load with mock data automatically

### Adding Products

1. Click the "Add Product" button
2. Fill in the product form:
   - **Name**: Product name (required)
   - **Category**: Select from dropdown (required)
   - **Price**: Decimal price in USD (required)
   - **Stock**: Integer quantity (required)
3. Click "Add Product" to save

### Editing Products

1. Click the edit (pencil) icon on any product
2. Modify the product details in the modal
3. Click "Update Product" to save changes

### Deleting Products

1. Click the delete (trash) icon on any product
2. Confirm deletion in the popup
3. Product will be removed from the list

### Search & Filter

- Use the search box to find products by name or category
- Use the category dropdown to filter by specific categories
- Clear filters by clearing the search or selecting "All Categories"

### View Modes

- **Table View**: Detailed tabular display with sortable columns
- **Grid View**: Card-based layout optimized for visual browsing
- Toggle between views using the icons in the top-right

## API Integration

To connect to your backend API:

1. Update `src/services/productService.ts`
2. Set `USE_MOCK_DATA = false`
3. Configure your API endpoints in the `ENDPOINTS` object
4. Ensure your backend matches the expected API contract:

```typescript
// Expected API endpoints:
GET    /api/products           // List all products
GET    /api/products/:id       // Get single product
POST   /api/products           // Create product
PUT    /api/products/:id       // Update product
DELETE /api/products/:id       // Delete product
```

## Product Schema

```typescript
interface Product {
  _id?: string;          // MongoDB ID
  id?: string;           // Alternative ID
  name: string;          // Product name
  category: string;      // Product category
  price: number;         // Price in USD
  stock: number;         // Available quantity
  createdAt?: string;    // Creation timestamp
  updatedAt?: string;    // Last update timestamp
}
```

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Hero UI (NextUI)** - UI component library
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Axios** - HTTP client
- **React Hooks** - State management

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- Optimized rendering with React.memo where appropriate
- Efficient filtering using useMemo
- Lazy loading for modal components
- Minimal re-renders with proper dependency arrays

The dashboard is designed to handle large product catalogs efficiently and provides a smooth user experience across all devices.