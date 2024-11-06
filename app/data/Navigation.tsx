import { NavItem } from "../common/types";
import {
    Layout,
    LetterText,
    ScanBarcode,
  } from "lucide-react";

export const navigation: NavItem[] = [
    {
      title: "Resume",
      href: "",
      icon: <Layout className="w-5 h-5" />,
      submenu: [
        {
          title: "Professional",
          href: "/pages/all-resume",
          description: "Clean and modern templates for corporate jobs",
        },
        {
          title: "Creative",
          href: "/pages/all-resume",
          description: "Stand out with unique designs for creative fields",
        },
        {
          title: "Academic",
          href: "/pages/all-resume",
          description: "Specialized templates for academic positions",
        },
      ],
    },
    {
      title: "Cover Letters",
      href: "",
      icon: <LetterText className="w-5 h-5" />,
      submenu: [
        {
          title: "Professional",
          href: "/pages/cover-letter",
          description: "Clean and modern templates for corporate jobs",
        },
        {
          title: "Creative",
          href: "/pages/cover-letter",
          description: "Stand out with unique designs for creative fields",
        },
        {
          title: "Academic",
          href: "/pages/cover-letter",
          description: "Specialized templates for academic positions",
        },
        
      ],
    },
    {
      title: "Resume Analyzer",
      href: "",
      icon: <ScanBarcode className="w-5 h-5" />,
      submenu: [
        {
          title: "Analyze resume",
          href: "/pages/analyzer",
          description: "Learn how to write an effective resume",
        },
        {
          title: "About Analyze",
          href: "/pages/analyzer/about",
          description: "Tips and advice for job seekers",
        },
      ],
    },
  ];