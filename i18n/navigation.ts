import {createNavigation} from "next-intl/navigation";
import {routing} from "./routing";

// Wrappers de Link/router conscientes del locale.
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
