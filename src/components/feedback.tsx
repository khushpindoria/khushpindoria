
"use client";

import { useState, useTransition, useActionState, useEffect } from "react";
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
import { MessageCircle, Loader2 } from "lucide-react";
import { submitFeedbackForm } from "@/app/actions";
import { useSound } from "@/hooks/use-sound";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


const feedbackSchema = z.object({
  name: z.string().min(1, "Name is required."),
  feedback: z.string().min(10, "Feedback must be at least 10 characters."),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

const initialState: {
    message?: string;
    error?: string;
    errors?: {
        name?: string[];
        feedback?: string[];
    }
} = {};

export default function Feedback() {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useActionState(submitFeedbackForm, initialState);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const { playSound } = useSound();

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: "",
      feedback: "",
    },
  });

  useEffect(() => {
    if (state.message) {
      toast({ title: "Success", description: state.message });
      form.reset();
      setOpen(false);
    }
    if (state.error) {
      toast({
        title: "Error",
        description: state.error,
        variant: "destructive",
      });
    }
  }, [state, toast, form, setOpen]);
  
  const handleSubmit = (data: FeedbackFormValues) => {
    playSound();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("feedback", data.feedback);

    startTransition(() => {
        formAction(formData);
    })
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
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                  </>
                ) : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

