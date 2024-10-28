import { MenuItem } from "@/app/common/types";
import { User, Briefcase, Star, Award } from "lucide-react";

export const menuItems: MenuItem[] = [
  { id: "personal", label: "Personal Information", icon: User },
  { id: "experience", label: "Work Experience", icon: Briefcase },
  { id: "skills", label: "Skills & Projects", icon: Star },
  { id: "additional", label: "Additional Info", icon: Award },
];