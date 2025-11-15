
"use server";

import { z } from "zod";
import { summarizeCode as summarizeCodeFlow } from "@/ai/flows/code-style-summarizer";

const workerEndpoint = "https://sendemail.khush23.workers.dev";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(1, "Message is required."),
});

export async function submitContactForm(data: { name: string; email: string; message: string; }) {
  const validatedFields = contactSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const res = await fetch(workerEndpoint, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validatedFields.data),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Worker Error:", errorText);
      throw new Error(errorText);
    }

    return { message: "Message sent successfully!", errors: null };
  } catch (err: any) {
    console.error("Fetch Error:", err);
    return { message: null, error: "Failed to send message: " + err.message };
  }
}

const feedbackSchema = z.object({
  name: z.string().min(1, "Name is required."),
  feedback: z.string().min(1, "Feedback is required."),
});

export async function submitFeedbackForm(data: { name: string; feedback: string; }) {
  const validatedFields = feedbackSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    // Worker requires an email field; use a fallback.
    const payload = {
      name: validatedFields.data.name,
      message: validatedFields.data.feedback,
      email: "feedback@khushpindoria.com",
    };

    const res = await fetch(workerEndpoint, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application-json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Worker Error:", errorText);
      throw new Error(errorText);
    }

    return { message: "Feedback submitted successfully!", errors: null };
  } catch (err: any) {
    console.error("Fetch Error:", err);
    return { message: null, error: "Failed to submit feedback: " + err.message };
  }
}

const codeSchema = z.object({
  code: z.string().min(10, "Please enter at least 10 characters of code."),
});

export async function getCodeSummary(prevState: any, formData: FormData) {
  const validatedFields = codeSchema.safeParse({
    code: formData.get("code"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  try {
    const result = await summarizeCodeFlow({ code: validatedFields.data.code });
    return { summary: result.summary };
  } catch (error) {
    console.error(error);
    return { error: "Failed to summarize code. Please try again." };
  }
}
