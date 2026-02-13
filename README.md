# Full-Stack Shopping Cart Application



## Project Features

- **Product Listing**: Browse products fetched from PostgreSQL database
- **Cart Management**: Add/remove items with real-time updates
- **State Management**: Redux Toolkit with async thunks for API integration
- **Database First**: PostgreSQL as single source of truth for all cart operations
- **Type Safety**: Full TypeScript implementation across frontend and backend
- **Error Handling**: Comprehensive error states and validation
- **Responsive Design**: Modern, clean UI that works on all devices

## Project Architecture

### Backend (NestJS)
- **Modular Structure**: Separate modules for Products and Cart
- **TypeORM Integration**: Database entities, migrations, and relationships
- **DTO Validation**: Request/response validation with class-validator
- **RESTful API**: Clean endpoints with proper HTTP status codes
- **Single Source of Truth**: All cart calculations happen on the backend

### Frontend (React + Vite)
- **Redux Toolkit**: Efficient state management with slices
- **Async Thunks**: API integration with loading and error states
- **Component-Based**: Reusable components (ProductCard, CartItem, CartSummary)
- **Type Safety**: TypeScript interfaces for all API responses
- **Optimized Rendering**: Minimal re-renders with proper state updates

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/663a14ae-12a3-4514-93cb-4afcf5ca9e5e" />

