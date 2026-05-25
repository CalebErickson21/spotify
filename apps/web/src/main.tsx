// Import Dependencies
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Import routes
import router from "@/utils/routes";

// Import styles
import "@/index.css";

// Import providers
import { AppProviders } from "@/contexts/appProviders";

// Query client
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			refetchOnReconnect: false,
			retry: false,
		},
	},
});

// Render the app
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<AppProviders>
				<RouterProvider router={router} />
			</AppProviders>
		</QueryClientProvider>
	</React.StrictMode>
);