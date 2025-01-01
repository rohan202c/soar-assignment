import Index from "views/Index.js";
import Investments from "views/examples/Investments.js";
import Accounts from "views/examples/Accounts.js";
import CreditCards from "views/examples/CreditCards.js";
import Transactions from "views/examples/Transactions.js";
import Loans from "views/examples/Loans.js";
import Services from "views/examples/Services.js";
import Privileges from "views/examples/Privileges.js";
import Settings from "views/examples/Settings.js";

import { ReactComponent as DashboardIcon } from "assets/img/svgs/dashboards.svg";
import { ReactComponent as TransactionsIcon } from "assets/img/svgs/transactions.svg";
import { ReactComponent as AccountsIcon } from "assets/img/svgs/accounts.svg";
import { ReactComponent as InvestmentsIcon } from "assets/img/svgs/investments.svg";
import { ReactComponent as CreditCardsIcon } from "assets/img/svgs/creditCards.svg";
import { ReactComponent as ServicesIcon } from "assets/img/svgs/services.svg";
import { ReactComponent as PrivilegesIcon } from "assets/img/svgs/privileges.svg";
import { ReactComponent as SettingsIcon } from "assets/img/svgs/services.svg";
import { ReactComponent as LoansIcon } from "assets/img/svgs/loans.svg";

const routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: DashboardIcon,
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/transactions",
    name: "Transactions",
    icon: TransactionsIcon,
    component: <Transactions />,
    layout: "/admin",
  },
  {
    path: "/accounts",
    name: "Accounts",
    icon: AccountsIcon,
    component: <Accounts />,
    layout: "/admin",
  },
  {
    path: "/investments",
    name: "Investments",
    icon: InvestmentsIcon,
    component: <Investments />,
    layout: "/admin",
  },
  {
    path: "/credit-cards",
    name: "Credit Cards",
    icon: CreditCardsIcon,
    component: <CreditCards />,
    layout: "/admin",
  },
  {
    path: "/loans",
    name: "Loans",
    icon: LoansIcon,
    component: <Loans />,
    layout: "/admin",
  },
  {
    path: "/services",
    name: "Services",
    icon: ServicesIcon,
    component: <Services />,
    layout: "/admin",
  },
  {
    path: "/privileges",
    name: "My Privileges",
    icon: PrivilegesIcon,
    component: <Privileges />,
    layout: "/admin",
  },
  {
    path: "/settings",
    name: "Settings",
    icon: SettingsIcon,
    component: <Settings />,
    layout: "/admin",
  },
];
export default routes;
