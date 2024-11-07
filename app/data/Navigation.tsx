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
          href: "/pages/all-resume?category=professional",
          description: "Clean and modern templates for corporate jobs",
        },
        {
          title: "Freshers",
          href: "/pages/all-resume?category=fresher",
          description: "Stand out with unique designs for Freshers",
        },
        {
          title: "MNC",
          href: "/pages/all-resume?category=mnc",
          description: "Specialized templates for MNC",
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
          href: "/pages/cover-letter?category=Professional",
          description: "Clean and modern templates for corporate jobs",
        },
        {
          title: "Creative",
          href: "/pages/cover-letter?category=Creative",
          description: "Stand out with unique designs for creative fields",
        },
        {
          title: "IT",
          href: "/pages/cover-letter?category=IT",
          description: "Specialized templates for IT companies",
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