"use server";

import { createClient } from "@/utils/supabase/server";
import { calculateServerPrice } from "@/lib/payment";

type ProjectInput = {
  title: string;
  service_type: string;
  turnaround: string;
  word_count: number;
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
  const price = calculateServerPrice(data.word_count, data.service_type, data.turnaround);

  const { data: project, error } = await supabase
    .from("projects")
    .insert({
      client_id: user.id,
      title: data.title,
      service_type: data.service_type,
      turnaround: data.turnaround,
      word_count: data.word_count,
      price,
      client_notes: data.client_notes,
      upload_file_path: data.upload_file_path,
      status: "In Progress",
      payment_status: "pending",
      payment_provider: data.payment_provider || null,
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
