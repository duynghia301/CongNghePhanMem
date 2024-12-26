import About from "@/app/components/About";
import Breadcrumb from "@/app/components/Common/Breadcrumb";
import Team from "@/app/components/Team";

import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "About Us | Group 12 Do An",
  description: "Team made",
};

const AboutPage = () => {
  return (
    <main>
      <Breadcrumb pageName="About Us" />
      <About />
      <Team />
    </main>
  );
};

export default AboutPage;
