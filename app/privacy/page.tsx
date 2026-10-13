import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy | My Editing and Proofreading Desk",
  description: "Read how My Editing and Proofreading Desk collects, uses, protects, retains, and handles personal information and uploaded documents.",
  path: "/privacy",
});

export { default } from "../privacy-policy/page";
