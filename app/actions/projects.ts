"use server";

import { createClient } from "@/utils/supabase/server";
import { calculatePrice, normalizeSelectedServices } from "@/lib/pricing";

type ProjectInput = {
  title: string;
  service_type: string;
  selected_services?: string[];
  turnaround: string;
  word_count: number;
  document_type?: string;
  formatting_style?: string;
  formatting_instructions?: string | null;
  translation_preference?: string | null;
  translation_target_language?: string | null;
  english_type?: string;
  client_notes: string;
  upload_file_path: string;
  payment_provider?: string;
  transaction_reference?: string;
};

export async function createProject(data: ProjectInput) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  // Server-side price calculation — never trust frontend price
  const selectedServices = normalizeSelectedServices(data.selected_services || data.service_type);
  const priceBreakdown = calculatePrice(data.word_count, selectedServices, data.turnaround);

  const { data: project, error } = await supabase
    .from("projects")
    .insert({
      client_id: user.id,
      title: data.title,
      service_type: priceBreakdown.serviceType,
      selected_services: priceBreakdown.serviceTypes,
      document_type: data.document_type || "Other",
      formatting_style: data.formatting_style || "None / Standard Consistency",
      formatting_instructions: data.formatting_instructions || null,
      translation_preference: data.translation_preference || null,
      translation_target_language: data.translation_target_language || null,
      english_type: data.english_type || "No preference",
      turnaround: priceBreakdown.turnaroundLabel,
      turnaround_days: priceBreakdown.turnaroundDays,
      turnaround_hours: priceBreakdown.turnaroundDays * 24,
      word_count: data.word_count,
      price: priceBreakdown.finalTotal,
      calculated_price: priceBreakdown.calculatedPrice,
      subtotal: priceBreakdown.subtotal,
      service_charge_percentage: priceBreakdown.serviceChargePercentage,
      service_charge_amount: priceBreakdown.serviceChargeAmount,
      final_price: priceBreakdown.finalTotal,
      minimum_applied: priceBreakdown.minimumApplied,
      client_notes: data.client_notes,
      upload_file_path: data.upload_file_path,
      uploaded_file_path: data.upload_file_path,
      status: "In Progress",
      payment_status: "pending",
      payment_provider: data.payment_provider || null,
      selected_payment_method: data.payment_provider || null,
      payment_reference: data.transaction_reference || null,
      transaction_reference: data.transaction_reference || null,
      payment_currency: "USD",
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating project:", error);
    return { error: "Failed to create project." };
  }

  return { success: true, project };
}
