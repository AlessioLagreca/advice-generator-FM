"use client";

///////// REACT QUERY ////////////////
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
///////// end of query client  ///////

type Props = {
  children: React.ReactNode;
};

export default function CustomQuery({ children }: Props) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
