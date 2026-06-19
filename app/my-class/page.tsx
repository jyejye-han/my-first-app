import { Suspense } from "react";
import MyClassClient from "../components/MyClassClient";

export default function MyClassPage() {
  return (
    <Suspense>
      <MyClassClient />
    </Suspense>
  );
}
