User Management App

This is a simple User Management App built with React Native.  
The app provides the ability to manage users by creating, updating, viewing, and deleting user details.  
Data is managed locally with Redux Toolkit as no backend or API is required for this setup.  

Key Features

- **User List**: View all users in a scrollable list.  
- **Functions**: Add, update, and delete users easily.  
- **User Details**: View full information about each user (name, email, company, phone, website, and address).  
- **Confirmation Modal**: Prevent accidental deletions with a confirmation modal.  
- **Navigation**: Easy navigation between screens using React Navigation.  
- **Reliable State**: All data is managed in one place with Redux Toolkit. 


Technologies Used

- **React Native (Expo)**: For building cross-platform mobile applications.  
- **TypeScript**: For type-safe development.  
- **Redux Toolkit**: For efficient and structured state management.  
- **React Navigation**: To handle navigation between screens.  
- **Custom Components**: Reusable UI components like confirmation modal dialogs.  



Startup the App:

1. Clone the repository:
   git clone https://github.com/Erezana/user-management-app.git

2. Navigate to the project directory:
   cd user-management-app

3. Install dependencies:
   npm install

4. Start the Expo development server:
   npx expo start

The app will now be running locally.  

### Folder Structure:
user-management-app/
├── components/           Reusable components 
├── navigation/           Navigation setup 
├── screens/              App screens (UserList, AddUser, UpdateUser, UserDetails)
├── store/                Redux slices and store configuration
├── utils/                Utility functions and helpers
└── App.tsx               Entry point of the application
