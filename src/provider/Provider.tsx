"use client";

import React from "react";
import "react-toastify/dist/ReactToastify.css";
import {ChakraBaseProvider} from "@chakra-ui/react";
import {ToastContainer} from "react-toastify";
import {
    DehydratedState,
    HydrationBoundary,
    QueryClient,
    QueryClientProvider
} from "@tanstack/react-query";
import {theme} from "./themeConfig";

function Providers({
    children,
    dehydratedState
}: React.PropsWithChildren & {
    dehydratedState: DehydratedState;
}) {
    const [queryClient] = React.useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 5 * 1000,
                        refetchInterval: 5 * 1000
                    }
                }
            })
    );
    return (
        <ChakraBaseProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <HydrationBoundary state={dehydratedState}>
                    <ToastContainer
                        position="top-right"
                        autoClose={4000}
                        hideProgressBar
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                    />
                    {children}
                </HydrationBoundary>
            </QueryClientProvider>
        </ChakraBaseProvider>
    );
}

export default Providers;