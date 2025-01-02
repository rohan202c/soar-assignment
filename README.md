# SOAR Assignment - Rohan Chaudhari - rohanc3634@gmail.com



## Live Application URL

### https://ornate-eclair-3f0b05.netlify.app/admin/index
This URL has the application deployed in

## Prerequisites

### Install Node JS
Refer to https://nodejs.org/en/ to install nodejs

### Install create-react-app
Install create-react-app npm package globally. This will help to easily run the project and also build the source files easily. Use the following command to install create-react-app

```bash
npm install -g create-react-app
```
## Live Application URL

The Application is deployed in https://ornate-eclair-3f0b05.netlify.app/admin/index

Click on the link to see the application

## Cloning and Running the Application in local

Clone the project into local

Install all the npm packages. Go into the project folder and type the following command to install all npm packages

```bash
npm install
```

In order to run the application Type the following command

```bash
npm start
```

The Application Runs on **localhost:3000**

## Application design

#### Components

## `index.js` - Entry Point for the Application

The `index.js` file serves as the entry point for the React application. It is responsible for rendering the main application layout and setting up routing for the app. Below is a breakdown of its functionality:

### Key Responsibilities:
- **Imports:** 
  - The necessary CSS files for fonts and styles.
  - React, ReactDOM, and required components from `react-router-dom` for routing.
  - The `AdminLayout` component, which is the main layout of the application.
  
- **Routing:** 
  - Uses `BrowserRouter` to handle the routing of the application.
  - Defines two routes:
    - `/admin/*`: Displays the `AdminLayout` component for all paths under `/admin`.
    - A fallback route (`*`): Redirects to `/admin/index` if no other route matches.

- **Rendering:**
  - The file uses the `ReactDOM.render` method (for React 17 and earlier) to render the root of the application to the DOM. If you're using React 18 or later, you can switch to `ReactDOM.createRoot()`.

### Example Flow:
When the app is loaded, it will show the `AdminLayout` component for routes starting with `/admin`. If the user navigates to any other route, they are redirected to `/admin/index`.

This is the starting point for setting up the rest of the application’s routes and components.

## `Admin.js` - Admin Layout Component

The `Admin.js` file sets up the main layout for the admin panel. It handles routing, displays the sidebar, navbar, and footer, and manages scroll behavior.

### Key Features:
- **Routing:** Dynamically renders routes based on the configuration in `routes.js`.
- **Sidebar & Navbar:** Displays navigation links and the current route name.
- **Footer:** Includes a consistent footer across all admin pages.
- **Scroll Behavior:** Resets the scroll position when navigating between routes.

This component serves as the base for the admin interface, providing a responsive layout and structure.


## `Sidebar.js` - Sidebar Component

The `Sidebar.js` file renders the sidebar navigation for the admin panel. It provides links to different routes and includes user profile management and notifications.

### Key Features:
- **Dynamic Links:** The sidebar generates links from a route configuration passed via props.
- **User Profile & Notifications:** Displays a user profile dropdown and notifications for the admin.
- **Collapsible:** The sidebar can be collapsed on mobile devices to improve responsiveness.
- **Logo:** Displays a logo with an option to navigate to an internal or external link.
  
This component enhances the admin panel by providing an organized, responsive, and interactive sidebar.


## `AdminNavbar.js` - Admin Navbar Component

The `AdminNavbar.js` component renders the top navigation bar for the admin panel. It includes the brand text, a search bar, and user profile management dropdown. 

### Key Features:
- **Brand Text:** Displays the brand name as a link to the home page.
- **Search Bar:** Allows users to search for content from the navbar.
- **User Profile Dropdown:** Displays the user profile, with links to settings, activity, and support. Includes a logout option.
  
This component provides a functional and accessible navigation bar for the admin interface, with profile management and search functionality.


## `Index.js` - Dashboard Main Page

The `Index.js` component is the main dashboard page for the application. It renders a set of components that display card statistics, recent transactions, weekly activity, expense statistics, quick transfer options, and balance history.

### Key Features:
- **Card Stats:** Displays a list of cards with the option to toggle between seeing all or just a limited set of cards.
- **Recent Transactions:** Shows the latest transaction activity.
- **Weekly Activity & Expense Statistics:** Provides insights into weekly financial activities and expense breakdowns.
- **Quick Transfer & Balance History:** Facilitates quick transfers and displays balance history.

This component serves as the main overview screen for the user's financial activity, offering a comprehensive view of recent actions and statistics.


## `DashboardCard.js` - Card Component

The `DashboardCard.js` component displays individual card details such as balance, cardholder information, and card number (masked for security). It supports both credit and debit cards with customized styles for each.

### Key Features:
- **Card Balance:** Shows the available balance of the card.
- **Cardholder Information:** Displays the cardholder's name and the card’s expiration date.
- **Masked Card Number:** The card number is partially masked for security (showing the first and last four digits).
- **Card Type Support:** Differentiates between credit and debit cards with specific styling.

This component provides a clean, secure representation of a user's card information in the dashboard.


## `RecentTransactions.js` - Display Recent Transactions

The `RecentTransactions.js` component fetches and displays a list of recent transactions, including transaction source, date, and amount. The component supports different payment methods such as cards, PayPal, and Adhoc.

### Key Features:
- **Transaction Details:** Shows the transaction source, date, and amount.
- **Payment Methods:** Differentiates transaction types (card, PayPal, and Adhoc) by displaying relevant icons.
- **Amount Styling:** The transaction amount is displayed in green for credits and red for debits.
- **Responsive Layout:** The component adjusts the layout of transaction details to fit within the dashboard.

It fetches data from the `DashboardService` and dynamically displays recent transactions with appropriate styling and icons.

# WeeklyActivity Component

The `WeeklyActivity.js` component is a React component that displays a bar chart representing the user's weekly activity. It shows the deposits and withdrawals made each day from Saturday to Friday. This chart dynamically fetches its data from the API and updates the component state.

## Features:
- **Dynamic Bar Chart:** The component uses the `Bar` chart from `react-chartjs-2` to display the weekly deposits and withdrawals.
- **API Integration:** It fetches weekly activity data (deposit and withdrawal amounts) via `DashboardService.getWeeklyActivity()` when the component is mounted.
- **Chart Customization:** The chart is customized with labels, tooltips, and options like step size, grid lines, and legend positioning to improve clarity and user experience.
- **Responsive Layout:** The chart adjusts to the container, making it responsive on different screen sizes.

## Data Structure:
The component expects the following data structure for the weekly activity:

```json
{
  "deposit": [amounts for Sat, Sun, Mon, Tue, Wed, Thu, Fri],
  "withdraw": [amounts for Sat, Sun, Mon, Tue, Wed, Thu, Fri]
}


# ExpenseStatistics Component

The `ExpenseStatistics.js` component is a React component that displays a pie chart to represent the user's expense distribution across different categories. The data is fetched from an API and visualized using the `Pie` chart from `react-chartjs-2`.

## Features:
- **Dynamic Pie Chart:** Displays the user's expenses in various categories (Entertainment, Bill Expense, Investment, Others).
- **API Integration:** Fetches the expense statistics data via `DashboardService.getExpenseStatistics()` when the component is mounted.
- **Chart Customization:** Customizes the pie chart with specific colors for each category and tooltips that show the expense value on hover.
- **Responsive Layout:** The chart is responsive and adjusts its size accordingly.

## Data Structure:
The component expects the following structure for the expense data:

```json
[entertainmentAmount, billExpenseAmount, investmentAmount, otherAmount]


# QuickTransfer Component

The `QuickTransfer` component allows users to send money quickly to selected users. It displays a carousel of users eligible for quick transfers, where users can select a recipient, enter an amount, and complete the transfer.

## Features:
- **User Selection:** Scroll through eligible users via a responsive carousel.
- **Amount Input:** Allows users to enter the transfer amount.
- **Send Money:** Transfer funds to the selected user with a button click.
- **Loading/Error States:** Displays loading text while fetching user data and an error message if the data fetch fails.

## Data Flow:
1. **User Fetching:** The list of eligible users is retrieved from the `DashboardService.getQuickTransferUsers()` method.
2. **User Selection:** Click on a user’s card to select the recipient.
3. **Amount Entry:** Enter the transfer amount in the input field.
4. **Send Action:** Press the send button to transfer the entered amount to the selected user.

## Carousel:
- Displays up to 3 users at a time on larger screens, and 1 on smaller screens.
- Features navigation arrows to scroll through the list.

## Error and Loading Handling:
- Displays a loading message when fetching users.
- An error message is shown if the user data cannot be loaded.

## API Integration:
- The list of users is fetched using the API method `DashboardService.getQuickTransferUsers()`.



# BalanceHistory Component

The `BalanceHistory` component displays a line chart showing the user's balance history over a series of months. The chart is dynamically populated with data fetched from the API.

## Features:
- **Dynamic Data:** Fetches balance history data from an API and updates the chart.
- **Chart Display:** Displays a line chart with balance data over a monthly timeline.
- **Loading State:** Shows a loading message until the balance data is fetched.
- **Responsive Design:** The chart adjusts its size based on the container dimensions.

## Data Flow:
1. **Fetching Data:** The component calls `DashboardService.getBalanceHistory()` to retrieve balance history data.
2. **Rendering Data:** Once the data is available, it updates the chart with the fetched values.
3. **Loading State:** Displays a loading message while the data is being fetched.

## Chart Configuration:
- **Data Labels:** Represent months (e.g., "Jul", "Aug", etc.).
- **Dataset:** Contains the fetched balance data, with fill color and border color set for the line chart.
- **Y-axis:** The balance starts from 0 and increments in steps of 200.
- **Plugins:** Disables the legend.

## Error Handling:
- If the data fetch fails, an error message is logged to the console.


# Settings Component

The `Settings.js` component allows users to manage their profile settings, including editing their personal information, preferences, and security settings.

## Features:
- **Edit Profile**: Users can update their personal information, such as full name, username, email, date of birth, address, and profile image.
- **Profile Image Upload**: Users can upload a new profile image, with real-time preview and validation for image formats.
- **Form Validation**: All user input is validated, and upon submission, a toast message confirms the success or failure of the operation.
- **Responsive Tabs**: The settings are divided into three tabs:
  - **Edit Profile**: For modifying user data.
  - **Preferences**: Placeholder for user preferences.
  - **Security**: Placeholder for security settings.

## Data Handling:
- **Form State Management**: The component uses React's `useState` to manage form inputs and loading states.
- **API Integration**: User data is fetched and updated using `UserService`. On form submission, it sends the updated data to the server.

## Toast Notifications:
- The component utilizes `ToastService` to display success and error messages when actions are performed (e.g., updating the profile).

## Components Used:
- **reactstrap**: For UI components such as forms, cards, buttons, and navigation tabs.
- **classNames**: To toggle active class names for tab navigation.
- **FileReader API**: To handle image uploads and display a preview.

## Sample Flow:
1. On component mount, user data is fetched from the API.
2. User can edit their profile information.
3. The profile image can be uploaded and previewed in real-time.
4. The form is submitted, and a toast message confirms the result.

