"use client";

import { useState, useTransition, useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { MessageCircle } from "lucide-react";
import { submitFeedbackForm } from "@/app/actions";
import { useSound } from "@/hooks/use-sound";

const feedbackSchema = z.object({
  name: z.string().min(1, "Name is required."),
  feedback: z.string().min(10, "Feedback must be at least 10 characters."),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

const initialState = {
  message: "",
  error: "",
  errors: {},
};

export default function Feedback() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useActionState(submitFeedbackForm, initialState);
  const { toast } = useToast();
  const { playSound } = useSound();

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: "",
      feedback: "",
    },
  });

  const onSubmit = (data: FeedbackFormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("feedback", data.feedback);

    startTransition(async () => {
      const result = await submitFeedbackForm(initialState, formData);
      if (result.message) {
        toast({ title: "Success", description: result.message });
        form.reset();
        setOpen(false);
      } else if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="fixed bottom-4 right-4 z-50 rounded-full shadow-lg"
          size="lg"
          onClick={playSound}
          aria-label="Open feedback form"
        >
          <MessageCircle className="mr-2 h-5 w-5" />
          Feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Submit Feedback</DialogTitle>
          <DialogDescription>
            Have a suggestion or found a bug? Let me know!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Feedback</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Your feedback..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending} onClick={playSound}>
                {isPending ? "Submitting..." : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
