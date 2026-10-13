import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms and Conditions | My Editing and Proofreading Desk",
  description: "Read the terms for using My Editing and Proofreading Desk editing, proofreading, payment, confidentiality, and delivery services.",
  path: "/terms",
});

export { default } from "../terms-and-conditions/page";
