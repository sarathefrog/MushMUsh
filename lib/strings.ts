/**
 * All user-facing text in one place.
 * Swap this file to translate the entire UI.
 */

export const strings = {
  // Brand
  siteName: "The Simple X Store",
  siteTagline: "Rare & antique mushroom statues, curated for collectors.",
  siteDescription:
    "Discover one-of-a-kind antique mushroom sculptures in bronze, porcelain, carved wood, and glass. Each piece tells a story.",

  // Nav
  navHome: "Home",
  navTypes: "Browse",
  navOrderSummary: "Order",
  navLogin: "Log in",
  navLogout: "Log out",
  navAdmin: "Admin",

  // Home
  heroHeading: "Collect the uncollectable.",
  heroSubheading:
    "Hand-picked antique mushroom statues from the 1850s to the 1960s. Each piece is one of a kind.",
  heroCta: "Browse collection",
  typesHeading: "Browse by type",
  featuredHeading: "Featured pieces",
  featuredViewAll: "View all",

  // Product
  productEra: "Era",
  productMaterial: "Material",
  productDimensions: "Dimensions",
  productCondition: "Condition",
  productStock: "In stock",
  productOutOfStock: "Out of stock",
  productAddToOrder: "Add to order",
  productAdded: "Added!",
  productQuantity: "Quantity",

  // Order Summary
  orderSummaryTitle: "Your order",
  orderSummaryEmpty: "Your order is empty",
  orderSummaryEmptySub: "Browse our collection and add some pieces.",
  orderSummarySubtotal: "Subtotal",
  orderSummaryShipping: "Shipping",
  orderSummaryTotal: "Total",
  orderSummaryRegion: "Delivery region",
  orderSummarySelectRegion: "Select a region",
  orderSummaryContinue: "Continue to Checkout",

  orderConfirmedTitle: "Order Confirmed",
  orderConfirmedSub: "Thank you for your order. We've received your request and are waiting for your payment proof.",
  orderUploadProof: "Upload Payment Proof",
  orderUploadProofSub: "Please upload a photo of your transfer receipt.",
  orderSelectPhoto: "Select a Photo",
  orderSubmitProof: "Submit Proof",
  orderSummaryRemove: "Remove",

  // Checkout
  checkoutTitle: "Checkout",
  checkoutContact: "Contact details",
  checkoutName: "Full name",
  checkoutEmail: "Email address",
  checkoutPhone: "Phone (optional)",
  checkoutDelivery: "Delivery",
  checkoutRegion: "Region",
  checkoutAddress: "Delivery address",
  checkoutNote: "Note (optional)",
  checkoutNotePlaceholder: "Any special instructions...",
  checkoutPlaceOrder: "Place order",
  checkoutLoginRequired: "Please log in to place an order, or continue as guest.",
  checkoutGuest: "Continue as guest",
  checkoutGuestEmail: "We'll use your email to send updates.",

  // Order Confirmation
  confirmationTitle: "Order placed!",
  confirmationOrderNumber: "Order number",
  confirmationStatus: "Status",
  confirmationStatusPending: "Awaiting review",
  confirmationStatusConfirmed: "Confirmed",
  confirmationStatusShipped: "Shipped",
  confirmationStatusDelivered: "Delivered",
  confirmationStatusCancelled: "Cancelled",
  confirmationUploadTitle: "Upload payment proof",
  confirmationUploadSub:
    "Upload a photo of your payment receipt. We'll review it and confirm your order.",
  confirmationUploadButton: "Choose file",
  confirmationUploadReplace: "Replace",
  confirmationUploadSubmit: "Submit proof",
  confirmationUploadSuccess: "Proof submitted!",
  confirmationDelivery: "Delivery details",
  confirmationItems: "Items",

  // Login
  loginTitle: "Log in",
  loginEmail: "Email",
  loginPassword: "Password",
  loginButton: "Log in",
  loginForgot: "Forgot password?",
  loginSignup: "Don't have an account? Sign up",
  loginError: "Invalid email or password.",
  loginSignupTitle: "Sign up",
  loginSignupButton: "Create account",
  loginSignupName: "Full name",

  // Forgot Password
  forgotTitle: "Forgot password",
  forgotSub: "Enter your email and we'll send a reset link.",
  forgotEmail: "Email",
  forgotButton: "Send reset link",
  forgotSuccess: "Reset link sent! Check your email.",
  forgotBack: "Back to login",

  // 404
  notFoundTitle: "Page not found",
  notFoundSub: "This mushroom seems to have wandered off.",
  notFoundCta: "Back to home",

  // Admin
  adminDashboardTitle: "Dashboard",
  adminTotalOrders: "Total orders",
  adminPendingOrders: "Pending",
  adminRevenue: "Revenue",
  adminUsers: "Users",
  adminRecentOrders: "Recent orders",
  adminUsersTable: "All users",
  adminOrdersTitle: "Orders",
  adminOrderId: "Order ID",
  adminCustomer: "Customer",
  adminItems: "Items",
  adminTotal: "Total",
  adminRegion: "Region",
  adminStatus: "Status",
  adminProof: "Proof",
  adminDate: "Date",
  adminSearch: "Search by ID or customer...",
  adminFilterAll: "All",
  adminFilterPending: "Pending",
  adminFilterConfirmed: "Confirmed",
  adminFilterShipped: "Shipped",
  adminFilterDelivered: "Delivered",
  adminFilterCancelled: "Cancelled",
  adminUpdateStatus: "Update status",
  adminViewProof: "View proof photo",
  adminNoProof: "No proof uploaded",
  adminOrderDetails: "Order details",
  adminUserName: "Name",
  adminUserEmail: "Email",
  adminUserRole: "Role",
  adminUserOrders: "Orders",
  adminUserJoined: "Joined",

  // General
  currency: "USD",
  currencySymbol: "$",
  loading: "Loading...",
  noResults: "No results found.",
  yes: "Yes",
  no: "No",
} as const;

export type StringKey = keyof typeof strings;
