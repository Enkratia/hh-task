import type { Metadata } from "next";

import { NotFoundPage } from "../components";

// Does work?
export const metadata: Metadata = {
  title: "Page not found",
};

const NotFound: React.FC = () => {
  return (
    <div>
      <NotFoundPage />
    </div>
  );
};

export default NotFound;
